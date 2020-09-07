import User from '@/types/User'
import UserLogin from '@/types/UserLogin'
import {Action, Module, Mutation, VuexModule} from 'vuex-class-modules'
import {store} from '@/store/index'
import {userModule} from '@/store/userModule'
import Validator from '@/tools/Validator'
import {storageProvider} from '@/providers/storage/storage.provider'
import {authProvider} from '@/providers/data/auth.provider'
import {userProvider} from '@/providers/data/user.provider'
import {imagesProvider} from '@/providers/data/images.provider'

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
  doRegister(userRegistration: User): Promise<void> {
    return authProvider.doRegister(userRegistration)
      .then((user) => imagesProvider.uploadImages([userRegistration.picture as File])
        .then((images) => userProvider.updateUser(user.id, {picture: images[0]})))
      .then(() => this.doCredentialsLogin({
        username: userRegistration.username,
        password: userRegistration.password
      }))
  }

  @Action
  doCredentialsLogin(userLogin: UserLogin): Promise<void> {
    return Validator.validate(userLogin)
      .then(() => authProvider.doLogin(userLogin))
      .then((token) => storageProvider.set(SESSION, {token, username: userLogin.username})
        .then((token) => this.loggedIn({token, username: userLogin.username})))
  }

  @Action
  loggedIn({token, username}) {
    return userProvider.fetchUser()
      .then((user) => userModule.setCurrentUser(user))
      .then(() => {
        this.setLogged(true)
      })
  }

  @Action
  doResetPassword(email: string): Promise<void> {
    return authProvider.askPasswordResetCode(email)
  }

  @Action
  doLogout(): Promise<void> {
    return authProvider.doLogout()
      .then(() => storageProvider.remove(SESSION))
      .then(() => this.loggedOut())
  }

  @Action
  loggedOut() {
    userModule.setCurrentUser(undefined)
    this.setLogged(false)
  }

  /*
  doFacebookLogin(): Promise<void> {

  }

  doInstagramLogin(): Promise<void> {

  }
  */
}

export const authModule = new AuthModule()
