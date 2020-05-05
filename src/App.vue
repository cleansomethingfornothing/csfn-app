<template>
  <ion-app>
    <router-view></router-view>
  </ion-app>
</template>
<script lang="ts">
  import Vue from 'vue'
  import Component from 'vue-class-component'
  import {userModule} from '@/store/userModule'
  import {authModule} from '@/store/authModule'
  import {nativeProvider} from '@/providers/native/native.provider'
  import {appModule} from '@/store/appModule'
  import CurrentUserPage from '@/views/pages/CurrentUserPage.vue'
  import SelectCleanupType from '@/views/modals/CleanupTypeModal.vue'
  import EventsPage from '@/views/pages/EventsPage.vue'
  import AlertsPage from '@/views/pages/AlertsPage.vue'
  import CommunityPage from '@/views/pages/CommunityPage.vue'

  @Component({
    components: {CurrentUserPage, SelectCleanupType, EventsPage, AlertsPage, CommunityPage}
  })
  export default class Main extends Vue {

    currentIndex = 1

    tabIndex = {
      'user': 0,
      'community': 1,
      'alerts': 2,
      'events': 3
    }

    get initialized() {
      return appModule.isInitialized
    }

    get user() {
      return userModule.getCurrentUser
    }

    mounted() {
      appModule.initialize()
        .then(() => {
          nativeProvider.hideSplashScreen()
        })
    }

    logout() {
      authModule.doLogout()
        .then(() => this.$router.push('/login'))
    }
  }
</script>
<style lang="scss">
  @import 'assets/style/main';

  ion-tab-bar {
    border-top: 1px solid #ccc;
  }

  ion-tab-button {
    border-top: 2px solid;
    border-color: #fff;
    transition: border-top-color 0.35s;
  }

  .tab-selected {
    border-color: var(--ion-color-primary);
  }
</style>
