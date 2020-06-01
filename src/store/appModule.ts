import {Action, Module, Mutation, VuexModule} from 'vuex-class-modules'
import {store} from '@/store/index'
import {authModule} from '@/store/authModule'
import {cleanupsModule} from '@/store/activitiesModule'
import {locationModule} from '@/store/locationModule'

@Module
class AppModule extends VuexModule {

  initialized = false

  constructor() {
    super({store, name: 'app'})
  }

  get isInitialized() {
    return this.initialized
  }

  @Mutation
  setInitializedDone() {
    this.initialized = true
  }

  @Action
  initialize() {
    return this.initialized
      ? Promise.resolve()
      : this.doInitialize()
  }

  @Action
  doInitialize() {
    return Promise.all([
      authModule.initialize(),
      cleanupsModule.initialize(),
    ]).then(() => {
      locationModule.initialize()
      this.setInitializedDone()
    })
  }
}

export const appModule = new AppModule()
