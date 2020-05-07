<template>
  <ion-page>
    <transparent-header :title="$t('community')" :scrolled="scrolled" :no-back="true" :no-gradient="true"/>
    <!--
    <ion-header mode="ios" class="border-0 no-border">
      <ion-toolbar mode="ios" color="primary" class="border-0">
        <ion-title class="economica text-2xl font-light font-bold">
          {{$t('community')}}
        </ion-title>
      </ion-toolbar>
    </ion-header>
    -->

    <ion-content class="fullscreen" :scroll-events="true" @ionScroll="onScroll" color="white">
      <div class="p-4 lg:p-24 bg-polygons pt-24">
        <!-- Total number -->
        <div class="flex justify-between">
          <span class="text-lg lg:text-2xl text-white">{{$t('total-collected')}}</span>
          <ion-segment @ionChange="unitChanged($event.detail.value)" mode="ios" value="kg">
            <ion-segment-button value="kg" mode="ios">
              <ion-label>Kg</ion-label>
            </ion-segment-button>
            <ion-segment-button value="lt" mode="ios">
              <ion-label>Lt</ion-label>
            </ion-segment-button>
          </ion-segment>
        </div>
        <ion-label class="text-5xl lg:text-6xl" color="white">45.059.443</ion-label>
        <div class="pt-10 lg:pt-8"></div>
      </div>
      <div class="-mt-20 lg:-mt-32 z-10">
        <wave-community/>
      </div>
      <div class="pt-8 lg:pt-0 bg-white"></div>
      <div class="-mt-16 lg:-mt-20 p-2 lg:px-24">
        <ion-card button class="lg:h-64">
          <community-map/>
        </ion-card>
      </div>

      <div class="p-4 lg:px-24">
        <ion-label color="primary" class="ml-2 font-bold text-xl">{{$t('last-months')}}</ion-label>
        <div class="pt-2"></div>
        <months-chart ref="chart"
                      :month-stats="[{month: 10, year: 2019, kg: 1500},{month: 11, year: 2019, kg: 1700},{month: 12, year: 2019, kg: 900},{month: 1, year: 2020, kg: 7000},{month: 2, year: 2020, kg: 2000},
          {month: 3, year: 2020, kg: 4000},{month: 4, year: 2020, kg: 3000},{month: 5, year: 2020, kg: 4500}]"/>
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
  import WaveCommunity from '@/views/components/common/WaveCommunity.vue'
  import CommunityMap from '@/views/components/community/CommunityMap.vue'
  import MonthsChart from '@/views/components/community/MonthsChart.vue'
  import TransparentHeader from '@/views/components/common/TransparentHeader.vue'

  @Component({
    name: "community-page",
    components: {WaveCommunity, TransparentHeader, MonthsChart, CommunityMap}
  })
  export default class CommunityPage extends Vue {

    scrolled = false

    init() {
      (this.$refs['chart'] as any).init()
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
  ion-segment {
    width: 75px;
    border-radius: 5px;
    border: 2px solid var(--ion-color-light);
    background-color: var(--ion-color-light);
    overflow: hidden;
  }

  ion-segment-button {
    --background-checked: white;
    --color-checked: var(--ion-color-primary);
    font-weight: bold;
    border-radius: 5px;
  }

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
