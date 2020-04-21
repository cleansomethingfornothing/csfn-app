import {UserLevel} from '@/types/UserLevel'
<template>
  <ion-page>
    <transparent-header :scrolled="scrolled">
      <template slot="end-buttons">
        <ion-button v-if="currentUser && user && currentUser.username === user.username" shape="round" fill="clear"
                    :color="scrolled ? 'dark' : 'white'" @click="$router.push('/settings')">
          <ion-icon name="settings"></ion-icon>
        </ion-button>
      </template>
    </transparent-header>

    <ion-content :scroll-events="true" @ionScroll="onScroll" class="fullscreen" color="lighter">
      <div class="lg:w-2/3 xl:w-1/2 m-auto bg-white lg:rounded-lg lg:mt-16 overflow-hidden lg:shadow-lg h-full lg:h-auto">
        <div class="h-48 relative">
          <img class="w-full h-full absolute object-center object-cover" src="@/assets/img/profile-bg-large.png">
        </div>
        <div class="-mt-16 flex flex-col justify-center items-center">
          <avatar class="w-32" :src="user && user.picture"></avatar>
          <ion-skeleton-text class="w-32" v-if="!user"></ion-skeleton-text>
          <ion-label v-else class="font-bold text-xl -ml-1">{{user.username}}</ion-label>
        </div>

        <hr class="my-4 mx-4">

        <div class="flex items-baseline justify-center -ml-1">
          <img :src="require(`@/assets/img/levels/${userLevelAndPercentage[0]}.svg`)" class="w-8">
          <ion-label class="ml-2 text-3xl economica">{{$t(userLevelAndPercentage[0])}}</ion-label>
        </div>
        <div class="flex justify-between items-center px-4">
          <div class="flex">
            <img class="w-6 mr-2" src="@/assets/img/cleanups.svg">
            <ion-label class="economica text-2xl font-bold" color="dark">
              {{Object.keys(userCleanups).length + $t('cleanups')}}
            </ion-label>
          </div>
          <div class="flex mr-1">
            <img class="w-6 mr-2" src="@/assets/img/weight.svg">
            <ion-label class="economica text-2xl font-bold" color="dark">{{userWeight}}Kg</ion-label>
          </div>
        </div>
        <div class="mt-2 px-3">
          <progress-bar :value="userLevelAndPercentage[1]"></progress-bar>
        </div>

        <hr class="mt-4 mb-2 mx-4">

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
      </div>
    </ion-content>
  </ion-page>
</template>
<script lang=ts>
  import Vue from 'vue'
  import Component from 'vue-class-component'
  import TransparentHeader from '@/views/components/common/TransparentHeader.vue'
  import Avatar from '@/views/components/common/Avatar.vue'
  import {userModule} from '@/store/userModule'
  import {cleanupsModule} from '@/store/cleanupsModule'
  import ProgressBar from '@/views/components/user/ProgressBar.vue'
  import LevelCalculator from '@/tools/LevelCalculator'
  import {UserLevel} from '@/types/UserLevel'

  @Component({
    name: "UserPage",
    components: {ProgressBar, Avatar, TransparentHeader}
  })
  export default class UserPage extends Vue {

    scrolled = false

    get currentUser() {
      return userModule.getCurrentUser
    }

    get user() {
      return userModule.getViewingUser
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
      return Object.values(this.userCleanups).reduce((acc, c) => acc + c.weight, 0)
    }

    mounted(): void {
      const userId = this.$route.params.id
      userModule.fetchViewingUser(userId)
      cleanupsModule.fetchFromUser(userId)
    }

    openCleanup(id: string) {
      this.$router.push({name: 'Cleanup', params: {id}})
    }

    onScroll(event: CustomEvent): void {
      this.scrolled = event.detail.scrollTop > 0;
    }

  }
</script>
<style scoped>

</style>
