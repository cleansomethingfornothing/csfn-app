import {AuthProvider} from '@/providers/auth/auth.provider'
import UserLogin from '@/types/UserLogin'
import UserRegistration from '@/types/UserRegistration'
import User from '@/types/User'
import axios from 'axios'
import FormUrlEncoder from '@/tools/FormUrlEncoder'
import UnknownError from '@/types/errors/UnknownError'
import {returnRight} from 'ionicons/icons'

const url = 'https://www.cleansomething.com/server_csfn/api/usuarioApp'

const loginUrl = url + '/login'
const registerUrl = url + '/alta'

export default class ServerAuthProvider implements AuthProvider {
  fetchUserId(): Promise<string> {
    return Promise.resolve('hi')
  }

  doRegister(user: UserRegistration): Promise<User> {
    return axios.post(registerUrl, FormUrlEncoder.encode(user), {headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
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
