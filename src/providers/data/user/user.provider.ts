import User from '@/types/User'
import {AxiosInstance} from 'axios'

export class UserProvider {

  axios: AxiosInstance

  constructor(axios) {
    this.axios = axios
  }

  fetchUser(id: string): Promise<User> {
    return Promise.resolve(id && new User('1', '@lester_ps'));
  }
}
