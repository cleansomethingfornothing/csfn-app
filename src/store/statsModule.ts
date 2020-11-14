import {Action, Module, Mutation, VuexModule} from "vuex-class-modules";
import TotalStats from "@/types/TotalStats";
import MonthStats from "@/types/MonthStats";
import TopUsers from "@/types/TopUsers";
import {statsProvider} from "@/providers/data/stats.provider";
import {Measure} from "@/types/Measure";
import {store} from "@/store/index";
import Vue from 'vue'

@Module
class StatsModule extends VuexModule {

    constructor() {
        super({store, name: 'stats'});
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

    get getTotalStats() {
        return this.totalStats
    }

    get getMonthStats() {
        return this.monthStats
    }

    get getTopUsers() {
        return this.topUsers
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

    fetchTopUsers(country: string, measure: Measure) {
        return statsProvider.fetchTopUsers(country, measure)
            .then((topUsers) => this.setTopUsers(topUsers))
    }
}

export const statsModule = new StatsModule()