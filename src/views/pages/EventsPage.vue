<template>
  <ion-page>
    <transparent-header :title="$t('events')" :scrolled="scrolled" :no-back="true" :no-gradient="true"/>

    <ion-content class="fullscreen " :scroll-events="true" @ionScroll="onScroll" color="white">
      <div class="p-4 lg:p-24 pt-24 bg-poly bg-poly-4 h-64 lg:h-88 ios:h-60 sm:ios:h-64 lg:ios:h-72 xl:ios:h-88">
      </div>
      <div class="-mt-24 pt-3 lg:-mt-32 xl:-mt-40 z-10 -mb-16 sm:ios:pt-4">
        <div class="sm:ios:pt-3"></div>
        <wave :num="4"/>
      </div>
      <div class="pt-2"></div>
      <cleanups-list :cleanups="cleanups" :coords="coords"></cleanups-list>
    </ion-content>
  </ion-page>
</template>
<script lang=ts>
  import Vue from 'vue'
  import Component from 'vue-class-component'
  import TransparentHeader from '@/views/components/common/TransparentHeader.vue'
  import Wave from '@/views/components/common/Wave.vue'
  import {cleanupsModule} from '@/store/cleanupsModule'
  import {locationModule} from '@/store/locationModule'
  import CleanupsList from '@/views/components/home/CleanupsList.vue'

  @Component({
    name: "events-page",
    components: {CleanupsList, Wave, TransparentHeader}
  })
  export default class EventsPage extends Vue {

    scrolled = false

    get cleanups() {
      return cleanupsModule.getCleanups
    }

    get coords() {
      return locationModule.getCoords
    }

    init() {
      cleanupsModule.fetch()
    }

    exit() {
      return
    }


    onScroll(event: CustomEvent): void {
      this.scrolled = event.detail.scrollTop > 0;
    }
  }
</script>
<style scoped>

</style>
