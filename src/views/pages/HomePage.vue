<template>
  <ion-page class="home-page">
    <ion-slides class="w-full h-full" ref="slider" :options="{initialSlide: 1, resistanceRatio: 1}"
                @ionSlideWillChange="slided">
      <ion-slide>
        <current-user-page ref="user"/>
      </ion-slide>
      <ion-slide>
        <community-page ref="community"/>
      </ion-slide>
      <ion-slide>
        <alerts-page ref="alerts"/>
      </ion-slide>
      <ion-slide>
        <events-page ref="events"/>
      </ion-slide>
    </ion-slides>

    <ion-tab-bar>
      <ion-tab-button v-for="tab in ['user', 'community', 'alerts', 'events']" :key="tab" @click="changeTab(tab)"
                      :selected="selectedTab === tab">
        <ion-icon v-if="selectedTab === tab" size="large"
                  :src="require('@/assets/img/tabs/' + tab + '.svg')"></ion-icon>
        <ion-icon  v-else size="large" :src="require('@/assets/img/tabs/' + tab + '_off.svg')"></ion-icon>
      </ion-tab-button>
    </ion-tab-bar>
  </ion-page>
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
  import {Ref} from 'vue-property-decorator'

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

    tabs = ['user', 'community', 'alerts', 'events']

    selectedTab = ''

    @Ref('slider')
    slider: any

    mounted() {
      this.slideTo(this.$route.params.tab)
    }

    changeTab(tab) {
      this.leaveTab(tab)
      this.slideTo(tab)
    }

    slideTo(tab) {
      this.slider.slideTo(this.tabs.indexOf(tab))
      this.enterTab(tab)
    }

    leaveTab(tab) {
      (this.$refs[this.selectedTab] as any).exit()
      this.$router.replace('/home/' + tab)
    }

    enterTab(tab) {
      Promise.resolve().then(() => (this.$refs[tab] as any).init())
      this.selectedTab = tab
    }

    slided() {
      this.slider.getActiveIndex()
        .then(index => {
          const tab = this.tabs[index]
          if (this.selectedTab !== tab) {
            this.leaveTab(tab)
            this.enterTab(tab)
          }
        })
    }
  }
</script>
<style>
  .home-tabs {
    --padding: 0;
    --pading-top: 0;
  }

  .tab-button {
    height: 150%;
  }
</style>
