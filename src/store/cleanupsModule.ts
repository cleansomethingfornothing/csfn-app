import {Action, Module, Mutation, VuexModule} from 'vuex-class-modules'
import Cleanup from '@/types/Cleanup'
import CleanupFilters from '@/types/CleanupFilters'
import {store} from '@/store/index'
import Validator from '@/tools/Validator'
import {dataProvider} from '@/providers/data/data.provider'

@Module
class CleanupsModule extends VuexModule {

  cleanups: { [id: string]: Cleanup } = undefined

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

  get getFilters() {
    return this.filters
  }

  @Mutation
  setCleanups(cleanups: Cleanup[]) {
    this.cleanups = cleanups.reduce((acc, v) => ({...acc, [v.id]: v}), {})
  }

  @Mutation
  setFilters(filters: CleanupFilters) {
    this.filters = filters
  }

  @Action
  fetch(): Promise<void> {
    return dataProvider.cleanups.fetch(this.filters)
      .then((cleanups) => this.setCleanups(cleanups))
  }

  @Action
  publish(cleanup: Cleanup): Promise<void> {
    return Validator.validate(cleanup)
      .then(() => dataProvider.cleanups.publish(cleanup))
  }

}

export const cleanupsModule = new CleanupsModule()
