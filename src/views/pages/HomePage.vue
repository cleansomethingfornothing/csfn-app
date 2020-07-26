<template>
  <ion-page class="ion-page home-page">
    <ion-fab vertical="bottom" horizontal="end" class="ios:mb-11 mb-13">
      <ion-fab-button color="white">
        <ion-icon color="primary" name="add" size="large"/>
      </ion-fab-button>

      <ion-fab-list side="top">
        <ion-fab-button color="white" :data-desc="$t('event')" @click="$router.push('/publish?type=event')">
          <ion-icon name="flag" color="secondary"/>
        </ion-fab-button>
        <ion-fab-button color="white" :data-desc="$t('alert')" @click="$router.push('/publish?type=alert')">
          <ion-icon name="alert" color="secondary"/>
        </ion-fab-button>
        <ion-fab-button color="white" :data-desc="$t('cleanup')" @click="$router.push('/publish?type=cleanup')">
          <ion-icon name="trash" color="secondary"/>
        </ion-fab-button>
      </ion-fab-list>
    </ion-fab>

    <ion-slides class="w-full h-full" ref="slider"
                :options="{initialSlide: 3, resistanceRatio: 1, cssMode: true, centeredSlides: true}"
                @ionSlideWillChange="slided">
      <ion-slide>
        <current-user-page v-if="loaded || $route.params.tab === 'user'" ref="user"/>
      </ion-slide>
      <ion-slide>
        <community-page v-if="loaded || $route.params.tab === 'community'" ref="community"/>
      </ion-slide>
      <ion-slide>
        <alerts-page v-if="loaded || $route.params.tab === 'alerts'" ref="alerts"/>
      </ion-slide>
      <ion-slide>
        <events-page v-if="loaded || $route.params.tab === 'events'" ref="events"/>
      </ion-slide>
    </ion-slides>

    <ion-tab-bar>
      <ion-tab-button v-for="tab in ['user', 'community', 'alerts', 'events']" :key="tab"
                      @click="slideTo(tab)" :selected="selectedTab === tab">
        <transition name="fade">
          <ion-icon v-if="selectedTab === tab" size="large"
                    :src="require('@/assets/img/tabs/' + tab + '.svg')"></ion-icon>
          <ion-icon v-else size="large" :src="require('@/assets/img/tabs/' + tab + '_off.svg')"></ion-icon>
        </transition>
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
  import {Ref, Watch} from 'vue-property-decorator'

  @Component({
    name: 'home-page',
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

    loaded = false

    tabs = ['user', 'community', 'alerts', 'events']

    selectedTab = ''

    @Ref('slider')
    slider: HTMLIonSlidesElement

    mounted() {
      this.changedRoute(this.$route)
      this.slider.slideTo(this.tabs.indexOf(this.$route.params.tab), 0)
      setTimeout(() => {
        this.loaded = true
      }, 2000)
    }

    activated() {
      this.slider.slideTo(this.tabs.indexOf(this.$route.params.tab), 0)
    }

    @Watch('$route')
    changedRoute(route) {
      if (route.params.tab !== this.selectedTab && route.name === 'HomePage') {
        this.selectedTab && (this.$refs[this.selectedTab] as any).exit();
        (this.$refs[route.params.tab] as any).init()
        this.selectedTab = route.params.tab
      }
    }

    slideTo(tab) {
      this.slider.slideTo(this.tabs.indexOf(tab))
    }

    slided() {
      this.slider.isBeginning().then((beg) => this.slider.lockSwipeToPrev(beg))
      this.slider.isEnd().then((end) => this.slider.lockSwipeToNext(end))
      this.slider.getActiveIndex()
        .then(index => {
          if (this.tabs[index] !== this.selectedTab) {
            this.$router.replace('/home/' + this.tabs[index]);
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

  ion-fab-button[data-desc] {
    position: relative;
  }

  ion-fab-button[data-desc]::before {
    position: absolute;
    top: 6px;
    content: attr(data-desc);
    z-index: 1;
    right: 50px;
    /*background-color: var(--ion-color-dark);*/
    background-color: #fff;
    padding: 4px 8px;
    border-radius: 4px;
    color: var(--ion-text-color);
    /*color: white;*/
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
    opacity: 0.9;
  }

  ion-fab-button[data-desc]::after {
    z-index: 1;
    content: " ";
    position: absolute;
    top: 40%;
    left: -25%;
    border-width: 5px;
    border-style: solid;
    border-color: transparent transparent transparent #fff;
    /*border-color: transparent transparent transparent var(--ion-color-dark);*/
  }
</style>
