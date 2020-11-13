import User from '@/types/User'
import {Action, Module, Mutation, VuexModule} from 'vuex-class-modules'
import {store} from '@/store/index'
import {userModule} from '@/store/userModule'
import Validator from '@/tools/Validator'
import {authProvider} from '@/providers/data/auth.provider'
import {userProvider} from '@/providers/data/user.provider'
import {imagesProvider} from '@/providers/data/images.provider'
import {LOGIN, RESET_PASSWORD, UPDATE_EMAIL, UPDATE_PASSWORD} from '@/types/ValidationGroups'
import {passwordResetProvider} from '@/providers/data/password-reset.provider'
import {nativeProvider} from '@/providers/native/native.provider'
import {locationModule} from '@/store/locationModule'

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
            .then((user) => this.loggedIn(user))
            .then(() => {
                this.setLogged(true)
            })
    }

    @Action
    doRegister(user: User): Promise<void> {
        return locationModule.getLocationByIp()
            .then((location) => authProvider.doRegister(location.address.countryCode, user))
            .then((registered) => imagesProvider.uploadImages([user.picture as File], 'register')
                .then((images) => userProvider.updateUser(registered.id, {picture: {id: images[0].id}})))
            .then((logged) => this.loggedIn(logged))
    }

    @Action
    doCredentialsLogin(userLogin: User): Promise<User> {
        return Validator.validate(userLogin, LOGIN)
            .then(() => authProvider.doLogin(userLogin))
            .then((user) => this.loggedIn(user))
    }

    @Action
    doFacebookLogin(token: string): Promise<User> {
        return locationModule.getLocationByIp()
            .then((location) => authProvider.doFacebookLogin(location.address.countryCode, token))
            .then((user) => this.loggedIn(user))
    }

    @Action
    doGoogleLogin(token: string): Promise<User> {
        return Promise.all([locationModule.getLocationByIp(), nativeProvider.isIOS()])
            .then(([location, ios]) => authProvider.doGoogleLogin(location.address.countryCode, token, ios))
            .then((user) => this.loggedIn(user))
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
            .then(() => this.loggedOut())
    }

    @Action
    loggedIn(user) {
        userModule.setCurrentUser(user)
        this.setLogged(true)
        locationModule.initialize()
        return Promise.resolve(user)
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
}

export const authModule = new AuthModule()
