<template>
  <div class="w-full h-full">
    <div class="absolute left-0 top-0 mt-2 ml-2 z-50">
      <ion-button @click="close" shape="round" color="dark" fill="clear" class="close-btn">
        <ion-icon name="close" slot="icon-only"></ion-icon>
      </ion-button>
    </div>
    <div id="modal-map" class="h-full w-full"></div>
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

    @Prop(Object)
    origin: Coords

    @Prop(String)
    pin: string

    mounted(): void {
      setTimeout(() => {
        const map = new Map({element: 'modal-map', isInput: false, origin: this.origin, pin: this.pin})
        map.addMarker(this.origin)
      })
    }

    close() {
      this.$ionic.modalController.dismiss()
    }
  }
</script>
<style>
  ion-button.close-btn {
    --padding-start: 6px;
    --padding-end: 6px;
  }
</style>
