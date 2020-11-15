import {Action, Module, Mutation, VuexModule} from 'vuex-class-modules'
import TotalStats from '@/types/TotalStats'
import MonthStats from '@/types/MonthStats'
import TopUsers from '@/types/TopUsers'
import {statsProvider} from '@/providers/data/stats.provider'
import {store} from '@/store/index'
import Vue from 'vue'
import CountryStats from '@/types/CountryStats'
import {Measure} from '@/types/Measure'

@Module
class StatsModule extends VuexModule {

    constructor() {
        super({store, name: 'stats'})
    }

    private totalStats: TotalStats = {
        weight: 0,
        volume: 0
    }

    private monthStats: MonthStats = {
        country: [],
        world: []
    }

    private topUsers: TopUsers = {
        country: [],
        world: []
    }

    private countries: CountryStats[] = []

    private countriesCount = 0

    get getTotalStats() {
        return this.totalStats
    }

    get getMonthStats() {
        return this.monthStats
    }

    get getTopUsers() {
        return this.topUsers
    }

    get getCountriesCount() {
        return this.countriesCount
    }

    get getCountries() {
        return this.countries
    }

    @Mutation
    private setTotalStats(totalStats: TotalStats) {
        Vue.set(this, 'totalStats', totalStats)
    }

    @Mutation
    private setMonthStats(monthStats: MonthStats) {
        Vue.set(this, 'monthStats', monthStats)
    }

    @Mutation
    private setTopUsers(topUsers: TopUsers) {
        Vue.set(this, 'topUsers', topUsers)
    }

    @Mutation
    private setCountries(countries: CountryStats[]) {
        Vue.set(this, 'countries', countries)
    }

    @Mutation
    private setCountriesCount(countriesCount) {
        this.countriesCount = countriesCount
    }

    @Action
    fetchTotalStats() {
        return statsProvider.fetchTotalStats()
            .then((totalStats) => this.setTotalStats(totalStats))
    }

    @Action
    fetchMonthStats(country: string) {
        return statsProvider.fetchMonthStats(country)
            .then((monthStats) => this.setMonthStats(monthStats))
    }

    @Action
    fetchTopUsers({country, measure}: { country: string, measure: Measure }) {
        return statsProvider.fetchTopUsers(country, measure)
            .then((topUsers) => this.setTopUsers(topUsers))
    }

    @Action
    fetchCountries() {
        return statsProvider.fetchCountries()
            .then((countries) => this.setCountries(countries))
    }

    @Action
    fetchCountriesCount() {
        return statsProvider.fetchCountriesCount()
            .then((count) => this.setCountriesCount(count))
    }

}

export const statsModule = new StatsModule()