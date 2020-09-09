
import User from '@/types/User'
import {handleBackError} from '@/tools/handleBackError'
import DataProvider from '@/providers/data/data.provider'

export class AuthProvider extends DataProvider {

  constructor() {
    super('/auth')
  }

  doRegister(user: User): Promise<User> {
    return this.axios.post('/register', {...user, picture: undefined})
      .then(({data}) => data)
      .catch(handleBackError('register'))
  }

  fetchCurrentUser(): Promise<User> {
    return this.axios.get('/user')
      .then(({data}) => data)
  }

  doLogin(login: User): Promise<User> {
    return this.axios.post('/login', undefined, {auth: {username: login.email, password: login.password}})
      .then(({data}) => data)
      .catch(handleBackError('login'))
  }

  doLogout(): Promise<void> {
    return this.axios.post('/logout')
      .then(() => undefined)
      .catch(handleBackError('logout'))
  }

  changeEmail({currentEmail, currentPassword, newEmail}: { currentEmail: string, currentPassword: string, newEmail: string }): Promise<User> {
    return this.axios.post('/change_email', {email: newEmail}, {
      auth: {
        username: currentEmail,
        password: currentPassword
      }
    })
      .then(({data}) => data)
      .catch(handleBackError('change-email'))
  }

  changePassword({currentEmail, currentPassword, newPassword}: {currentEmail, currentPassword, newPassword}): Promise<User> {
    return this.axios.post('/change_password', {password: newPassword}, {
      auth: {
        username: currentEmail,
        password: currentPassword
      }
    })
      .then(({data}) => data)
      .catch(handleBackError('change-password'))
  }

  deleteAccount({email, password}: {email: string, password: string}): Promise<void> {
    return this.axios.post('delete_account', null, {auth: {username:email, password}})
      .then(() => undefined)
      .catch(handleBackError('delete-account'))
  }

}

export const authProvider = new AuthProvider()
