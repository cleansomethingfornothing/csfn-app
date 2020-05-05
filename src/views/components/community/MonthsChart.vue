<template>
  <div class="flex overflow-x-auto overflow-y-hidden">
    <div class="w-1/5 flex flex-col justify-end items-center h-48" v-for="month of monthStats"
         :key="month.month + '-' + month.year">
      <div class="month-bar w-4 rounded-full bg-primary" :style="`height: ${percentage(month.cleanups)}%`"></div>
      <span class="capitalize mt-4">{{monthName(month.month)}}</span>
    </div>
  </div>
</template>
<script lang=ts>
  import Component from 'vue-class-component'
  import Vue from 'vue'
  import {Prop} from 'vue-property-decorator'
  import MonthStats from '@/types/MonthStats'
  import moment from 'moment'

  @Component({
    name: "months-chart"
  })
  export default class MonthsChart extends Vue {

    @Prop(Array)
    monthStats: MonthStats[]

    get max() {
      return Math.max(...this.monthStats.map(({cleanups}) => cleanups))
    }

    monthName(monthIndex) {
      return moment.monthsShort()[monthIndex - 1].replace('.', '')
    }

    percentage(monthCleanups) {
      return (monthCleanups * 100) / this.max
    }

  }
</script>
<style scoped>
</style>
