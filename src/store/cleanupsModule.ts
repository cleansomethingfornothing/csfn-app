import {Action, Module, Mutation, VuexModule} from 'vuex-class-modules'
import Cleanup from '@/types/Cleanup'
import {cleanupsProvider} from '@/providers/data/cleanups.provider'
import {store} from '@/store/index'
import Vue from 'vue'
import {locationModule} from '@/store/locationModule'
import {imagesProvider} from '@/providers/data/images.provider'
import {Plugins} from "@capacitor/core";
import {calculateDistance} from '@/tools/Utils'

const {FirebaseAnalytics} = Plugins;

@Module
class CleanupsModule extends VuexModule {

    markers: Cleanup[] = []
    cleanup: Cleanup = null

    constructor() {
        super({store, name: 'cleanups'})
    }

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
            .then((images) => cleanupsProvider.publish({...cleanup, weight: Number(cleanup.weight), pictures: images}))
            .then((published) => {
                FirebaseAnalytics.logEvent({
                    name: 'publish_content',
                    params: {
                        content_type: 'cleanup',
                        content_id: published.id,
                        distance_to_user: calculateDistance(locationModule.getCoords, cleanup.location.coords)
                    }
                })
            })
    }

    @Action
    update({cleanup, removedPictures}: { cleanup: Cleanup, removedPictures: number[] }) {
        const picturesToUpload = cleanup.pictures.filter(p => p instanceof Blob) as File[]
        return Promise.all(removedPictures.map((id) => imagesProvider.removeImage(id)))
            .then(() => picturesToUpload.length
                ? imagesProvider.uploadImages(picturesToUpload, 'publish-cleanup')
                : Promise.resolve([]))
            .then((images) => cleanupsProvider.update(cleanup.id, {
                ...cleanup,
                weight: Number(cleanup.weight),
                id: undefined,
                user: undefined,
                pictures: [...cleanup.pictures.filter(p => !(p instanceof Blob)), ...images]
            }))
            .then(() => {
                FirebaseAnalytics.logEvent({
                    name: 'update_content',
                    params: {
                        content_type: 'cleanup',
                        content_id: cleanup.id,
                        distance_to_user: calculateDistance(locationModule.getCoords, cleanup.location.coords)
                    }
                })
            })
    }

    @Action
    remove(id: number) {
        return cleanupsProvider.remove(id)
            .then(() => {
                FirebaseAnalytics.logEvent({
                    name: 'delete_content',
                    params: {
                        content_type: 'cleanup',
                        content_id: id
                    }
                })
            })
    }

    @Action
    fetchMarkers(bounds?: string) {
        return cleanupsProvider.fetchMarkers(locationModule.getCoords, bounds)
            .then((markers) => this.setMarkers(markers))
    }

    @Action
    fetchCleanup(id: number) {
        return cleanupsProvider.fetchCleanup(id)
            .then((cleanup) => {
                this.setCleanup(cleanup)
                FirebaseAnalytics.logEvent({
                    name: 'select_content',
                    params: {
                        content_type: 'cleanup',
                        content_id: cleanup.id,
                        distance_to_user: calculateDistance(locationModule.getCoords, cleanup.location.coords)
                    }
                })
            })
    }
}

export const cleanupsModule = new CleanupsModule()
