<template>
  <div>
    <ion-header mode="ios">
      <ion-toolbar mode="ios">
        <ion-buttons slot="start">
          <ion-button @click="close" shape="round">
            <ion-icon name="close"></ion-icon>
          </ion-button>
        </ion-buttons>
        <ion-title>{{titleText}}</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding-top">
      <ion-label class="font-bold text-sm ml-4">{{alertsTitle}}</ion-label>
      <ion-item class="mb-4" lines="full">
        <ion-label>{{alertsText}}</ion-label>
        <ion-toggle :checked="filters.alerts" @ionChange="toggleAlerts"></ion-toggle>
      </ion-item>
      <ion-label class="font-bold text-sm ml-4">{{distanceText}}</ion-label>
      <ion-item>
        <ion-range min="0" max="6" color="primary" step="1" @ionChange="distanceChange($event.target.value)"
                   :snaps="true" :ticks="true" :value="distance" mode="ios" class="pl-4">
        </ion-range>
        <ion-label class="ml-2">{{filters.distance ? filters.distance + ' Km' : noLimitsText}}</ion-label>
      </ion-item>
    </ion-content>
  </div>
</template>
<script lang=ts>
  import Vue from 'vue'
  import Component from 'vue-class-component'
  import {Prop} from 'vue-property-decorator'
  import {cleanupsModule} from '@/store/activitiesModule'
  import CleanupFilters from '@/types/CleanupFilters'

  @Component({
    name: "FiltersModal"
  })
  export default class FiltersModal extends Vue {

    @Prop(String)
    titleText: string

    @Prop(String)
    alertsTitle: string

    @Prop(String)
    alertsText: string

    @Prop(String)
    distanceText: string

    @Prop(String)
    noLimitsText: string

    originalFilters: CleanupFilters

    distances = [1, 5, 10, 30, 50, 200, 0]

    get filters(): CleanupFilters {
      return cleanupsModule.getFilters
    }

    get distance() {
      return this.distances.indexOf(this.filters.distance)
    }

    mounted(): void {
      this.originalFilters = {...this.filters}
    }

    toggleAlerts() {
      cleanupsModule.setFilters({...this.filters, alerts: !this.filters.alerts})
    }

    distanceChange(step) {
      cleanupsModule.setFiltersDistance(this.distances[step])
    }

    close() {
      this.$ionic.modalController.dismiss({
        changed: this.originalFilters.alerts != this.filters.alerts
          || this.originalFilters.distance != this.filters.distance
      })
    }

  }
</script>
<style scoped>

</style>
