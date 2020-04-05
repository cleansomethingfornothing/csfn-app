import UserLogin from '@/types/UserLogin'
import UserRegistration from '@/types/UserRegistration'
import User from '@/types/User'
import {AxiosInstance} from 'axios'
import UnknownError from '@/types/errors/UnknownError'
import qs from 'qs'

const loginUrl = '/login'
const registerUrl = '/alta'

export class AuthProvider {

  axios: AxiosInstance

  constructor(axios) {
    this.axios = axios
  }

  doRegister(user: UserRegistration): Promise<User> {
    return this.axios.post(registerUrl, qs.stringify(user))
      .then((response) => {
        return new User(user.email, user.password)
      }).catch((error) => {
        return Promise.reject(new UnknownError('register'))
      })
  }

  doLogin(user: UserLogin): Promise<string> {
    return this.axios({
      method: 'get',
      url: loginUrl,
      auth: {
        username: user.username,
        password: user.password
      }
    }).then(({data}) => data)
  }

  doLogout(): Promise<void> {
    return Promise.resolve();
  }

  doResetPassword(email: string): Promise<void> {
    return Promise.resolve(email && undefined);
  }
}
