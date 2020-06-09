<template>
  <div class="select-location">
    <ion-header mode="ios" class="z-50">
      <ion-toolbar class="p-2" @keyup.enter="search" mode="ios">
        <text-item class="mt-2" icon="search" :outline="true" :placeholder="searchPlaceholder" :rounded="true"
                   type="search" v-model="searchText" :clear="true" @cleared="clear" @blur="clear"></text-item>
      </ion-toolbar>
      <ion-progress-bar v-if="searching" type="indeterminate" color="primary"></ion-progress-bar>
    </ion-header>
    <ion-content>
      <ion-card class="top-0 w-full absolute z-40 m-0">
        <selection-list :elements="searchResults" element-key="id" icon="location"
                        :element-value="(element) => element.toString()" @selected="selected">
        </selection-list>
      </ion-card>
      <div id="map_canvas" class="h-full w-full z-30"></div>
    </ion-content>
    <ion-footer mode="ios">
      <ion-toolbar v-if="showRadius">
        <ion-item>
          <ion-label>Radio</ion-label>
          <ion-range min="1" max="10" color="primary" step="1" @ionChange="radiusChange($event.target.value)"
                     :value="radius" mode="ios" class="pl-4">
          </ion-range>
          <ion-label class="ml-2">{{radius}} Km</ion-label>
        </ion-item>
      </ion-toolbar>
      <ion-toolbar class="px-1">
        <ion-buttons slot="start">
          <ion-button fill="clear" color="black" shape="round" @click="cancel">
            {{cancelText}}
          </ion-button>
        </ion-buttons>
        <ion-buttons slot="end">
          <ion-button fill="solid" color="primary" shape="round" @click="save">
            {{acceptText}}
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

  @Component({
    name: 'select-location',
    components: {SelectionList, TextItem: InputItem}
  })
  export default class SelectLocation extends Vue {
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
        this.map = new Map({element: 'map_canvas', origin: this.currentCoords, isInput: true})
        this.map.addMarker(this.currentCoords, this.pin)
        if (this.showRadius) {
          this.map.setCircle(this.currentCoords, this.radius)
        }
      })
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
      this.searchText = selected.toString()
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
    margin-top: -3px;
    --padding-top: 18px;
    --padding-bottom: 18px;
    --padding-start: 24px;
    --padding-end: 24px;
  }

  .search-results {
    top: 100%;
  }
</style>
