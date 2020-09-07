<template>
  <ion-app>
    <div>
        <router-view></router-view>
    </div>
  </ion-app>
</template>
<script lang="ts">
  import Vue from 'vue'
  import Component from 'vue-class-component'
  import {userModule} from '@/store/userModule'
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

    get initialized() {
      return appModule.isInitialized
    }

    get user() {
      return userModule.getCurrentUser
    }

    mounted() {
      appModule.initialize()
    }
  }
</script>
<style lang="scss">
  @import 'assets/style/main.scss';

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
