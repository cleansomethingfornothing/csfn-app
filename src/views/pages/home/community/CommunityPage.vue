<template>
    <page-transparent-header ref="page">
        <ion-page>
            <transparent-header :no-back="true" :no-gradient="true" :title="$t('community')">
                <template slot="end-buttons">
                    <transition name="fade">
                        <toggle-switch :value="measure" class="mr-2" left-value="volume" right-value="weight"
                                       @change="measureChanged">
                            <ion-icon slot="left" :src="require('@/assets/img/icons/liters.svg')" class="text-xl"/>
                            <ion-icon slot="right" :src="require('@/assets/img/icons/kilos.svg')" class="text-xl"/>
                        </toggle-switch>
                    </transition>
                </template>
            </transparent-header>

            <ion-content ref="community-content" :scroll-events="true" class="fullscreen text-left" color="white"
                         @ionScroll="scrolled">
                <div
                    class="p-4 lg:p-16 bg-poly bg-poly-2 h-64 lg:h-88 ios:h-60 sm:ios:h-64 lg:ios:h-72 xl:ios:p-24 xl:ios:h-88 flex flex-col">
                    <!-- Total number -->
                    <div class="h-toolbar-top sm:ios:mb-2"></div>
                    <div class="flex flex-col justify-center h-full">
                        <div class="flex justify-between items-center">
                            <div
                                class="flex flex-col items-center justify-center relative w-14 mb-6 sm:ml-4 md:ml-8 h-14 rounded-full ion-activatable overflow-hidden shadow-md"
                                @click="$router.push('/global-impact')">
                                <img class="w-12 sm:w-14 absolute opacity-75" src="@/assets/img/world.svg">
                                <span class="text-3xl sm:text-4xl font-medium text-white absolute roboto">
                                    {{ countriesCount }}
                                </span>
                                <ion-ripple-effect/>
                            </div>

                            <div v-if="totalStats" class="text-right">
                                <number-display :number="totalStats[measure].toString()" :decimals="measure === 'weight'"></number-display>
                                <span class="text-lg lg:text-2xl text-white">{{ $t(`total-${measure}`) }}</span>
                            </div>
                            <div v-else class="flex flex-col items-end -mt-2">
                                <ion-skeleton-text animated class="h-8 w-32 rounded opacity-25 bg-white"/>
                                <ion-skeleton-text animated class="w-48 rounded opacity-25 bg-white"/>
                            </div>
                        </div>

                    </div>
                </div>
                <div class="-mt-24 sm:-mt-24 lg:-mt-32 xl:-mt-40 z-10 pt-3 lg:pt-4">
                    <div class="sm:ios:pt-4"></div>
                    <wave :num="2"/>
                </div>

                <transition name="fade">

                    <div v-if="!ready" class="flex justify-center p-3 w-full">
                        <ion-spinner class="w-12 h-12" color="primary"/>
                    </div>

                    <div v-else>

                        <div class="-mt-16 ios:-mt-16 lg:-mt-32 p-2 lg:px-24">
                            <community-map :cleanups="cleanupsMarkers" :coords="currentCords"
                                           @click="$router.push('/map')"/>
                        </div>

                        <div class="p-4 lg:px-24">
                            <div class="flex justify-between items-center world-tabs">
                                <ion-label class="ml-2 font-bold text-xl w-1/2" color="primary">
                                    {{ $t('last-months') }}
                                </ion-label>
                                <toggle-switch left-value="country" right-value="world" value="world"
                                               @change="fetchTopUsers($event)">
                                    <span slot="left">{{ countryFlag }}</span>
                                    <ion-icon slot="right" :src="require('ionicons/dist/ionicons/svg/md-globe.svg')"/>
                                </toggle-switch>
                            </div>
                            <div class="pt-2"></div>
                            <months-chart v-if="monthStats[area].length" ref="months-chart" :area="area"
                                          :measure="measure"
                                          :month-stats="monthStats"/>
                            <ion-item v-else class="rounded opacity-50 mx-2" color="light" lines="none">
                                <ion-icon slot="start"
                                          :src="require('ionicons5/dist/svg/cloud-offline-outline.svg')"></ion-icon>
                                {{ $t('no-data') }}
                            </ion-item>
                        </div>

                        <div class="mt-4 px-4 lg:px-24">
                            <ion-label class="ml-2 font-bold text-xl" color="primary">{{ $t('top-users') }}</ion-label>
                        </div>
                        <ion-list v-if="topUsers[area].length" class="lg:px-24 mb-20" lines="full">
                            <ion-item v-for="(user, i) in topUsers[area]" :key="user.id"
                                      :class="i === 0 ? 'user-gold' : i === 1 ? 'user-silver' : i === 2 ? 'user-bronze' : ''"
                                      button
                                      class=" user lg:my-2 lg:rounded-full"
                                      detail="false">
                                <span slot="start"
                                      :style="`background-color: rgba(var(--ion-color-secondary-rgb), 0.${90 - (i/2 * 10)})`"
                                      class="mr-2 w-6 h-6 flex justify-center items-center rounded-full font-bold text-white">
                                {{ i + 1 }}
                                </span>
                                <ion-avatar slot="start">
                                    <img v-if="user.picture" :src="user.picture.publicUrl">
                                </ion-avatar>
                                <ion-label class="font-bold my-6 lg:my-4">{{ user.username }}</ion-label>
                                <p class="pr-2">{{ user['total' + capitalize(measure)] | localeString }} {{ units }}</p>
                            </ion-item>
                        </ion-list>
                        <div v-else class="pt-2 px-6 mb-24 opacity-50">
                            <ion-item class="rounded" color="light" lines="none">
                                <ion-icon slot="start"
                                          :src="require('ionicons5/dist/svg/cloud-offline-outline.svg')"></ion-icon>
                                {{ $t('no-data') }}
                            </ion-item>
                        </div>
                    </div>
                </transition>
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
import ToggleSwitch from '@/views/components/community/ToggleSwitch.vue'
import PageTransparentHeader from '@/views/components/common/PageTransparentHeader.vue'
import NumberDisplay from '@/views/components/community/NumberDisplay.vue'
import {Measure} from '@/types/Measure'
import {statsModule} from '@/store/statsModule'
import {locationModule} from '@/store/locationModule'
import TotalStats from '@/types/TotalStats'
import MonthStats from '@/types/MonthStats'
import TopUsers from '@/types/TopUsers'
import {countries} from 'countries-list'
import {Watch} from 'vue-property-decorator'
import * as _ from 'lodash'
import {cleanupsModule} from '@/store/cleanupsModule'
import ModalPresenter from '@/tools/ModalPresenter'
import CleanupsMapModal from '@/views/pages/home/community/CleanupsMapPage.vue'
import {appModule} from '@/store/appModule'

@Component({
    name: 'community-page',
    components: {NumberDisplay, PageTransparentHeader, ToggleSwitch, Wave, TransparentHeader, MonthsChart, CommunityMap}
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

    get countryFlag() {
        return this.country && countries[this.country].emoji
    }

    get countriesCount() {
        return statsModule.getCountriesCount
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

    get currentCords() {
        return locationModule.getCoords
    }

    get cleanupsMarkers() {
        return cleanupsModule.markers
    }

    get ready() {
        return appModule.isLoadedCommunity
    }

    mounted() {
        this.init()
    }

    init() {
        if (!this.loaded) {
            nativeProvider.hideSplashScreen()
            this.loaded = true
        }

        statsModule.fetchCountriesCount()

        if (this.country) {
            this.fetchStats()
        }
    }

    @Watch('country')
    fetchStats() {
        Promise.all([
            cleanupsModule.fetchMarkers(),
            this.fetchTopUsers(this.area),
            statsModule.fetchTotalStats(),
            statsModule.fetchMonthStats(this.country)
        ]).then(() => {
            appModule.setLoadedCommunity()
            setTimeout(() => {
                (this.$refs['months-chart'] as MonthsChart)?.init()
            })
        })

    }

    fetchTopUsers(area) {
        this.area = area
        return statsModule.fetchTopUsers({country: this.country, measure: this.measure})
    }

    measureChanged(measure: string) {
        this.measure = Measure[measure]
    }

    exit() {
        //
    }

    scrolled(event) {
        (this.$refs['page'] as any).scrolled(event)
    }

    capitalize(value) {
        return _.capitalize(value)
    }

    openCleanupsMap() {
        ModalPresenter.present(this.$ionic, CleanupsMapModal, {
            router: this.$router,
            txt: {
                cleanupIn: this.$t('cleanup-in'),
                searchPlaceholder: this.$t('search-place'),
                liters: this.$t('liters'),
                kilos: this.$t('kilos')
            }
        })
    }
}
</script>
<style scoped>
.no-border ion-toolbar {
    --box-shadow: none !important;
    --border-width: 0 !important;
}


</style>
