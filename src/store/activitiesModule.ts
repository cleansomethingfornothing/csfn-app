import {Action, Module, Mutation, VuexModule} from 'vuex-class-modules'
import Activity from '@/types/Activity'
import CleanupFilters from '@/types/CleanupFilters'
import {store} from '@/store/index'
import Validator from '@/tools/Validator'
import {dataProvider} from '@/providers/data/data.provider'
import {storageProvider} from '@/providers/storage/storage.provider'
import {locationModule} from '@/store/locationModule'

const FILTERS_DISTANCE = 'CSFN_FILTERS_DISTANCE'

@Module
class ActivitiesModule extends VuexModule {

  cleanups: { [id: string]: Activity } = null
  userCleanups: { [id: string]: Activity } = null

  filters: CleanupFilters = new CleanupFilters()

  constructor() {
    super({store, name: 'cleanups'})
  }

  get getCleanups() {
    return this.cleanups
  }

  get getCleanup() {
    return (id) => this.cleanups[id]
  }

  get getUserCleanups() {
    return this.userCleanups
  }

  get getFilters() {
    return this.filters
  }

  @Mutation
  setCleanups(cleanups: Activity[]) {
    this.cleanups = cleanups && cleanups.reduce((acc, v) => ({...acc, [v.id]: v}), {})
  }

  @Mutation
  setCleanup(cleanup: Activity) {
    this.cleanups = {...(this.cleanups || {}), [cleanup.id]: cleanup}
  }

  @Mutation
  setUserCleanups(cleanups: Activity[]) {
    this.userCleanups = cleanups.reduce((acc, v) => ({...acc, [v.id]: v}), {})
  }

  @Mutation
  setFilters(filters: CleanupFilters) {
    this.filters = filters
  }

  @Action
  initialize() {
    return storageProvider.get(FILTERS_DISTANCE)
      .then((distance) => {
        this.setFiltersDistance(distance)
      })
      .catch(() => ({}))
  }

  @Action
  setFiltersDistance(distance) {
    storageProvider.set(FILTERS_DISTANCE, distance)
      .then(() => {
        this.setFilters({...this.filters, distance})
      })
  }

  @Action
  fetch(): Promise<void> {
    return dataProvider.activities.fetch(this.filters, locationModule.getCoords)
      .then((cleanups) => this.setCleanups(cleanups))
  }

  @Action
  fetchOne(id: string): Promise<void> {
    if (this.cleanups[id]) {
      return Promise.resolve()
    }
    return dataProvider.activities.fetchOne(id)
      .then((cleanup) => this.setCleanup(cleanup))
  }


  @Action
  publish(cleanup: Activity): Promise<void> {
    return Validator.validate(cleanup)
      .then(() => dataProvider.activities.publish(cleanup))
  }

}

export const cleanupsModule = new ActivitiesModule()
