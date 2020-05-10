<template>
  <ion-page>
    <transparent-header :title="$t('community')" :scrolled="scrolled" :no-back="true" :no-gradient="true">
      <template slot="end-buttons" v-if="scrolled">
        <units-switch class="mr-1" @change="unitChanged"/>
      </template>
    </transparent-header>

    <ion-content class="fullscreen text-left" :scroll-events="true" @ionScroll="onScroll" color="white">
      <div
        class="p-4 lg:p-16 bg-poly bg-poly-2 h-64 lg:h-88 ios:h-60 sm:ios:h-64 lg:ios:h-72 xl:ios:p-24 xl:ios:h-88 flex flex-col">
        <!-- Total number -->
        <div class="h-toolbar-top sm:ios:mb-2"></div>
        <div class="flex flex-col justify-center h-full">
          <div class="flex justify-between total-title">
            <span class="text-lg lg:text-2xl text-white">{{$t('total-collected')}}</span>
            <units-switch @change="unitChanged"/>
          </div>
          <ion-label class="text-5xl lg:text-6xl" color="white">45.059.443</ion-label>
        </div>
      </div>
      <div class="-mt-24 sm:-mt-24 lg:-mt-32 xl:-mt-40 z-10 pt-3 lg:pt-4">
        <div class="sm:ios:pt-4"></div>
        <wave :num="2"/>
      </div>
      <div class="-mt-12 ios:-mt-16 lg:-mt-20 p-2 lg:px-24">
        <ion-card button class="lg:h-64">
          <community-map/>
        </ion-card>
      </div>

      <div class="p-4 lg:px-24">
        <ion-label color="primary" class="ml-2 font-bold text-xl">{{$t('last-months')}}</ion-label>
        <div class="pt-2"></div>
        <months-chart ref="chart"
                      :month-stats="[{month: 10, year: 2019, kilos: 1500},{month: 11, year: 2019, kilos: 1700},{month: 12, year: 2019, kilos: 900},{month: 1, year: 2020, kilos: 7000},{month: 2, year: 2020, kilos: 2000},
          {month: 3, year: 2020, kilos: 4000},{month: 4, year: 2020, kilos: 3000},{month: 5, year: 2020, kilos: 4500}]"/>
      </div>

      <div class="p-4 lg:px-24">
        <ion-label color="primary" class="ml-2 font-bold text-xl">{{$t('top-users')}}</ion-label>
      </div>
      <ion-list class="lg:px-24">
        <ion-item v-for="i of [0, 1,2,3,4,5,6,7,8,9]" :key="i" class=" user lg:my-2 lg:rounded-full" button
                  :class="i === 0 ? 'user-gold' : i === 1 ? 'user-silver' : i === 2 ? 'user-bronze' : ''"
                  detail="false">
          <div class="user-bg"></div>
          <span slot="start"
                class="w-6 h-6 flex justify-center items-center rounded-full font-bold num">
            {{i + 1}}
          </span>
          <ion-avatar slot="start" class="-ml-2">
            <img src="/img/user-placeholder.png">
          </ion-avatar>
          <ion-label class="font-bold my-6 lg:my-4">@user_name</ion-label>
          <p class="pr-2">1000 Kg</p>
        </ion-item>
      </ion-list>

      <div class="pt-10"></div>
    </ion-content>
  </ion-page>
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

  @Component({
    name: "community-page",
    components: {UnitsSwitch, Wave, TransparentHeader, MonthsChart, CommunityMap}
  })
  export default class CommunityPage extends Vue {

    loaded = false
    scrolled = false

    init() {
      (this.$refs['chart'] as any).init()
      if (!this.loaded) {
        nativeProvider.hideSplashScreen()
        this.loaded = true
      }
    }

    unitChanged(unit) {
      console.log(unit)
    }

    exit() {
      (this.$refs['chart'] as any).exit()
    }

    onScroll(event: CustomEvent): void {
      this.scrolled = event.detail.scrollTop > 0;
    }
  }
</script>
<style scoped>
  .no-border ion-toolbar {
    --border-width: 0 !important;
    --box-shadow: none !important;
  }

  .user-gold {
    --background: rgba(255, 198, 10, 0.25) !important;
  }

  .user-silver {
    --background: rgba(192, 192, 192, 0.25) !important;
  }

  .user-bronze {
    --background: rgba(205, 127, 50, 0.25) !important;
  }

  .user-gold .num, .user-silver .num, .user-bronze .num {
    color: #fff;
  }

  .user-gold .num {
    background-color: #e8b923;
  }

  .user-silver .num {
    background-color: silver;
  }

  .user-bronze .num {
    background-color: chocolate;
  }

  .bg-gradient {
    /*background: linear-gradient(var(--ion-color-primary), var(--ion-color-secondary));*/
  }
</style>
