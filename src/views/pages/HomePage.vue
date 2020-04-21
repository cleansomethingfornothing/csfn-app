<template>
  <ion-page class="ion-page" color="lighter">
    <home-header :user="user" :hide-top-toolbar="hideTopToolbar" :address="address"
                 @click="homeButtonClicked" :show-map="showMap"></home-header>
    <ion-content class="ion-content home-content" color="lighter"
                 :scroll-events="true" @ionScroll="onScroll">

      <ion-refresher v-if="cleanups && showMap === false" slot="fixed" @ionRefresh="refresh">
        <ion-refresher-content>
        </ion-refresher-content>
      </ion-refresher>

      <transition name="fade">
        <home-cleanups-list v-if="showMap === false" :cleanups="cleanups" @refresh="refresh"
                            @click="openCleanup" :coords="coords"></home-cleanups-list>

        <home-cleanups-map v-else-if="coords" :cleanups="cleanups" :origin="coords"
                           @click="openCleanup"></home-cleanups-map>
      </transition>

      <ion-fab vertical="bottom" horizontal="end" slot="fixed">
        <ion-fab-button color="white" @click="publish">
          <ion-icon name="add" color="primary"></ion-icon>
        </ion-fab-button>
      </ion-fab>
    </ion-content>
  </ion-page>
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

  @Component({
    name: 'HomePage.vue',
    components: {
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
        if (data) {
          this.$router.push({path: '/publish', query: {done: data.toString()}})
        }
      })
    }
  }
</script>
