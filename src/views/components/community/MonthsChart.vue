<template>
  <div class="flex overflow-x-auto months-chart" ref="chart">
    <div class="min-w-1/5 lg:min-w-1/6 flex flex-col justify-between items-center h-64 relative"
         v-for="(month, i) of monthStats"
         :key="month.month + '-' + month.year">
      <ion-label color="medium" v-if="showYear(i)" class="text-xs font-bold">{{month.year}}</ion-label>
      <div class="pt-6"></div>
      <div class="relative h-full flex flex-col justify-end items-center">
        <transition name="fade">
          <div v-if="showData === i" class="tooltip text-sm" :style="`bottom: ${heights[i] + 1}%`">
            <span>{{month.kg}} Kg</span>
          </div>
        </transition>
        <div :class="showData === i ? 'selected' : ''" :tabindex="i" :style="`height: ${heights[i]}%`"
             class="-ml-4 bar" @focus="focus(i)" @blur="blur(i)">
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

    heights = []

    get max() {
      return Math.max(...this.monthStats.map(({kg}) => kg))
    }

    mounted(): void {
      setTimeout(() => {
        this.init()
      }, 1000)
    }

    init() {
      this.chart.scrollTo(this.chart.scrollWidth, 0)
      this.heights = this.monthStats.map(() => 0)
      setTimeout(() => {
        this.heights = this.monthStats.map(month => this.percentage(month.kg))
      }, 100)
    }

    exit() {
      this.heights = this.monthStats.map(() => 0)
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

  .bar {
    transition: opacity 0.3s, height 0.3s;
  }

  .bar.selected {
    opacity: 0.85;
  }

  .tooltip {
    background-color: var(--ion-color-dark);
    color: white;
    padding: 0 4px;
    border-radius: 5px;
    position: absolute;
    font-weight: bold;
    white-space: nowrap;
    outline: none;
  }

  .tooltip::after {
    content: " ";
    position: absolute;
    top: 100%; /* At the bottom of the tooltip */
    left: 50%;
    margin-left: -5px;
    border-width: 5px;
    border-style: solid;
    border-color: var(--ion-color-dark) transparent transparent transparent;
  }
</style>
