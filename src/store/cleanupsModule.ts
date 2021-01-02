import {Action, Module, Mutation, VuexModule} from 'vuex-class-modules'
import Cleanup from '@/types/Cleanup'
import {cleanupsProvider} from '@/providers/data/cleanups.provider'
import {store} from '@/store/index'
import Vue from 'vue'
import {locationModule} from '@/store/locationModule'
import {imagesProvider} from '@/providers/data/images.provider'

@Module
class CleanupsModule extends VuexModule {

    constructor() {
        super({store, name: 'cleanups'})
    }

    markers: Cleanup[] = []
    cleanup: Cleanup = null

    get getMarkers() {
        return this.markers
    }

    get getCleanup() {
        return this.cleanup
    }

    @Mutation
    setMarkers(markers: Cleanup[]) {
        Vue.set(this, 'markers', markers)
    }

    @Mutation
    setCleanup(cleanup: Cleanup) {
        Vue.set(this, 'cleanup', cleanup)
    }

    @Action
    publish(cleanup: Cleanup) {
        return imagesProvider.uploadImages(cleanup.pictures as File[], 'publish-cleanup')
            .then((images) => cleanupsProvider.publish({...cleanup, pictures: images}))
    }

    @Action
    update(cleanup: Cleanup) {
        return imagesProvider.uploadImages(cleanup.pictures.filter(p => p instanceof Blob) as File[], 'publish-cleanup')
            .then((images) => cleanupsProvider.update(cleanup.id, {
                ...cleanup,
                id: undefined,
                user: undefined,
                pictures: [...cleanup.pictures.filter(p => !(p instanceof Blob)), ...images]
            }))
    }

    @Action
    fetchMarkers(bounds?: string) {
        return cleanupsProvider.fetchMarkers(locationModule.getCoords, bounds)
            .then((markers) => this.setMarkers(markers))
    }

    @Action
    fetchCleanup(id: number) {
        return cleanupsProvider.fetchCleanup(id)
            .then((cleanup) => this.setCleanup(cleanup))
    }
}

export const cleanupsModule = new CleanupsModule()
