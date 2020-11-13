<template>
  <ion-app>
    <transition name="fade" mode="in-out">
      <router-view></router-view>
    </transition>
  </ion-app>
</template>
<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import CurrentUserPage from '@/views/pages/home/CurrentUserPage.vue'
import SelectCleanupType from '@/views/modals/CleanupTypeModal.vue'
import EventsPage from '@/views/pages/home/EventsPage.vue'
import AlertsPage from '@/views/pages/home/AlertsPage.vue'
import CommunityPage from '@/views/pages/home/CommunityPage.vue'

@Component({
  components: {CurrentUserPage, SelectCleanupType, EventsPage, AlertsPage, CommunityPage}
})
export default class Main extends Vue {

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
