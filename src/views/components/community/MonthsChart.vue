<template>
    <div ref="chart" class="flex overflow-x-auto months-chart" @touchstart="scrolled">
        <div v-for="(month, i) of stats"
             :key="month.month + '-' + month.year"
             class="min-w-1/5 lg:min-w-1/6 flex flex-col justify-between items-center h-64 relative">
            <ion-label v-if="showYear(i)" class="text-xs font-bold" color="medium">{{ month.year }}</ion-label>
            <div class="pt-6"></div>
            <div class="relative h-full flex flex-col justify-end items-center">
                <transition name="fade">
                    <div v-if="showData === i" :style="`bottom: ${heights[i] + 1}%`" class="tooltip text-sm">
                        <span>{{ month[measure] }} {{ units }}</span>
                    </div>
                </transition>
                <div :class="showData === i ? 'selected' : ''" :style="`height: ${heights[i]}%`" :tabindex="i"
                     class="-ml-4 bar" @blur="blur(i)" @focus="focus(i)">
                    <month-bar/>
                </div>
            </div>
            <span class="capitalize mt-4">{{ monthName(month.month) }}</span>
        </div>
    </div>
</template>
<script lang=ts>
import Component from 'vue-class-component'
import Vue from 'vue'
import {Prop, Ref, Watch} from 'vue-property-decorator'
import MonthStats from '@/types/MonthStats'
import moment from 'moment'
import MonthBar from '@/views/components/common/MonthBar.vue'
import {Measure} from '@/types/Measure'
import {sortBy} from 'lodash'

@Component({
    name: 'months-chart',
    components: {MonthBar}
})
export default class MonthsChart extends Vue {

    @Prop(String)
    area: string

    @Prop(String)
    measure: Measure

    @Prop(Object)
    monthStats: MonthStats

    @Ref('chart')
    chart: HTMLElement

    showData = null

    get stats() {
        return sortBy(this.monthStats[this.area], ['year', 'month'])
    }

    get heights() {
        return this.stats.map(month => this.percentage(month[this.measure]))
    }

    get units() {
        return this.measure === Measure.volume ? 'Lt' : 'Kg'
    }

    get max() {
        return Math.max(...this.monthStats[this.area].map((month) => month[this.measure]))
    }

    mounted(): void {
        this.init()
    }

    @Watch('area')
    @Watch('measure')
    init() {
        setTimeout(() => {
            (this.$refs['chart'] as HTMLElement)?.scrollTo({
                left: (this.$refs['chart'] as HTMLElement)?.scrollWidth,
                behavior: 'smooth'
            })
        }, 5)
    }

    monthName(monthIndex) {
        return moment.monthsShort()[monthIndex].replace('.', '')
    }

    percentage(monthCleanups) {
        return (monthCleanups * 100) / this.max
    }

    showYear(i) {
        return i == 0 || this.stats[i].year !== this.stats[i - 1].year
    }

    focus(i) {
        this.showData = i
    }

    blur() {
        this.showData = null
    }

    scrolled(e) {
        e.stopPropagation()
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
    border-radius: 5px;
    color: white;
    font-weight: bold;
    outline: none;
    padding: 0 4px;
    position: absolute;
    white-space: nowrap;
}

.tooltip::after {
    border-color: var(--ion-color-dark) transparent transparent transparent;
    border-style: solid;
    border-width: 5px;
    content: " ";
    left: 50%;
    margin-left: -5px;
    position: absolute;
    top: 100%; /* At the bottom of the tooltip */
}

</style>
