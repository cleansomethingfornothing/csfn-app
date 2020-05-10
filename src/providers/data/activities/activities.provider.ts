import Activity from '@/types/Activity'
import CleanupFilters from '@/types/CleanupFilters'
import {AxiosInstance} from 'axios'
import Coords from '@/types/Coords'

export class ActivitiesProvider {

  axios: AxiosInstance

  constructor(axios) {
    this.axios = axios
  }

  publish(cleanup: Activity): Promise<void> {
    return Promise.resolve()
  }

  fetch(filters: CleanupFilters, origin: Coords): Promise<Activity[]> {
    return Promise.resolve(undefined)
  }

  fetchOne(id: string): Promise<Activity> {
    return Promise.resolve(undefined)
  }

  update(action: Activity): Promise<void> {
    return Promise.resolve(undefined)
  }
}

