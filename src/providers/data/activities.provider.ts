import Activity from '@/types/Activity'
import ActivityFilters from '@/types/ActivityFilters'
import {AxiosInstance} from 'axios'
import Coords from '@/types/Coords'
import Location from '@/types/Location'
import {ActivityType} from '@/types/ActivityType'

export class ActivitiesProvider {

  axios: AxiosInstance

  constructor() {
  }

  publish(cleanup: Activity): Promise<void> {
    return Promise.resolve()
  }

  fetch(filters: ActivityFilters, origin: Coords): Promise<Activity[]> {
    return Promise.resolve([])
  }

  fetchOne(id: string): Promise<Activity> {
    return Promise.resolve(undefined)
  }

  update(action: Activity): Promise<void> {
    return Promise.resolve(undefined)
  }
}

export const activitiesProvider = new ActivitiesProvider()
