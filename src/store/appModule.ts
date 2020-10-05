import {Action, Module, Mutation, VuexModule} from 'vuex-class-modules'
import {store} from '@/store/index'
import {authModule} from '@/store/authModule'
import {cleanupsModule} from '@/store/activitiesModule'
import {nativeProvider} from '@/providers/native/native.provider'
import {facebookProvider} from '@/providers/facebook/facebook.provider'
import {Controllers} from '@ionic/vue'
import {HTMLIonOverlayElement} from '@ionic/core'
import Vue from 'vue'
import {locationModule} from '@/store/locationModule'

@Module
class AppModule extends VuexModule {

  initialized = false
  loader: HTMLIonOverlayElement = null

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

  @Mutation
  setLoader(loader: HTMLIonOverlayElement) {
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
      authModule.initialize(),
      cleanupsModule.initialize(),
    ]).then(() => {
      this.setInitializedDone()
      return Promise.resolve()
    })
  }

  @Action
  showLoader(ionic: Controllers) {
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
