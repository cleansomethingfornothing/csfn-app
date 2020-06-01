<template>
  <ion-page>
    <ion-content :scroll-events="true" class="user-content min-h-screen">
      <div class="bg-poly bg-poly-1 h-64 lg:h-88 ios:h-60 sm:ios:h-64 lg:ios:h-72 xl:ios:h-88"></div>
      <div class="-mt-24 pt-3 lg:-mt-32 xl:-mt-40 z-10 sm:ios:pt-4">
        <div class="sm:ios:pt-3"></div>
        <wave :num="1"/>
      </div>
      <div class="-mt-40 lg:-mt-48 flex flex-col justify-center items-center pt-4 ios:-mt-40  lg:ios:-mt-56">
        <avatar class="w-32 lg:w-40" :src="user && user.picture"></avatar>
        <ion-skeleton-text class="w-32" v-if="!user"></ion-skeleton-text>
        <ion-label v-else class="font-bold text-xl -ml-1">{{user.username}}</ion-label>
      </div>

      <hr class="mt-4 mx-4">

      <div class="ripple-parent ion-activatable py-4">
        <div class="flex items-baseline justify-center -ml-1">
          <div class="w-8">
            <img :src="require(`@/assets/img/levels/${userLevelAndPercentage[0]}.svg`)">
          </div>
          <ion-label class="ml-2 text-3xl economica">{{$t(userLevelAndPercentage[0])}}</ion-label>
        </div>
        <div class="flex justify-between items-center px-4">
          <div class="flex">
            <div class="w-6 mr-2 flex justify-center items-center">
              <img src="@/assets/img/icons/cleanups.svg">
            </div>
            <ion-label class="economica text-2xl font-bold" color="dark">
              {{Object.keys(userCleanups).length + ' ' + $t('cleanups')}}
            </ion-label>
          </div>
          <div class="flex items-enter mr-1">
            <div class="w-6 mr-2 flex justify-center items-center">
              <img src="@/assets/img/icons/weight.svg">
            </div>
            <ion-label class="economica text-2xl font-bold" color="dark">{{userWeight}} Kg</ion-label>
          </div>
        </div>
        <div class="mt-2 px-3">
          <progress-bar :value="userLevelAndPercentage[1]"></progress-bar>
        </div>
        <ion-ripple-effect></ion-ripple-effect>
      </div>

      <!--
      <hr class="mb-4 mb-2 mx-4">
      -->

      <div class="p-2 lg:px-24 -mt-4">
        <ion-card button class="lg:h-64">
          <community-map/>
        </ion-card>
      </div>

      <hr>

      <ion-list lines="inset">
        <ion-item button detail="true" @click="$router.push('/user-activities?type=cleanups')">
          <ion-icon slot="start" name="trash" color="medium"></ion-icon>
          <ion-label class="my-4">{{$t('cleanups')}}</ion-label>
        </ion-item>
        <ion-item button detail="true" @click="$router.push('/user-activities?type=alerts')">
          <ion-icon slot="start" name="alert" color="medium"></ion-icon>
          <ion-label class="my-4">{{$t('alerts')}}</ion-label>
        </ion-item>
        <ion-item button detail="true" @click="$router.push('/user-activities?type=events')">
          <ion-icon slot="start" name="flag" color="medium"></ion-icon>
          <ion-label class="my-4">{{$t('events')}}</ion-label>
        </ion-item>
        <ion-item button detail="true" @click="$router.push('/settings')">
          <ion-icon slot="start" name="settings" color="medium"></ion-icon>
          <ion-label class="my-4">{{$t('settings')}}</ion-label>
        </ion-item>
      </ion-list>

      <div class="pt-12"></div>
      <!--
      <ion-list lines="inset">
        <ion-list-header>
          <ion-label class="font-bold text-xl">{{$t('cleanups-and-alerts')}}</ion-label>
        </ion-list-header>

        <ion-item button v-if="userCleanups === null">
          <ion-thumbnail slot="start">
            <ion-skeleton-text animated class="w-full h-full"></ion-skeleton-text>
          </ion-thumbnail>
          <ion-label>
            <ion-skeleton-text animated class="w-3/4"></ion-skeleton-text>
            <ion-skeleton-text animated class="w-full mt-2"></ion-skeleton-text>
          </ion-label>
        </ion-item>

        <ion-item v-if="Object.keys(userCleanups).length === 0" class="w-full text-center p-2" lines="none">
          <ion-label>{{$t('no-cleanups')}}</ion-label>
        </ion-item>

        <ion-item v-for="cleanup of userCleanups" :key="cleanup.id" button @click="openCleanup(cleanup.id)">
          <ion-thumbnail slot="start">
            <img alt="Cleanup image" class="w-full h-full object-cover object-center" :src="cleanup.pictures[0]">
          </ion-thumbnail>
          <ion-label>
            <h2>
              <b>{{$t(cleanup.done ? 'cleanup-in' : 'alert-in')}} {{cleanup.location.address.city}}</b>
            </h2>
            <p>
              {{cleanup.description}}
            </p>
          </ion-label>
        </ion-item>
      </ion-list>
      -->
    </ion-content>
  </ion-page>
</template>
<script lang=ts>
  import Vue from 'vue'
  import Component from 'vue-class-component'
  import TransparentHeader from '@/views/components/common/TransparentHeader.vue'
  import Avatar from '@/views/components/common/Avatar.vue'
  import {userModule} from '@/store/userModule'
  import {cleanupsModule} from '@/store/activitiesModule'
  import ProgressBar from '@/views/components/user/ProgressBar.vue'
  import LevelCalculator from '@/tools/LevelCalculator'
  import {UserLevel} from '@/types/UserLevel'
  import Wave from '@/views/components/common/Wave.vue'
  import CommunityMap from '@/views/components/community/CommunityMap.vue'

  @Component({
    name: "current-user-page",
    components: {CommunityMap, Wave, ProgressBar, Avatar, TransparentHeader}
  })
  export default class CurrentUserPage extends Vue {

    get user() {
      return userModule.getCurrentUser
    }

    get userLevelAndPercentage(): [UserLevel, number] {
      return LevelCalculator.getUserLevelAndPercentage(Object.values(this.userCleanups))
    }

    get userCleanups() {
      return cleanupsModule.getUserCleanups || {}
    }

    get sortedCleanups() {
      return Object.values(this.userCleanups).sort((a, b) => a.date.getMilliseconds() - b.date.getMilliseconds())
    }

    get userWeight() {
      return Object.values(this.userCleanups).reduce((acc, c) => acc + c.volume, 0)
    }

    mounted(): void {
      const userId = this.$route.params.id
      userModule.fetchViewingUser(userId)
      //cleanupsModule.fetchFromUser(userId)
    }

    init() {
      return
    }

    exit() {
      return
    }

    openCleanup(id: string) {
      this.$router.push({name: 'Cleanup', params: {id}})
    }

  }
</script>
