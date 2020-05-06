<template>
  <div class="flex overflow-x-auto overflow-y-hidden">
    <div class="w-1/5 flex flex-col justify-end items-center h-48" v-for="month of monthStats"
         :key="month.month + '-' + month.year">

      <div :style="`height: ${percentage(month.cleanups)}%;`" class="w-full">
        <month-bar/>
      </div>
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
  import MonthBar from '@/views/components/common/MonthBar.vue'

  @Component({
    name: "months-chart",
    components: {MonthBar}
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
