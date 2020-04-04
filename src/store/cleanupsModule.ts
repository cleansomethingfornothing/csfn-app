import {Action, Module, Mutation, VuexModule} from 'vuex-class-modules'
import Cleanup from '@/types/Cleanup'
import CleanupFilters from '@/types/CleanupFilters'
import {cleanupProvider} from '@/providers/data/cleanups/cleanup.provider'
import {store} from '@/store/index'
import Validator from '@/tools/Validator'

@Module
class CleanupsModule extends VuexModule {

  cleanups: Cleanup[] = undefined

  filters: CleanupFilters = new CleanupFilters()

  constructor() {
    super({store, name: 'cleanups'})
  }

  get getCleanups() {
    return this.cleanups
  }

  get getFilters() {
    return this.filters
  }

  @Mutation
  setCleanups(cleanups: Cleanup[]) {
    this.cleanups = cleanups
  }

  @Mutation
  setFilters(filters: CleanupFilters) {
    this.filters = filters
  }

  @Action
  fetchCleanups(): Promise<void> {
    return cleanupProvider.fetch(this.filters)
      .then((cleanups) => this.setCleanups(cleanups))
  }

  @Action
  publishCleanup(cleanup: Cleanup): Promise<void> {
    return Validator.validate(cleanup)
      .then(() => cleanupProvider.publish(cleanup))
  }

}

export const cleanupsModule = new CleanupsModule()
