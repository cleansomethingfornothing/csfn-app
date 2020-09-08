import Activity from '@/types/Activity'
import ActivityFilters from '@/types/ActivityFilters'
import Coords from '@/types/Coords'
import DataProvider from '@/providers/data/data.provider'

export class ActivitiesProvider extends DataProvider {

  constructor() {
    super('/activities')
  }

  publish(cleanup: Activity): Promise<void> {
    cleanup
    return Promise.resolve()
  }

  fetch(filters: ActivityFilters, origin: Coords): Promise<Activity[]> {
    filters
    origin
    return Promise.resolve([])
  }

  fetchOne(id: string): Promise<Activity> {
    id
    return Promise.resolve(undefined)
  }

  update(action: Activity): Promise<void> {
    action
    return Promise.resolve(undefined)
  }
}

export const activitiesProvider = new ActivitiesProvider()
