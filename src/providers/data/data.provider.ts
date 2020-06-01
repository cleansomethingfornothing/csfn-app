import {AuthProvider} from '@/providers/data/auth/auth.provider'
import {UserProvider} from '@/providers/data/user/user.provider'
import axios, {AxiosInstance} from 'axios'
import PicturesProvider from '@/providers/data/pictures/pictures.provider'
import {ActivitiesProvider} from '@/providers/data/activities/activities.provider'
import StatsProvider from '@/providers/data/stats/stats.provider'

const baseUrl = 'https://www.cleansomethingfornothing.com/server_csfn/api/usuarios/'

class DataProvider {

  axios: AxiosInstance

  auth: AuthProvider
  user: UserProvider
  activities: ActivitiesProvider
  stats: StatsProvider
  pictures: PicturesProvider

  constructor() {
    this.axios = axios.create({
      baseURL: baseUrl
    })
    this.auth = new AuthProvider(this.axios)
    this.user = new UserProvider(this.axios)
    this.activities = new ActivitiesProvider(this.axios)
    this.stats = new StatsProvider(this.axios)
    this.pictures = new PicturesProvider(this.axios)
  }

  setToken(token: string) {
    this.axios.defaults.headers.common['Authorization'] = token;
  }

  removeToken() {
    this.axios.defaults.headers.common['Authorization'] = undefined;
  }

}

export const dataProvider = new DataProvider()
