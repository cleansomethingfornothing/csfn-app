<template>
    <div class="select-location">
        <ion-header class="z-50" mode="ios">
            <ion-toolbar class="px-2 pb-2" mode="ios" @keyup.enter="search">
                <text-item v-model="searchText" :clear="true" :outline="true" :placeholder="searchPlaceholder"
                           :rounded="true"
                           class="mt-2" icon="search" type="search" @blur="clear" @cleared="clear"></text-item>
            </ion-toolbar>
            <ion-progress-bar v-if="searching" color="primary" type="indeterminate"></ion-progress-bar>
        </ion-header>
        <ion-content>
            <ion-card class="top-0 w-full absolute z-40 m-0">
                <selection-list :element-value="location => addressToString(location.address)" :elements="searchResults"
                                element-key="id"
                                icon="location" @selected="selected">
                </selection-list>
            </ion-card>
            <div id="map_canvas" class="h-full w-full z-30"></div>
        </ion-content>
        <ion-footer mode="ios">
            <ion-toolbar v-if="showRadius">
                <ion-item>
                    <ion-label>{{ $t('radius') }}</ion-label>
                    <ion-range :value="radius" class="pl-4" color="primary" max="5"
                               min="0.5"
                               mode="ios" step="0.5" @ionChange="radiusChange($event.target.value)">
                    </ion-range>
                    <ion-label class="ml-2">{{ radius }} Km</ion-label>
                </ion-item>
            </ion-toolbar>
            <ion-toolbar class="px-1">
                <ion-buttons slot="start">
                    <ion-button color="black" fill="clear" shape="round" @click="cancel">
                        {{ cancelText }}
                    </ion-button>
                </ion-buttons>
                <ion-buttons slot="end">
                    <ion-button color="primary" fill="solid" shape="round" @click="save">
                        {{ acceptText }}
                    </ion-button>
                </ion-buttons>
            </ion-toolbar>
        </ion-footer>
    </div>
</template>
<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import {Prop} from 'vue-property-decorator'
import Coords from '@/types/Coords'
import InputItem from '@/views/components/common/InputItem.vue'
import Map from '@/tools/Map'
import SelectionList from '@/views/components/common/SelectionList.vue'
import Location from '@/types/Location'
import {placesProvider} from '@/providers/places/places.provider'
import ToastPresenter from '@/tools/ToastPresenter'
import ErrorMessage from '@/tools/ErrorMessage'
import Address from '@/types/Address'
import {addressToString} from '@/tools/Utils'

@Component({
    name: 'select-location',
    components: {SelectionList, TextItem: InputItem}
})
export default class SelectCleanupLocationModal extends Vue {
    @Prop(String)
    pin: string

    @Prop(Boolean)
    showRadius: boolean

    @Prop(Object)
    currentCoords: Coords

    @Prop(Object)
    currentAddress: Address

    @Prop(String)
    searchPlaceholder: string

    @Prop(String)
    acceptText: string

    @Prop(String)
    cancelText: string

    searching = false
    searchText = ''
    searchResults: Location[] = []
    selectedResult: Location
    radius = 1
    map: Map

    mounted() {
        setTimeout(() => {
            this.map = new Map({
                element: 'map_canvas',
                origin: this.currentCoords,
                isInput: true
            })
            this.map.addMarker(this.currentCoords, this.pin)
            if (this.showRadius) {
                this.map.setCircle(this.currentCoords, this.radius)
            }
        })
    }

    clearSearch() {
        this.searchText = ''
    }

    addressToString(address) {
        return addressToString(address)
    }

    radiusChange(radius) {
        this.radius = radius
        this.map.setCircleRadius(radius)
    }

    search() {
        this.searching = true
        placesProvider.searchPlace(this.searchText, this.currentAddress.countryCode)
            .then((results) => {
                this.searching = false
                this.searchResults = results
            })
            .catch((error) => {
                this.searching = false
                ToastPresenter.present(this.$ionic, ErrorMessage.getMessage(error))
            })
    }

    selected(selected: Location) {
        this.searchText = ''
        this.selectedResult = selected
        this.map.moveCamera(selected.coords)
        this.map.positionSelected(selected.coords)
    }

    clear() {
        setTimeout(() => {
            this.searchResults = []
        }, 300)
    }

    save() {
        this.$ionic.modalController.dismiss({
            selectedCoords: this.map.getSelectedPosition(),
            radius: this.radius
        })
    }

    cancel() {
        this.$ionic.modalController.dismiss()
    }
}
</script>
<style>
.select-location ion-button {
    --padding-bottom: 18px;
    --padding-end: 24px;
    margin-top: -3px;
    --padding-start: 24px;
    --padding-top: 18px;
}

.search-results {
    top: 100%;
}
</style>
