import UserRegistration from '@/types/UserRegistration'
import UserLogin from '@/types/UserLogin'
import {Action, Module, Mutation, VuexModule} from 'vuex-class-modules'
import {store} from '@/store/index'
import {userModule} from '@/store/userModule'
import Validator from '@/tools/Validator'
import {storageProvider} from '@/providers/storage/storage.provider'
import {dataProvider} from '@/providers/data/data.provider'
import User from '@/types/User'
import {nativeProvider} from '@/providers/native/native.provider'

const SESSION = 'CSFN_SESSION'

@Module
class AuthModule extends VuexModule {

  initialized = false
  logged = false

  constructor() {
    super({store, name: 'auth'})
  }

  @Mutation
  setLogged(logged: boolean): void {
    this.logged = logged
  }

  @Mutation
  setInitialized(): void {
    this.initialized = true
  }

  @Action
  async isLogged(): Promise<boolean> {
    if (!this.initialized) {
      await this.initialize()
    }
    return this.logged
  }

  initialize(): Promise<void> {
    this.setInitialized()
    return storageProvider.get(SESSION)
      .then((session) => {
        if (session) {
          nativeProvider.setStatusBarColor('#FFFFFF')
          userModule.setUser(new User(session.username))
          dataProvider.setToken(session.token)
          this.setLogged(true)
        } else {
          nativeProvider.setStatusBarColor('#7c8578')
        }
      })
  }

  @Action
  doRegister(userRegistration: UserRegistration): Promise<void> {
    return Validator.validate(userRegistration)
      .then(() => dataProvider.auth.doRegister(userRegistration))
      .then(userModule.setUser)
      .then(() => this.setLogged(true))
  }

  @Action
  doCredentialsLogin(userLogin: UserLogin): Promise<void> {
    return Validator.validate(userLogin)
      .then(() => dataProvider.auth.doLogin(userLogin))
      .then((token) => storageProvider.set(SESSION, {token, username: userLogin.username}))
      .then(() => userModule.setUser(new User(userLogin.username)))
      .then(() => {
        nativeProvider.setStatusBarColor('#FFFFFF')
        this.setLogged(true)
      })
  }

  /*
  doFacebookLogin(): Promise<void> {

  }

  doInstagramLogin(): Promise<void> {

  }
   */

  @Action
  doResetPassword(email: string): Promise<void> {
    return dataProvider.auth.doResetPassword(email)
  }

  @Action
  doLogout(): Promise<void> {
    return dataProvider.auth.doLogout()
      .then(() => storageProvider.remove(SESSION))
      .then(() => {
        nativeProvider.setStatusBarColor('#7c8578')
        dataProvider.removeToken()
        this.setLogged(false)
        userModule.setUser(undefined)
      })
  }
}

export const authModule = new AuthModule()
