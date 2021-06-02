import { Action, Module, Mutation, VuexModule } from 'vuex-class-modules'
import { store } from '@/store/index'
import { authModule } from '@/store/authModule'
import { nativeProvider } from '@/providers/native/native.provider'
import { facebookProvider } from '@/providers/facebook/facebook.provider'
import Vue from 'vue'

@Module
class AppModule extends VuexModule {

  initialized = false
  loader: any = null
  loadedCommunity = false

  constructor() {
    super({ store, name: 'app' })
  }

  get isInitialized() {
    return this.initialized
  }

  get isLoadedCommunity() {
    return this.loadedCommunity
  }

  @Mutation
  setInitializedDone() {
    this.initialized = true
  }

  @Mutation
  setLoadedCommunity() {
    this.loadedCommunity = true
  }

  @Mutation
  setLoader(loader: any) {
    Vue.set(this, 'loader', loader)
  }

  @Action
  initialize() {
    return this.initialized
      ? Promise.resolve()
      : this.doInitialize()
  }

  @Action
  doInitialize() {
    nativeProvider.isMobile()
      .then((isMobile) => {
        if (!isMobile) {
          facebookProvider.initWeb()
        }
      })

    return Promise.all([
      authModule.initialize()
    ]).then(() => {
      this.setInitializedDone()
      return Promise.resolve()
    })
  }

  @Action
  showLoader(ionic: any) {
    return ionic.loadingController.create()
      .then((loader) => loader.present()
        .then(() => this.setLoader(loader)))
  }

  @Action
  hideLoader() {
    if (this.loader) {
      this.loader.dismiss().then(() => ({}))
    }
  }
}

export const appModule = new AppModule()
