<template>
  <ion-page>
    <transparent-header :title="$t('alerts')" :scrolled="scrolled" :no-back="true" :no-gradient="true">
      <!--
      <template slot="end-buttons">
        <ion-button color="white" fill="outline" shape="round">
          {{$t('publish')}}
        </ion-button>
      </template>
      -->
    </transparent-header>

    <ion-content class="fullscreen " :scroll-events="true" @ionScroll="onScroll" color="white">
      <div class="bg-poly bg-poly-3 h-64 lg:h-88 ios:h-60 sm:ios:h-64 lg:ios:h-72 xl:ios:h-88"></div>
      <div class="-mt-24 lg:-mt-32 xl:-mt-40 -mb-16 pt-4 sm:ios:pt-8">
        <div style="padding-top: 5px"></div>
        <wave :num="3"/>
      </div>
      <div class="pt-2"></div>
      <cleanups-list :cleanups="cleanups" :coords="coords"></cleanups-list>
    </ion-content>
  </ion-page>
</template>
<script lang=ts>
  import Vue from 'vue'
  import Component from 'vue-class-component'
  import Wave from '@/views/components/common/Wave.vue'
  import TransparentHeader from '@/views/components/common/TransparentHeader.vue'
  import {cleanupsModule} from '@/store/cleanupsModule'
  import CleanupsList from '@/views/components/home/CleanupsList.vue'
  import {locationModule} from '@/store/locationModule'

  @Component({
    name: "alerts-page",
    components: {CleanupsList, TransparentHeader, Wave}
  })
  export default class AlertsPage extends Vue {

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
