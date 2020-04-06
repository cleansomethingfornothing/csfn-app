<template>
  <ion-page class="ion-page cleanup-page">
    <ion-content>
      <ion-fab vertical="top" horizontal="start" slot="fixed">
        <ion-fab-button color="white" @click="$router.back()" size="small">
          <ion-icon name="arrow-back" color="dark"></ion-icon>
        </ion-fab-button>
      </ion-fab>
      <ion-fab vertical="top" horizontal="end" slot="fixed" v-if="cleanup.user.username === currentUser.username">
        <ion-fab-button color="white" @click="$router.back()" size="small">
          <ion-icon name="create" color="dark"></ion-icon>
        </ion-fab-button>
      </ion-fab>
      <div class="cleanup-page__picture relative">
        <img :src="cleanup.pictures[0]" class="absolute w-full h-full">
      </div>
      <div class="ion-padding">
        <div class="flex justify-between items-center">
          <ion-label class="text-sm">{{cleanup.user.username}}</ion-label>
          <ion-item class="text-sm pl-0" lines="none">
            <ion-icon name="calendar" slot="start" class="text-lg mr-2" color="dark"></ion-icon>
            <ion-label class="my-1 ">{{cleanup.date.toLocaleDateString()}}
            </ion-label>
          </ion-item>
        </div>
        <hr class="mt-1 mb-4">
        {{cleanup.description}}
      </div>
    </ion-content>
  </ion-page>
</template>
<script lang="ts">
  import Vue from 'vue'
  import Component from 'vue-class-component'
  import {cleanupsModule} from '@/store/cleanupsModule'
  import {userModule} from '@/store/userModule'
  import Cleanup from '@/types/Cleanup'
  import User from '@/types/User'

  @Component({
    name: 'cleanup-page'
  })
  export default class CleanupPage extends Vue {

    get cleanup(): Cleanup {
      return cleanupsModule.getCleanup(this.$route.params.id)
    }

    get currentUser(): User {
      return userModule.getCurrentUser
    }

    edit() {
      return
    }
  }
</script>
<style>
  .cleanup-page__picture {
    background-color: #eee;
  }

  .cleanup-page__picture img {
    object-fit: cover;
    object-position: center center;
  }

  .cleanup-page__picture:after {
    display: block;
    content: '';
    padding-top: 66%;
    overflow: hidden;
  }
</style>
