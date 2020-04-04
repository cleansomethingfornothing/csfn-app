import UserLogin from '@/types/UserLogin'
import UserRegistration from '@/types/UserRegistration'
import User from '@/types/User'
import axios, {AxiosInstance} from 'axios'
import UnknownError from '@/types/errors/UnknownError'
import config from '@/providers/data/config'
import qs from 'qs'

const baseUrl = config.hostname + config.context + '/usuarioApp'

const loginUrl = '/login'
const registerUrl = '/alta'

export class AuthProvider {

  axios: AxiosInstance

  constructor() {
    this.axios = axios.create({baseURL: baseUrl})
  }

  fetchUserId(): Promise<string> {
    return Promise.resolve('hi')
  }

  doRegister(user: UserRegistration): Promise<User> {
    return this.axios.post(registerUrl, qs.stringify(user))
      .then((response) => {
        return new User(user.firstName, user.lastName, user.email, user.password)
      }).catch((error) => {
        return Promise.reject(new UnknownError('register'))
      })
  }

  doLogin(user: UserLogin): Promise<User> {
    return Promise.resolve(new User('Lester', 'Pérez', '@lester', 'lester@mail.com'))
    /*
    return axios.post(loginUrl, UrlEncoder.encode(user))
      .then((response) => {
        return new User();
      }).catch((error) => {
        return Promise.reject(new UnknownError('login'))
      })
     */
  }

  doLogout(): Promise<void> {
    return Promise.resolve();
  }

  doResetPassword(email: string): Promise<void> {
    return Promise.resolve(email && undefined);
  }
}

export const authProvider = new AuthProvider()
