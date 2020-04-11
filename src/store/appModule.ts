import {Module, VuexModule} from 'vuex-class-modules'
import {store} from '@/store/index'

@Module
class AppModule extends VuexModule {

  constructor() {
    super({store, name: 'app'})
  }



}


