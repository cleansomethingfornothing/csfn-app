<template>
    <ion-page>
        <ion-header mode="ios">
            <ion-toolbar mode="ios" ref="toolbar">
                <ion-buttons slot="start">
                    <ion-button shape="round" color="dark" fill="clear" @click="$router.back()">
                        <ion-icon name="arrow-back"></ion-icon>
                    </ion-button>
                </ion-buttons>
                <ion-title class="lg:text-lg xl:text-xl">{{ $t('world-map') }}</ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content>
            <ion-list lines="full">
                <ion-item v-for="country in getCountries" :key="country.country">
                    <ion-avatar class="flex justify-center items-center bg-gray-200 text-lg" color="light" slot="start">
                        {{ countryFlag(country) }}
                    </ion-avatar>
                    <ion-label>
                        <p class="font-bold pl-2">{{ countryName(country) }}</p>
                        <div class="ion-text-wrap">
                            <ion-chip v-if="country.cleanups" color="secondary">
                                <ion-icon :src="require('ionicons5/dist/svg/trash.svg')" class="mr-1 text-sm"/>
                                {{ country.cleanups }} {{ $t('cleanups') }}
                            </ion-chip>
                            <ion-chip color="secondary" v-if="country.volume">
                                <ion-icon class="mr-1 text-sm" :src="require('@/assets/img/icons/bag.svg')"/>
                                {{ country.volume }} {{ $t('liters') }}
                            </ion-chip>
                            <ion-chip color="secondary" v-if="country.weight">
                                <ion-icon :src="require('@/assets/img/icons/scale.svg')" class="mr-1 text-sm"/>
                                {{ country.weight }} {{ $t('kilos') }}
                            </ion-chip>
                            <ion-chip color="secondary" v-if="country.users">
                                <ion-icon name="person" class="mr-1 text-sm"/>
                                {{ country.users }} {{ $tc('users', country.users) }}
                            </ion-chip>
                        </div>
                    </ion-label>
                </ion-item>
            </ion-list>
        </ion-content>
    </ion-page>
</template>
<script lang="ts">
import {Component, Vue} from 'vue-property-decorator'
import {statsModule} from '@/store/statsModule'
import {countries} from 'countries-list'
import * as _ from 'lodash'

@Component({
    name: 'global-impact-page'
})
export default class GlobalImpactPage extends Vue {

    get getCountries() {
        return _.sortBy(statsModule.getCountries, (country) => this.countryName(country))
    }

    mounted() {
        statsModule.fetchCountries()
    }

    countryFlag(country) {
        return countries[country.country].emoji
    }

    countryName(country) {
        return countries[country.country].name
    }
}
</script>
<style scoped>

</style>
