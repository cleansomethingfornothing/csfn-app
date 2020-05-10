import UserLogin from '@/types/UserLogin'
import UserRegistration from '@/types/UserRegistration'
import User from '@/types/User'
import {AxiosInstance} from 'axios'
import UnknownError from '@/types/errors/UnknownError'
import FormEncoder from '@/tools/FormEncoder'

const loginUrl = '/login'
const registerUrl = '/alta'

export class AuthProvider {

  axios: AxiosInstance

  constructor(axios) {
    this.axios = axios
  }

  doRegister(user: UserRegistration): Promise<User> {
    return this.axios.post(registerUrl, FormEncoder.encodeData({
        'img_perfil': user.picture,
        'nombre_usuario': user.username,
        'password': user.password,
        'password_rep': user.passwordConfirmation,
        'correo': user.email,
        'groupname': 'user'
      }))
      .then((response) => {
        console.log(response)
        return new User(user.username, user.email, 'picture')
      }).catch((error) => {
        return Promise.reject(new UnknownError('register'))
      })
  }

  doLogin(user: UserLogin): Promise<string> {
    return Promise.resolve('yyy')
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

  askPasswordResetCode(email: string): Promise<void> {
    return Promise.resolve(email && undefined);
  }

  validatePasswordResetCode(email: string, code: string): Promise<boolean> {
    return Promise.resolve(true)
  }

  doPasswordReset(email: string, code: string, newPassword: string): Promise<void> {
    return Promise.resolve()
  }

}
