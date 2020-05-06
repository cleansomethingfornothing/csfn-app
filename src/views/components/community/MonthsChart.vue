<template>
  <div class="flex overflow-x-auto months-chart" ref="chart">
    <div class="min-w-1/5 lg:min-w-1/6 flex flex-col justify-between items-center h-48 relative"
         v-for="(month, i) of monthStats"
         :key="month.month + '-' + month.year">
      <ion-label color="medium" v-if="showYear(i)" class="text-xs font-bold">{{month.year}}</ion-label>
      <div class="h-12 flex justify-center items-center">
        <div v-if="showData === i" class="tooltip">
          <span>{{month.kg}}</span>
        </div>
      </div>
      <div :tabindex="i" class="h-full flex flex-col justify-end items-center" @focus="focus(i)" @blur="blur(i)">
        <div :style="`height: ${percentage(month.kg)}%`" class="-ml-4">
          <month-bar/>
        </div>
      </div>
      <span class="capitalize mt-4">{{monthName(month.month)}}</span>
    </div>
  </div>
</template>
<script lang=ts>
  import Component from 'vue-class-component'
  import Vue from 'vue'
  import {Prop, Ref} from 'vue-property-decorator'
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

    @Ref('chart')
    chart: HTMLElement

    showData = null

    get max() {
      return Math.max(...this.monthStats.map(({kg}) => kg))
    }

    mounted(): void {
      setTimeout(() => {
        this.chart.scrollTo(this.chart.scrollWidth, 0)
      }, 1000)
    }

    monthName(monthIndex) {
      return moment.monthsShort()[monthIndex - 1].replace('.', '')
    }

    percentage(monthCleanups) {
      return (monthCleanups * 100) / this.max
    }

    showYear(i) {
      return i == 0 || this.monthStats[i].year !== this.monthStats[i - 1].year
    }

    focus(i) {
      this.showData = i
    }

    blur() {
      this.showData = null
    }
  }
</script>
<style lang="scss">
  .months-chart::-webkit-scrollbar {
    height: 0;
  }

  .month-bar {
    transition: height 1s;
  }

  .tooltip {
    background-color: var(--ion-color-dark);
    color: white;
    padding: 2px 4px;
    border-radius: 5px;
    position: relative;
    font-weight: bold;
  }

  .tooltip::after {
    content: " ";
    position: absolute;
    top: 100%; /* At the bottom of the tooltip */
    left: 50%;
    margin-left: -5px;
    border-width: 5px;
    border-style: solid;
    border-color: black transparent transparent transparent;
  }
</style>
