<template>
    <page-transparent-header ref="page">
        <ion-page class="ion-page">
            <transparent-header :no-back="true" :no-content="true" :no-gradient="true"></transparent-header>
            <ion-content :scroll-events="true" class="user-content min-h-screen fullscreen"
                         @ionScroll="$refs['page'].scrolled($event)">
                <div class="bg-poly bg-poly-1 h-72 lg:h-88 ios:h-72 sm:ios:h-72 lg:ios:h-72 xl:ios:h-88"
                     style="margin-top: 4px"></div>

                <div class="mb-1 ios:mb-3" style="padding-top: 4px"/>
                <div class="-mt-24 pt-3 sm:ios:-mt-32 lg:-mt-32 xl:-mt-40 z-10 sm:ios:pt-4">
                    <div class="sm:ios:pt-3"></div>
                    <wave :num="1"/>
                </div>
                <div class="-mt-32 flex flex-col justify-center items-center">
                    <avatar :src="(user && user.picture && user.picture.publicUrl) || '/img/user-placeholder.png'"
                            class="w-32 lg:w-40"></avatar>
                    <ion-skeleton-text v-if="!user" class="w-32"></ion-skeleton-text>
                    <ion-label v-else class="font-bold text-xl -ml-1">{{ user.username }}</ion-label>
                </div>

                <div class="inline-block mt-6">
                    <div class="flex ion-activatable relative text-left bg-light p-2 pr-4 rounded-full overflow-hidden"
                         @click="$router.push('/levels')">
                        <div class="w-12 mr-2 float-left">
                            <img :src="userLevel.icon"/>
                        </div>
                        <div class="mt-1">
                            <p class="font-bold text-sm">{{ $t(userLevel.name) }}</p>
                            <p class="text-xs opacity-75 font-medium">{{ $t(userLevel.name + '-subtitle') }}</p>
                        </div>
                        <ion-ripple-effect/>
                    </div>
                </div>


                <div class="flex justify-around w-full py-2 my-3">
                    <user-counter :key="'cleanups-' + user.totalCleanups"
                                  :icon-src="require('ionicons5/dist/svg/trash-outline.svg')" :label="$t('cleanups')"
                                  :max="userLevel.threshold.cleanups"
                                  :value="user.totalCleanups"/>

                    <user-counter :key="'volume-' + user.totalVolume"
                                  :icon-src="require('@/assets/img/icons/bag-outline.svg')"
                                  :label="$t('liters')" :max="userLevel.threshold.liters" :value="user.totalVolume"/>

                    <user-counter :key="'weight-' + user.totalWeight"
                                  :icon-src="require('@/assets/img/icons/scale-outline.svg')"
                                  :label="$t('kilos')" :max="userLevel.threshold.kilos"
                                  :value="user.totalWeight"/>
                </div>

                <ion-card v-if="user.totalCleanups" style="height: 250px">
                    <user-stats
                        :key="userStats.reduce((a, b) => a + b.date, '') + userStats.reduce((a, b) => a + b.volume, 0)"
                        :stats="userStats"/>
                </ion-card>
                <ion-card v-else class="p-4">
                    <p class="font-bold text-lg text-gray-800">You have no cleanups</p>
                    <p class="text-base mb-4">{{ $t('no-cleanups') }}</p>
                    <ion-button shape="round" size="block" @click="$router.push('/edit-cleanup')">
                        {{ $t('publish-cleanup') }}
                    </ion-button>
                </ion-card>

                <ion-list class="mt-5 pt-0 mb-20 list-large-items" lines="inset">
                    <ion-item button detail="true" @click="$router.push('/current-user-cleanups')">
                        <ion-icon slot="start" :src="require('ionicons5/dist/svg/trash-outline.svg')"/>
                        <ion-label class="my-4">{{ $t('cleanups') }}</ion-label>
                    </ion-item>
                    <ion-item button detail="true" @click="$router.push('/current-user-alerts')">
                        <ion-icon slot="start" :src="require('ionicons5/dist/svg/alert-circle-outline.svg')"/>
                        <ion-label class="my-4">{{ $t('alerts') }}</ion-label>
                    </ion-item>
                    <ion-item button detail="true" @click="$router.push('/current-user-events')">
                        <ion-icon slot="start" :src="require('ionicons5/dist/svg/flag-outline.svg')"/>
                        <ion-label class="my-4">{{ $t('events') }}</ion-label>
                    </ion-item>
                    <ion-item button detail="true" @click="$router.push('/settings')">
                        <ion-icon slot="start" :src="require('ionicons5/dist/svg/settings-outline.svg')"
                                  color="dark"></ion-icon>
                        <ion-label class="my-4">{{ $t('settings') }}</ion-label>
                    </ion-item>
                </ion-list>
            </ion-content>
        </ion-page>
    </page-transparent-header>
</template>
<script lang=ts>
import Vue from 'vue'
import Component from 'vue-class-component'
import TransparentHeader from '@/views/components/common/TransparentHeader.vue'
import Avatar from '@/views/components/common/Avatar.vue'
import {userModule} from '@/store/userModule'
import {UserLevel} from '@/types/UserLevel'
import Wave from '@/views/components/common/Wave.vue'
import CommunityMap from '@/views/components/community/CommunityMap.vue'
import PageTransparentHeader from '@/views/components/common/PageTransparentHeader.vue'
import UserCounter from '@/views/components/user/UserCounter.vue'
import UserStats from '@/views/components/user/UserStats.vue'
import UserProfileStats from '@/types/UserProfileStats'

@Component({
    name: "current-user-page",
    components: {UserStats, UserCounter, PageTransparentHeader, CommunityMap, Wave, Avatar, TransparentHeader}
})
export default class CurrentUserPage extends Vue {

    get width() {
        return window.innerWidth
    }

    get user() {
        return userModule.getCurrentUser
    }

    get userLevel(): UserLevel {
        return userModule.getCurrentUserLevel
    }

    get userStats(): UserProfileStats[] {
        return userModule.getCurrentUserStats
    }

    mounted(): void {
        this.init()
    }

    init() {
        userModule.fetchCurrentUser()
            .then(() => userModule.fetchCurrentUserStats())
    }

    exit() {
        return
    }

    openCleanup(id: string) {
        this.$router.push({name: 'Cleanup', params: {id}})
    }

}
</script>
