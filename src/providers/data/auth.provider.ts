import UserLogin from '@/types/UserLogin'
import User from '@/types/User'
import {handleAuthError, handleBackError} from '@/tools/handleBackError'
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

  doLogin(login: UserLogin): Promise<User> {
    return this.axios.post('/login', undefined, {auth: {username: login.email, password: login.password}})
      .then(({data}) => data)
      .catch(handleAuthError('login'))
  }

  doLogout(): Promise<void> {
    return this.axios.post('/logout')
      .then(() => undefined)
      .catch(handleBackError('logout'))
  }

  askPasswordResetCode(email: string): Promise<void> {
    return Promise.resolve(email && undefined)
  }

  validatePasswordResetCode(email: string, code: string): Promise<boolean> {
    return Promise.resolve(true)
  }

  doPasswordReset(email: string, code: string, newPassword: string): Promise<void> {
    return Promise.resolve()
  }

}

export const authProvider = new AuthProvider()
