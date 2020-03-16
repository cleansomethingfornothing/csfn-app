import UserRegistration from '@/types/UserRegistration'
import UserLogin from '@/types/UserLogin'
import {Action, Module, Mutation, VuexModule} from 'vuex-class-modules'
import {store} from '@/store/index'
import {authProvider} from '@/providers/auth/auth.provider'
import {userModule} from '@/store/userModule'
import Validator from '@/tools/Validator'

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
    return authProvider.fetchUserId()
      .then(userModule.fetchUser)
      .then(() => this.setLogged(true))
      .catch(ignore => ignore)
  }

  @Action
  doRegister(userRegistration: UserRegistration): Promise<void> {
    return Validator.validate(userRegistration)
      .then(() => authProvider.doRegister(userRegistration))
      .then(userModule.setUser)
      .then(() => this.setLogged(true))
  }

  @Action
  doCredentialsLogin(userLogin: UserLogin): Promise<void> {
    return Validator.validate(userLogin)
      .then(() => authProvider.doLogin(userLogin))
      .then(userModule.setUser)
      .then(() => this.setLogged(true))
  }

  /*
  doFacebookLogin(): Promise<void> {

  }

  doInstagramLogin(): Promise<void> {

  }
   */

  @Action
  doResetPassword(email: string): Promise<void> {
    return authProvider.doResetPassword(email)
  }

  @Action
  doLogout(): Promise<void> {
    return authProvider.doLogout()
      .then(() => {
        this.setLogged(false)
        userModule.setUser(undefined)
      })
  }
}

export const authModule = new AuthModule()
