<template>
  <div>
    <ion-header mode="ios">
      <ion-toolbar mode="ios">
        <ion-buttons slot="start">
          <ion-button @click="close" shape="round" color="dark" fill="clear">
            <ion-icon name="close-outline" slot="icon-only"></ion-icon>
          </ion-button>
        </ion-buttons>
        <ion-title>{{ title }}</ion-title>
      </ion-toolbar>
    </ion-header>
    <div class="w-full h-full">
      <div id="modal-map" class="h-full w-full"></div>
    </div>
  </div>
</template>
<script lang=ts>
import Vue from 'vue'
import Component from 'vue-class-component'
import {Prop} from 'vue-property-decorator'
import Coords from '@/types/Coords'
import Map from '@/tools/Map'

@Component({
  name: "map-modal"
})
export default class MapModal extends Vue {

  @Prop(String)
  title: string

  @Prop(Object)
  origin: Coords

  @Prop(String)
  pin: string

  mounted(): void {
    setTimeout(() => {
      const map = new Map({element: 'modal-map', isInput: false, origin: this.origin})
      map.addMarker(this.origin, this.pin)
    })
  }

  close() {
    this.$ionic.modalController.dismiss()
  }
}
</script>
