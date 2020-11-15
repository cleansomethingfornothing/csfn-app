import {AxiosInstance} from 'axios'
import MonthStats from '@/types/MonthStats'
import TopUsers from '@/types/TopUsers'
import TotalStats from '@/types/TotalStats'
import DataProvider from '@/providers/data/data.provider'
import {Measure} from '@/types/Measure'
import {handleBackError} from '@/tools/handleBackError'
import * as _ from 'lodash'
import CountryStats from '@/types/CountryStats'

export default class StatsProvider extends DataProvider {

    axios: AxiosInstance

    constructor() {
        super('/stats')
    }

    fetchTotalStats(): Promise<TotalStats> {
        return this.http.get('/total')
            .then(({data}) => data)
            .catch(handleBackError('fetch-total-stats'))
    }

    fetchMonthStats(country: string): Promise<MonthStats> {
        return this.http.get('/months?country=' + country)
            .then(({data}) => data)
            .catch(handleBackError('fetch-month-stats'))
    }

    fetchTopUsers(country: string, measure: Measure): Promise<TopUsers> {
        return this.http.get(`/top_users?country=${country}&sort=total${_.capitalize(measure.toString())}`)
            .then(({data}) => data)
            .catch(handleBackError('fetch-top-users'))
    }

    fetchCountriesCount(): Promise<number> {
        return this.http.get('/countries_count')
            .then(({data}) => data.count)
            .catch(handleBackError('fetch-countries-count'))
    }

    fetchCountries(): Promise<CountryStats[]> {
        return this.http.get('/countries')
            .then(({data}) => data)
            .catch(handleBackError('fetch-countries'))
    }
}

export const statsProvider = new StatsProvider()
