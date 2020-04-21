import UserRegistration from '@/types/UserRegistration'
import UserLogin from '@/types/UserLogin'
import {Action, Module, Mutation, VuexModule} from 'vuex-class-modules'
import {store} from '@/store/index'
import {userModule} from '@/store/userModule'
import Validator from '@/tools/Validator'
import {storageProvider} from '@/providers/storage/storage.provider'
import {dataProvider} from '@/providers/data/data.provider'

const SESSION = 'CSFN_SESSION'

@Module
class AuthModule extends VuexModule {

  logged = false

  constructor() {
    super({store, name: 'auth'})
  }

  get isLogged() {
    return this.logged
  }

  @Mutation
  setLogged(logged: boolean): void {
    this.logged = logged
  }

  @Action
  initialize(): Promise<void> {
    return storageProvider.get(SESSION)
      .then((session) => this.loggedIn(session))
      .catch(() => this.loggedOut())
  }

  @Action
  doRegister(userRegistration: UserRegistration): Promise<void> {
    return dataProvider.auth.doRegister(userRegistration)
      .then(() => this.doCredentialsLogin({
        username: userRegistration.username,
        password: userRegistration.password
      }))
  }

  @Action
  doCredentialsLogin(userLogin: UserLogin): Promise<void> {
    return Validator.validate(userLogin)
      .then(() => dataProvider.auth.doLogin(userLogin))
      .then((token) => storageProvider.set(SESSION, {token, username: userLogin.username})
        .then((token) => this.loggedIn({token, username: userLogin.username})))
  }

  @Action
  loggedIn({token, username}) {
    dataProvider.setToken(token)
    return dataProvider.user.fetchUser(username)
      .then((user) => userModule.setCurrentUser(user))
      .then(() => {
        this.setLogged(true)
      })
  }

  @Action
  doResetPassword(email: string): Promise<void> {
    return dataProvider.auth.doResetPassword(email)
  }

  @Action
  doLogout(): Promise<void> {
    return dataProvider.auth.doLogout()
      .then(() => this.loggedOut())
  }

  @Action
  loggedOut() {
    return storageProvider.remove(SESSION)
      .then(() => {
        userModule.setCurrentUser(undefined)
        dataProvider.removeToken()
        this.setLogged(false)
      })
  }

  /*
  doFacebookLogin(): Promise<void> {

  }

  doInstagramLogin(): Promise<void> {

  }
  */
}

export const authModule = new AuthModule()
