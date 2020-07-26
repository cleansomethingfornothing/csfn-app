<template>
  <page-transparent-header ref="page">
    <ion-page>
      <transparent-header :title="$t('community')" :no-back="true" :no-gradient="true">
        <template slot="end-buttons">
          <transition name="fade">
            <units-switch class="mr-2" @change="unitChanged" :value="unit"/>
          </transition>
        </template>
      </transparent-header>

      <ion-content ref="community-content" class="fullscreen text-left" :scroll-events="true" color="white"
                   @ionScroll="scrolled">
        <div
          class="p-4 lg:p-16 bg-poly bg-poly-2 h-64 lg:h-88 ios:h-60 sm:ios:h-64 lg:ios:h-72 xl:ios:p-24 xl:ios:h-88 flex flex-col">
          <!-- Total number -->
          <div class="h-toolbar-top sm:ios:mb-2"></div>
          <div class="flex flex-col justify-center h-full">
            <div class="flex justify-between items-center">
              <div
                class="flex flex-col items-center justify-center relative w-14 mb-6 sm:ml-4 md:ml-8 h-14 rounded-full ion-activatable overflow-hidden shadow-md">
                <img src="@/assets/img/world.svg" class="w-12 sm:w-14 absolute">
                <span class="text-3xl sm:text-4xl font-medium text-white absolute">59</span>
                <ion-ripple-effect/>
              </div>

              <div class="text-right">
                <number-display :number="unit === 'kg' ? 567890 : 1589678"></number-display>
                <span class="text-lg lg:text-2xl text-white">{{$t(`total-${unit}`)}}</span>
              </div>
            </div>

            <!--
            <div class="flex justify-between total-title">


            </div>
            -->
          </div>
        </div>
        <div class="-mt-24 sm:-mt-24 lg:-mt-32 xl:-mt-40 z-10 pt-3 lg:pt-4">
          <div class="sm:ios:pt-4"></div>
          <wave :num="2"/>
        </div>
        <div class="-mt-14 ios:-mt-16 lg:-mt-18 p-2 lg:px-24">
          <!--
          <ion-button shape="round" expand="block" class="gradient-button">
            <ion-label color="white" class="font-bold">Publicar limpieza</ion-label>
          </ion-button>
          -->
          <ion-card button class="lg:h-64">
            <community-map/>
          </ion-card>
        </div>

        <div class="p-4 lg:px-24">
          <div class="flex justify-between items-center">
            <ion-label color="primary" class="ml-2 font-bold text-xl">{{$t('last-months')}}</ion-label>
            <ion-segment class="w-1/4 world-tabs">
              <ion-segment-button value="sunny" checked>
                <ion-label class="text-xs">World</ion-label>
              </ion-segment-button>
              <ion-segment-button value="rainy">
                <ion-label class="text-xs">Spain</ion-label>
              </ion-segment-button>
            </ion-segment>
          </div>
          <div class="pt-2"></div>
          <months-chart ref="chart"
                        :month-stats="[{month: 10, year: 2019, kilos: 1500},{month: 11, year: 2019, kilos: 1700},{month: 12, year: 2019, kilos: 900},{month: 1, year: 2020, kilos: 7000},{month: 2, year: 2020, kilos: 2000},
          {month: 3, year: 2020, kilos: 4000},{month: 4, year: 2020, kilos: 3000},{month: 5, year: 2020, kilos: 4500},{month: 6, year: 2020, kilos: 2500}]"/>
        </div>

        <div class="mt-4 px-4 lg:px-24">
          <ion-label color="primary" class="ml-2 font-bold text-xl">{{$t('top-users')}}</ion-label>
        </div>
        <ion-list class="lg:px-24 mb-20" lines="full">
          <ion-item v-for="i of [0, 1,2,3,4,5,6,7,8,9]" :key="i" class=" user lg:my-2 lg:rounded-full" button
                    :class="i === 0 ? 'user-gold' : i === 1 ? 'user-silver' : i === 2 ? 'user-bronze' : ''"
                    detail="false">
            <div class="user-bg"></div>
            <span slot="start" :style="`background-color: rgba(var(--ion-color-secondary-rgb), 0.${90 - (i/2 * 10)})`"
                  class="w-6 h-6 flex justify-center items-center rounded-full font-bold text-white">
            {{i + 1}}
            </span>
            <ion-avatar slot="start" class="-ml-4">
              <img src="/img/user-placeholder.png">
            </ion-avatar>
            <ion-label class="font-bold my-6 lg:my-4">@user_name</ion-label>
            <p class="pr-2">1000 Kg</p>
          </ion-item>
        </ion-list>

        <!--
        <ion-fab vertical="bottom" horizontal="end" slot="fixed" class="fab-gradient">
          <ion-fab-button color="white">
            <ion-icon size="large" :src="require('@/assets/img/icons/add.svg')"></ion-icon>
          </ion-fab-button>
        </ion-fab>
        -->
        <div class="pt-10"></div>
      </ion-content>
    </ion-page>
  </page-transparent-header>
</template>
<script lang=ts>
  import Vue from 'vue'
  import Component from 'vue-class-component'
  import CommunityMap from '@/views/components/community/CommunityMap.vue'
  import MonthsChart from '@/views/components/community/MonthsChart.vue'
  import TransparentHeader from '@/views/components/common/TransparentHeader.vue'
  import Wave from '@/views/components/common/Wave.vue'
  import {nativeProvider} from '@/providers/native/native.provider'
  import UnitsSwitch from '@/views/components/community/UnitsSwitch.vue'
  import PageTransparentHeader from '@/views/components/common/PageTransparentHeader.vue'
  import NumberDisplay from '@/views/components/community/NumberDisplay.vue'

  @Component({
    name: "community-page",
    components: {NumberDisplay, PageTransparentHeader, UnitsSwitch, Wave, TransparentHeader, MonthsChart, CommunityMap}
  })
  export default class CommunityPage extends Vue {

    loaded = false
    unit = 'lt'

    init() {
      (this.$refs['chart'] as any).init()
      if (!this.loaded) {
        nativeProvider.hideSplashScreen()
        this.loaded = true
      }
    }

    unitChanged(unit) {
      this.unit = unit
    }

    exit() {
      (this.$refs['chart'] as any).exit()
    }

    scrolled(event) {
      (this.$refs['page'] as any).scrolled(event)
    }
  }
</script>
<style scoped>
  .no-border ion-toolbar {
    --border-width: 0 !important;
    --box-shadow: none !important;
  }

  .world-tabs ion-segment-button {
    width: 20px;
    --padding-start: 2px;
    --padding-end: 2px;
  }

</style>
