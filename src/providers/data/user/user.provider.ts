import User from '@/types/User'
import {AxiosInstance} from 'axios'

export class UserProvider {

  axios: AxiosInstance

  constructor(axios) {
    this.axios = axios
  }

  fetchUser(id: string): Promise<User> {
    return Promise.resolve(id && new User('@lester_prz', 'lester@gmail.com', '/img/user-placeholder.png'));
  }
}
