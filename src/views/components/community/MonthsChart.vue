<template>
    <div class="flex overflow-x-auto overflow-y-hidden months-chart" ref="chart">
        <div class="min-w-1/5 sm:min-w-1/6 flex flex-col justify-end items-center h-40" v-for="month of monthStats"
             :key="month.month + '-' + month.year">
            <div class="h-full bg-light rounded-full flex flex-col justify-end">
                <div class="w-4 rounded-full bg-primary h-0 month-bar"
                     :style="`height: ${percentage(month.cleanups)}%`"></div>
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

    @Component({
        name: "months-chart"
    })
    export default class MonthsChart extends Vue {

        @Prop(Array)
        monthStats: MonthStats[]

        @Ref('chart')
        chart: HTMLElement

        get max() {
            return Math.max(...this.monthStats.map(({cleanups}) => cleanups))
        }

        mounted(): void {
          console.log
            this.chart.scrollTo(0, this.chart.scrollWidth)
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
    .months-chart::-webkit-scrollbar {
        height: 0;
    }

    .month-bar {
        transition: height 1s;
    }
</style>
