import User from '@/types/User'
import {Action, Module, Mutation, VuexModule} from 'vuex-class-modules'
import {store} from '@/store/index'
import {userModule} from '@/store/userModule'
import Validator from '@/tools/Validator'
import {storageProvider} from '@/providers/storage/storage.provider'
import {authProvider} from '@/providers/data/auth.provider'
import {userProvider} from '@/providers/data/user.provider'
import {imagesProvider} from '@/providers/data/images.provider'
import {LOGIN, UPDATE_EMAIL} from '@/types/ValidationGroups'

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
    return this.checkIsLogged()
      .catch(() => this.loggedOut())
  }

  @Action
  checkIsLogged() {
    return authProvider.fetchCurrentUser()
      .then((user) => userModule.setCurrentUser(user))
      .then(() => {
        this.setLogged(true)
      })
  }

  @Action
  doRegister(userRegistration: User): Promise<void> {
    return authProvider.doRegister(userRegistration)
      .then((user) => imagesProvider.uploadImages([userRegistration.picture as File])
        .then((images) => userProvider.updateUser(user.id, {picture: images[0]})))
      .then(() => this.doCredentialsLogin({
        email: userRegistration.email,
        password: userRegistration.password
      }))
  }

  @Action
  doCredentialsLogin(userLogin: User): Promise<void> {
    return Validator.validate(userLogin, LOGIN)
      .then(() => authProvider.doLogin(userLogin))
      .then((user) => {
        this.setLogged(true)
        userModule.setCurrentUser(user)
        return Promise.resolve()
      })
  }

  @Action
  changeEmail(change: User) {
    return Validator.validate(change, UPDATE_EMAIL)
      .then(() => authProvider.changeEmail({
        currentEmail: userModule.getCurrentUser.email,
        currentPassword: change.password,
        newEmail: change.email
      }))
      .then(user => {
        userModule.setCurrentUser(user)
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
