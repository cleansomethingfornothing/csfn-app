<template>
    <ion-page class="cleanups-map">
        <ion-header class="z-50" mode="ios">
            <ion-toolbar class="pb-2 flex items-center pr-6" mode="ios" @keyup.enter="search">
                <ion-buttons slot="start" class="mt-3">
                    <ion-button fill="clear" shape="round" size="large" @click="$router.back()">
                        <ion-icon name="arrow-back"></ion-icon>
                    </ion-button>
                </ion-buttons>
                <text-item v-model="searchText" :clear="true" :outline="true" :placeholder="$t('search-place')"
                           :rounded="true"
                           class="mt-2" icon="search" type="search" @blur="clear" @cleared="clear"></text-item>
            </ion-toolbar>
            <ion-progress-bar v-if="loading" color="primary" type="indeterminate"></ion-progress-bar>
        </ion-header>
        <ion-content>
            <ion-card class="top-0 w-full absolute z-40 m-0">
                <selection-list :element-value="location => addressToString(location.address)" :elements="searchResults"
                                element-key="id"
                                icon="location"
                                @selected="selectedSearch">
                </selection-list>
            </ion-card>

            <div id="map_canvas" class="h-full w-full z-30"></div>

            <transition name="fade-up">
                <div v-if="selectedCleanup"
                     class="absolute bottom-0 w-full flex justify-center md:justify-start lg:w-1/2 xl:w-1/3"
                     style="z-index: 1000">
                    <div class="w-full z-50 ">
                        <map-cleanup-card @click="openSelectedCleanup"></map-cleanup-card>
                    </div>
                </div>
            </transition>
        </ion-content>
    </ion-page>
</template>
<script lang=ts>
import Vue from 'vue'
import Component from 'vue-class-component'
import {Watch} from 'vue-property-decorator'
import Map from '@/tools/Map'
import {placesProvider} from '@/providers/places/places.provider'
import ToastPresenter from '@/tools/ToastPresenter'
import ErrorMessage from '@/tools/ErrorMessage'
import Location from '@/types/Location'
import {locationModule} from '@/store/locationModule'
import SelectionList from '@/views/components/common/SelectionList.vue'
import InputItem from '@/views/components/common/InputItem.vue'
import {addressToString} from '@/tools/Utils'
import {cleanupsModule} from '@/store/cleanupsModule'
import Cleanup from '@/types/Cleanup'
import {debounce} from 'lodash'
import MapCleanupCard from '@/views/components/home/CleanupCard.vue'

@Component({
    name: "map-modal",
    components: {SelectionList, TextItem: InputItem, MapCleanupCard}
})
export default class MapModal extends Vue {

    loading = false
    searchText = ''
    searchResults: Location[] = []
    selectedResult: Location
    selectedCleanup = 0
    map: Map

    get cleanups() {
        return cleanupsModule.getMarkers
    }

    mounted() {
        const selected = cleanupsModule.getCleanup
        setTimeout(() => {
            this.map = new Map({
                element: 'map_canvas',
                origin: locationModule.getCoords,
                isInput: false,
                onTouch: this.touched
            })
            this.fetch()
            if (selected) {
                setTimeout(() => {
                    this.selectCleanup(selected)
                }, 100)
            }
        })
    }

    touched() {
        this.selectedCleanup = 0
        cleanupsModule.setCleanup(null)
        debounce(this.fetch, 100)
    }

    fetch() {
        this.loading = true
        cleanupsModule.fetchMarkers(this.map.getBounds())
    }

    @Watch('cleanups')
    cleanupsChanged(cleanups: { [id: string]: Cleanup }) {
        this.loading = false
        for (const cleanup of Object.values(cleanups)) {
            this.map.addMarker(cleanup.location.coords,
                '/img/pin.png',
                () => this.selectCleanup(cleanup))
        }
    }

    selectCleanup(cleanup: Cleanup) {
        this.map.moveCamera({lat: cleanup.location.coords.lat - 0.01, lng: cleanup.location.coords.lng})
        cleanupsModule.fetchCleanup(cleanup.id)
        this.selectedCleanup = cleanup.id
    }

    openSelectedCleanup() {
        this.$router.push('/activity/' + this.selectedCleanup)
    }

    search() {
        this.loading = true
        placesProvider.searchPlace(this.searchText, locationModule.getAddress.countryCode)
            .then((results) => {
                this.loading = false
                this.searchResults = results
            })
            .catch((error) => {
                this.loading = false
                ToastPresenter.present(this.$ionic, ErrorMessage.getMessage(error))
            })
    }

    clear() {
        setTimeout(() => {
            this.searchResults = []
        }, 300)
    }

    selectedSearch(selected: Location) {
        this.searchText = ''
        this.selectedResult = selected
        this.map.moveCamera(selected.coords)
    }

    addressToString(address) {
        return addressToString(address)
    }

}
</script>
