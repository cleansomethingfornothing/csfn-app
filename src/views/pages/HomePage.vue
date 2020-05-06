<template>
  <div>
    <ion-tabs @IonTabsWillChange="tabWillChange" @IonTabsDidChange="tabDidChange">
      <ion-tab tab="user" ref="user">
        <current-user-page/>
      </ion-tab>

      <ion-tab tab="community" ref="community">
        <community-page/>
      </ion-tab>

      <ion-tab tab="alerts" ref="alerts">
        <alerts-page/>
      </ion-tab>

      <ion-tab tab="events" ref="events">
        <events-page/>
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
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import Component from 'vue-class-component'
  import HomeHeader from '@/views/components/home/HomeHeader.vue'
  import CleanupCard from '@/views/components/home/CleanupCard.vue'
  import {locationModule} from '@/store/locationModule'
  import SelectLocation from '@/views/modals/LocationModal.vue'
  import ModalPresenter from '@/tools/ModalPresenter'
  import SelectCleanupType from '@/views/modals/CleanupTypeModal.vue'
  import {cleanupsModule} from '@/store/cleanupsModule'
  import PlaceholderCard from '@/views/components/home/PlaceholderCard.vue'
  import Cleanup from '@/types/Cleanup'
  import {userModule} from '@/store/userModule'
  import FiltersModal from '@/views/modals/FiltersModal.vue'
  import HomeCleanupsList from '@/views/components/home/CleanupsList.vue'
  import CleanupsMap from '@/views/components/home/CleanupsMap.vue'
  import {Watch} from 'vue-property-decorator'
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

    public hideTopToolbar = false

    private lastScroll = 0

    showMap: boolean = null

    get user() {
      return userModule.getCurrentUser
    }

    get coords() {
      return locationModule.getCoords
    }

    get address() {
      return locationModule.getAddress
    }

    get cleanups(): { [id: string]: Cleanup } {
      return cleanupsModule.getCleanups
    }

    @Watch('coords')
    coordsChanged(coords) {
      if (coords) {
        this.fetch()
      }
    }

    @Watch('$route')
    routeChange(to) {
      this.showMap = !!(to.query.view && to.query.view == 'map')
    }

    mounted(): void {
      if (this.coords) {
        this.fetch()
      }

      this.showMap = !!(this.$route.query.view && this.$route.query.view == 'map')
    }

    tabWillChange({path}) {
      return
    }

    tabDidChange({path}) {
      return
    }

    fetch() {
      return cleanupsModule.fetch()
    }

    refresh(event) {
      this.fetch()
        .then(() => {
          event.target.complete()
        })
    }

    openCleanup(id: string) {
      this.$router.push({name: 'Cleanup', params: {id}})
    }

    public onScroll(event: CustomEvent): void {
      const scroll = event.detail.scrollTop

      if (!this.hideTopToolbar && scroll > 56 && scroll > this.lastScroll
        && scroll < document.querySelector('.cards')['offsetHeight'] - window.innerHeight) {
        this.hideTopToolbar = true
      } else if (this.hideTopToolbar && scroll < this.lastScroll) {
        this.hideTopToolbar = false
      }

      this.lastScroll = scroll
    }

    homeButtonClicked(button) {
      switch (button) {
        case 'location':
          this.openLocationSelection()
          break
        case 'filters':
          this.openFilters()
          break
        case 'map':
          this.toggleMap()
          break
      }
    }

    openLocationSelection() {
      ModalPresenter.present(this.$ionic, SelectLocation, {
        currentCoords: this.coords,
        currentAddress: this.address,
        searchPlaceholder: this.$t('search-place'),
        cancelText: this.$t('cancel'),
        acceptText: this.$t('save'),
        pin: '/img/user_pin.png'
      }).then(({data}) => {
        if (data) {
          locationModule.updateUserPosition(data.selectedCoords)
          this.fetch()
        }
      })
    }

    openFilters() {
      ModalPresenter.present(this.$ionic, FiltersModal, {
        titleText: this.$t('filter-results'),
        alertsTitle: this.$t('alerts'),
        alertsText: this.$t('show-alerts'),
        distanceText: this.$t('distance'),
        noLimitsText: this.$t('no-limits')
      }).then(({data}) => {
        if (data && data.changed) {
          this.fetch()
        }
      })
    }

    toggleMap() {
      this.$router.push({path: '/', query: {view: this.showMap ? 'list' : 'map'}})
    }

    publish() {
      ModalPresenter.present(this.$ionic, SelectCleanupType, {
        title: this.$t('publish-cleanup'),
        message: this.$t('cleanup-type-selection'),
        alert: this.$t('alert'),
        cleanup: this.$t('cleanup')
      }, 'cleanup-type-modal').then(({data}) => {
        if (data !== undefined) {
          this.$router.push({path: '/publish', query: {done: data.toString()}})
        }
      })
    }
  }
</script>
