<template>
  <ion-page class="ion-page cleanup-page">
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
    <ion-content>
      <div class="cleanup-page__picture">
        <img :src="cleanup ? cleanup.picture : 'img/placeholder.png'">
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
    height: 40%;
  }
</style>
