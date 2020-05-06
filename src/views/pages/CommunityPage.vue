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

    <ion-content class="fullscreen" :scroll-events="true" @ionScroll="onScroll">
      <div class="p-4 lg:p-24 bg-polygons pt-16">
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
      <div class="-mt-20 lg:-mt-40 z-10">
        <wave/>
      </div>
      <div class="pt-8 lg:pt-0 bg-white"></div>
      <div class="-mt-16 lg:-mt-40 p-2 lg:p-24">
        <ion-card button>
          <community-map/>
        </ion-card>
      </div>

      <div class="p-4">
        <months-chart
          :month-stats="[{month: 1, year: 2020, cleanups: 1000},{month: 2, year: 2020, cleanups: 2000},
          {month: 3, year: 2020, cleanups: 4000},{month: 4, year: 2020, cleanups: 3000},{month: 5, year: 2020, cleanups: 5000}]"/>
      </div>
      <div class="pt-32"></div>
    </ion-content>
  </ion-page>
</template>
<script lang=ts>
  import Vue from 'vue'
  import Component from 'vue-class-component'
  import Wave from '@/views/components/common/Wave.vue'
  import CommunityMap from '@/views/components/community/CommunityMap.vue'
  import MonthsChart from '@/views/components/community/MonthsChart.vue'
  import TransparentHeader from '@/views/components/common/TransparentHeader.vue'

  @Component({
    name: "community-page",
    components: {TransparentHeader, MonthsChart, CommunityMap, Wave}
  })
  export default class CommunityPage extends Vue {

    scrolled = false

    unitChanged(unit) {
      console.log(unit)
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

  .bg-gradient {
    /*background: linear-gradient(var(--ion-color-primary), var(--ion-color-secondary));*/
  }
</style>
