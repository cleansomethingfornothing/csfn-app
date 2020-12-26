import {Action, Module, Mutation, VuexModule} from 'vuex-class-modules'
import Cleanup from '@/types/Cleanup'
import {cleanupsProvider} from '@/providers/data/cleanups.provider'
import {store} from '@/store/index'
import Vue from 'vue'
import {locationModule} from '@/store/locationModule'

@Module
class CleanupsModule extends VuexModule {

    constructor() {
        super({store, name: 'cleanups'})
    }

    markers: Cleanup[] = []

    get getMarkers() {
        return this.markers
    }

    @Mutation
    setMarkers(markers: Cleanup[]) {
        console.log(markers)
        Vue.set(this, 'markers', markers)
    }

    @Action
    publish(cleanup: Cleanup) {
        return cleanupsProvider.publish(cleanup)
    }

    @Action
    fetchMarkers() {
        return cleanupsProvider.fetchMarkers(locationModule.getCoords)
            .then((markers) => this.setMarkers(markers))
    }
}

export const cleanupsModule = new CleanupsModule()