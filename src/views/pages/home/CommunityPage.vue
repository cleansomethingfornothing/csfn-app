<template>
    <page-transparent-header ref="page">
        <ion-page>
            <transparent-header :title="$t('community')" :no-back="true" :no-gradient="true">
                <template slot="end-buttons">
                    <transition name="fade">
                        <units-switch class="mr-2" @change="measureChanged" :value="measure"/>
                    </transition>
                </template>
            </transparent-header>

            <ion-content ref="community-content" class="fullscreen text-left" :scroll-events="true" color="white"
                         @ionScroll="scrolled">
                <div
                    class="p-4 lg:p-16 bg-poly bg-poly-2 h-64 lg:h-88 ios:h-60 sm:ios:h-64 lg:ios:h-72 xl:ios:p-24 xl:ios:h-88 flex flex-col">
                    <!-- Total number -->
                    <div class="h-toolbar-top sm:ios:mb-2"></div>
                    <div class="flex flex-col justify-center h-full">
                        <div class="flex justify-between items-center">
                            <div
                                class="flex flex-col items-center justify-center relative w-14 mb-6 sm:ml-4 md:ml-8 h-14 rounded-full ion-activatable overflow-hidden shadow-md"
                                @click="$router.push('/world-map')">
                                <img src="@/assets/img/world.svg" class="w-12 sm:w-14 absolute">
                                <span class="text-3xl sm:text-4xl font-medium text-white absolute">59</span>
                                <ion-ripple-effect/>
                            </div>

                            <div class="text-right">
                                <number-display :number="totalStats[measure]"></number-display>
                                <span class="text-lg lg:text-2xl text-white">{{ $t(`total-${measure}`) }}</span>
                            </div>
                        </div>

                    </div>
                </div>
                <div class="-mt-24 sm:-mt-24 lg:-mt-32 xl:-mt-40 z-10 pt-3 lg:pt-4">
                    <div class="sm:ios:pt-4"></div>
                    <wave :num="2"/>
                </div>
                <div class="-mt-14 ios:-mt-16 lg:-mt-18 p-2 lg:px-24">
                    <ion-card button class="lg:h-64">
                        <community-map/>
                    </ion-card>
                </div>

                <div class="p-4 lg:px-24">
                    <div class="flex justify-between items-center">
                        <ion-label color="primary" class="ml-2 font-bold text-xl w-1/2">{{
                                $t('last-months')
                            }}
                        </ion-label>
                        <ion-segment class="w-1/2 world-tabs" @ionChange="fetchTopUsers($event.detail.value)">
                            <ion-segment-button value="world" checked>
                                <ion-label class="text-xs">World</ion-label>
                            </ion-segment-button>
                            <ion-segment-button value="country">
                                <ion-label class="text-xs">{{ countryName }}</ion-label>
                            </ion-segment-button>
                        </ion-segment>
                    </div>
                    <div class="pt-2"></div>
                    <months-chart :area="area" :measure="measure" ref="chart" :month-stats="monthStats"/>
                </div>

                <div class="mt-4 px-4 lg:px-24">
                    <ion-label color="primary" class="ml-2 font-bold text-xl">{{ $t('top-users') }}</ion-label>
                </div>
                <ion-list class="lg:px-24 mb-20" lines="full">
                    <ion-item v-for="(user, i) in topUsers[area]" :key="user.id" class=" user lg:my-2 lg:rounded-full"
                              button
                              :class="i === 0 ? 'user-gold' : i === 1 ? 'user-silver' : i === 2 ? 'user-bronze' : ''"
                              detail="false">
            <span slot="start" :style="`background-color: rgba(var(--ion-color-secondary-rgb), 0.${90 - (i/2 * 10)})`"
                  class="mr-2 w-6 h-6 flex justify-center items-center rounded-full font-bold text-white">
            {{ i + 1 }}
            </span>
                        <ion-avatar slot="start">
                            <img :src="user.picture.publicUrl">
                        </ion-avatar>
                        <ion-label class="font-bold my-6 lg:my-4">{{ user.username }}</ion-label>
                        <p class="pr-2">{{ user['total' + capitalize(measure)] }} {{ units }}</p>
                    </ion-item>
                </ion-list>
                <div class="pt-10"></div>
            </ion-content>
        </ion-page>
    </page-transparent-header>
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
import PageTransparentHeader from '@/views/components/common/PageTransparentHeader.vue'
import NumberDisplay from '@/views/components/community/NumberDisplay.vue'
import {Measure} from '@/types/Measure'
import {statsModule} from '@/store/statsModule'
import {locationModule} from '@/store/locationModule'
import ToastPresenter from '@/tools/ToastPresenter'
import ErrorMessage from '@/tools/ErrorMessage'
import TotalStats from '@/types/TotalStats'
import MonthStats from '@/types/MonthStats'
import TopUsers from '@/types/TopUsers'
import {countries} from 'countries-list'
import {Watch} from 'vue-property-decorator'
import * as _ from 'lodash'

@Component({
    name: 'community-page',
    components: {NumberDisplay, PageTransparentHeader, UnitsSwitch, Wave, TransparentHeader, MonthsChart, CommunityMap}
})
export default class CommunityPage extends Vue {

    loaded = false
    measure: Measure = Measure.volume
    area = 'world'

    get units() {
        return this.measure === Measure.volume ? 'Lt' : 'Kg'
    }

    get country() {
        return locationModule.getAddress.countryCode
    }

    get countryName() {
        return this.country && countries[this.country].name
    }

    get totalStats(): TotalStats {
        return statsModule.getTotalStats
    }

    get monthStats(): MonthStats {
        return statsModule.getMonthStats
    }

    get topUsers(): TopUsers {
        return statsModule.getTopUsers
    }

    init() {
        (this.$refs['chart'] as any).init()
        if (!this.loaded) {
            nativeProvider.hideSplashScreen()
            this.loaded = true
        }

        if (this.country) {
            this.fetch()
        }
    }

    @Watch('country')
    fetch() {
        this.fetchTopUsers(this.area)
        statsModule.fetchTotalStats()
            .catch(error => {
                ToastPresenter.present(this.$ionic, ErrorMessage.getMessage(error))
            })
        statsModule.fetchMonthStats(this.country)
            .catch(error => {
                ToastPresenter.present(this.$ionic, ErrorMessage.getMessage(error))
            })
    }

    fetchTopUsers(area) {
        this.area = area
        statsModule.fetchTopUsers(this.country, this.measure)
            .catch(error => {
                ToastPresenter.present(this.$ionic, ErrorMessage.getMessage(error))
            })
    }

    measureChanged(measure: string) {
        this.measure = Measure[measure]
    }

    exit() {
        (this.$refs['chart'] as any).exit()
    }

    scrolled(event) {
        (this.$refs['page'] as any).scrolled(event)
    }

    capitalize(value) {
        return _.capitalize(value)
    }
}
</script>
<style scoped>
.no-border ion-toolbar {
    --border-width: 0 !important;
    --box-shadow: none !important;
}

.world-tabs ion-segment-button {
    width: 20px;
    --padding-start: 2px;
    --padding-end: 2px;
}

</style>
