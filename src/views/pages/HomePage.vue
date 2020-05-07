<template>
  <ion-tabs @IonTabsDidChange="tabDidChange">
    <ion-tab tab="user">
      <current-user-page ref="user"/>
    </ion-tab>

    <ion-tab tab="community">
      <community-page ref="community"/>
    </ion-tab>

    <ion-tab tab="alerts">
      <alerts-page ref="alerts"/>
    </ion-tab>

    <ion-tab tab="events">
      <events-page ref="events"/>
    </ion-tab>

    <template slot="bottom">
      <ion-tab-bar selected-tab="community">
        <ion-tab-button tab="user">
          <ion-icon size="large" :src="require('@/assets/img/user.svg')"></ion-icon>
        </ion-tab-button>

        <ion-tab-button tab="community">
          <ion-icon size="large" :src="require('@/assets/img/community.svg')"></ion-icon>
        </ion-tab-button>

        <ion-tab-button tab="alerts">
          <ion-icon size="large" :src="require('@/assets/img/alerts.svg')"></ion-icon>
        </ion-tab-button>

        <ion-tab-button tab="events">
          <ion-icon size="large" :src="require('@/assets/img/events.svg')"></ion-icon>
        </ion-tab-button>
      </ion-tab-bar>
    </template>
  </ion-tabs>
</template>

<script lang="ts">
  import Vue from 'vue'
  import Component from 'vue-class-component'
  import HomeHeader from '@/views/components/home/HomeHeader.vue'
  import CleanupCard from '@/views/components/home/CleanupCard.vue'
  import PlaceholderCard from '@/views/components/home/PlaceholderCard.vue'
  import HomeCleanupsList from '@/views/components/home/CleanupsList.vue'
  import CleanupsMap from '@/views/components/home/CleanupsMap.vue'
  import CurrentUserPage from '@/views/pages/CurrentUserPage.vue'
  import CommunityPage from '@/views/pages/CommunityPage.vue'
  import AlertsPage from '@/views/pages/AlertsPage.vue'
  import EventsPage from '@/views/pages/EventsPage.vue'

  @Component({
    name: 'HomePage.vue',
    components: {
      EventsPage,
      AlertsPage,
      CommunityPage,
      CurrentUserPage,
      HomeCleanupsMap: CleanupsMap,
      HomeCleanupsList,
      PlaceholderCard: PlaceholderCard,
      CleanupCard: CleanupCard,
      HomeHeader
    }
  })
  export default class HomePage extends Vue {

    currentTab = ''

    mounted() {
      this.currentTab = this.$route.params.tab
    }

    tabDidChange({path}) {
      (this.$refs[this.currentTab] as any).exit()
      this.currentTab = path
      setTimeout(() => {
        (this.$refs[path] as any).init()
      }, 200)
    }
  }
</script>
