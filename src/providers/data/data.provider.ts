import {AuthProvider} from '@/providers/data/auth/auth.provider'
import {CleanupsProvider} from '@/providers/data/cleanups/cleanups.provider'
import {UserProvider} from '@/providers/data/user/user.provider'
import axios, {AxiosInstance} from 'axios'

const baseUrl = 'https://www.cleansomething.com/server_csfn/api/usuarios'

class DataProvider {

  axios: AxiosInstance

  auth: AuthProvider
  user: UserProvider
  cleanups: CleanupsProvider

  constructor() {
    this.axios = axios.create({
      baseURL: baseUrl
    })
    this.auth = new AuthProvider(this.axios)
    this.user = new UserProvider(this.axios)
    this.cleanups = new CleanupsProvider(this.axios)
  }

  setToken(token: string) {
    this.axios.defaults.headers.common['Authorization'] = token;
  }

  removeToken() {
    this.axios.defaults.headers.common['Authorization'] = undefined;
  }

}

export const dataProvider = new DataProvider()
