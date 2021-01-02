<template>
  <div class="relative w-full h-full">
    <transition name="fade">
      <div class="w-full h-full absolute top-0 left-0 z-40" v-if="!map">
        <ion-skeleton-text animated class="w-full h-full absolute left-0 top-0 z-50 m-0"></ion-skeleton-text>
        <img src="@/assets/img/map_placeholder.png"
             class="top-0 left-0 w-full h-full absolute object-cover object-center z-40">
      </div>
    </transition>
    <div id="home-map" class="w-full h-full"></div>
    <transition name="fade-up">
      <div class="absolute bottom-0 w-full flex justify-center md:justify-start lg:w-1/2 xl:w-1/3"
           v-if="selectedCleanup"
           style="z-index: 1000">
        <div class="w-full z-50 ">
            <map-cleanup-card :cleanup="selectedCleanup" @click="click"></map-cleanup-card>
        </div>
      </div>
    </transition>
  </div>
</template>
<script lang=ts>
import Vue from 'vue'
import Map from '@/tools/Map'
import Component from 'vue-class-component'
import {Emit, Prop, Watch} from 'vue-property-decorator'
import Coords from '@/types/Coords'
import MapCleanupCard from '@/views/components/home/CleanupCard.vue'
import Cleanup from "@/types/Cleanup";

@Component({
  name: "cleanups-map",
  components: {MapCleanupCard}
})
export default class CleanupsMap extends Vue {

  map: Map = null

  selectedCleanup: Cleanup = null

  @Prop(Object)
  cleanups: { [id: string]: Cleanup }

  @Prop(Object)
  origin: Coords

  @Watch('origin')
  originChange(origin) {
    if (!this.map) {
      this.init()
    } else {
      this.map.setOrigin(origin)
    }
  }

  @Emit('click')
  click() {
    return this.selectedCleanup.id
  }

  @Watch('cleanups')
  cleanupsChanged(cleanups: { [id: string]: Cleanup }) {
    if (!cleanups) return
    this.map.removeMarkers()
    for (const cleanup of Object.values(cleanups)) {
      this.map.addMarker(cleanup.location.coords,
          '/img/cleanup_pin.png',
          () => {
            this.selectedCleanup = undefined
            this.map.moveCamera({lat: cleanup.location.coords.lat - 0.05, lng: cleanup.location.coords.lng})
            setTimeout(() => {
              this.selectedCleanup = cleanup
            }, 100)
          })
    }
  }

  mounted(): void {
    if (this.origin) {
      this.init()
    }
  }

  init() {
    this.map = new Map({
      element: 'home-map',
      isInput: false,
      origin: this.origin,
      zoom: 10,
      onTouch: () => this.selectedCleanup = undefined
    })
    this.cleanupsChanged(this.cleanups)
  }

  openCleanup(id: string) {
    this.$router.push({name: 'Cleanup', params: {id}})
  }

}
</script>
<style scoped>

</style>
