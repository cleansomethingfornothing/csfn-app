import User from '@/types/User'
import {Action, Module, Mutation, VuexModule} from 'vuex-class-modules'
import {store} from '@/store/index'
import {userModule} from '@/store/userModule'
import Validator from '@/tools/Validator'
import {storageProvider} from '@/providers/storage/storage.provider'
import {authProvider} from '@/providers/data/auth.provider'
import {userProvider} from '@/providers/data/user.provider'
import {imagesProvider} from '@/providers/data/images.provider'
import {LOGIN, RESET_PASSWORD, UPDATE_EMAIL, UPDATE_PASSWORD} from '@/types/ValidationGroups'
import {passwordResetProvider} from '@/providers/data/password-reset.provider'

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
      .then((user) => imagesProvider.uploadImages([userRegistration.picture as File], 'register')
        .then((images) => userProvider.updateUser(user.id, {picture: {id: images[0].id}})))
      .then((user) => userModule.setCurrentUser(user))
      .then(() => this.setLogged(true))
  }

  @Action
  doCredentialsLogin(userLogin: User): Promise<User> {
    return Validator.validate(userLogin, LOGIN)
      .then(() => authProvider.doLogin(userLogin))
      .then((user) => {
        this.setLogged(true)
        userModule.setCurrentUser(user)
        return Promise.resolve(user)
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
  changePassword({currentPassword, newPassword}: { currentPassword: string, newPassword: string }) {
    return Validator.validate({password: newPassword} as User, UPDATE_PASSWORD)
      .then(() => authProvider.changePassword({
        currentEmail: userModule.getCurrentUser.email,
        currentPassword, newPassword
      }))
      .then(user => {
        userModule.setCurrentUser(user)
      })
  }

  @Action
  doPasswordReset(reset: User): Promise<void> {
    return Validator.validate(reset, RESET_PASSWORD)
      .then(() => passwordResetProvider.request(reset.email))
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


  @Action
  deleteAccount(password: string) {
    return authProvider.deleteAccount({email: userModule.getCurrentUser.email, password})
      .then(() => this.loggedOut())
  }

  /*
  doFacebookLogin(): Promise<void> {

  }

  doInstagramLogin(): Promise<void> {

  }
  */
}

export const authModule = new AuthModule()
