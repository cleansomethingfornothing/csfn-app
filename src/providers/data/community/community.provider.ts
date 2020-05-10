import {AxiosInstance} from 'axios'
import MonthStats from '@/types/MonthStats'
import TopUser from '@/types/TopUser'

export default class CommunityProvider {

  axios: AxiosInstance

  constructor(axios) {
    this.axios = axios
  }

  fetchHistory(): Promise<MonthStats> {
    return Promise.resolve(undefined)
  }

  fetchTopUsers(units: 'kilos' | 'liters'): Promise<TopUser[]> {
    return Promise.resolve(undefined)
  }

}
