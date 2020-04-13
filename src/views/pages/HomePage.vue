<template>
  <ion-page class="ion-page" color="lighter">
    <home-header :user="user" :hide-top-toolbar="hideTopToolbar" :address="address"
                 @click="homeButtonClicked"></home-header>
    <ion-content class="ion-content home-content" color="lighter"
                 :scroll-events="true" @ionScroll="onScroll">
      <ion-refresher v-if="cleanups" slot="fixed" @ionRefresh="refresh">
        <ion-refresher-content>
        </ion-refresher-content>
      </ion-refresher>
      <div class="lg:w-2/3 xl:w-1/2 m-auto pb-4 cards min-h-screen flex flex-col justify-between">
        <placeholder-card v-if="!Object.keys(cleanups).length"></placeholder-card>

        <cleanup-card v-else v-for="cleanup in cleanups" :key="cleanup.id" :cleanup="cleanup"
                      @click="openCleanup(cleanup.id)"></cleanup-card>

        <ion-label size="small" color="medium" class="title ml-4">© Clean something for nothing {{new
          Date().getFullYear()}}
        </ion-label>
      </div>
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
  import {Ref} from 'vue-property-decorator'
  import Cleanup from '@/types/Cleanup'
  import {userModule} from '@/store/userModule'
  import FiltersModal from '@/views/modals/FiltersModal.vue'

  @Component({
    name: 'HomePage.vue',
    components: {PlaceholderCard, CleanupCard, HomeHeader}
  })
  export default class HomePage extends Vue {

    public hideTopToolbar = false
    private lastScroll = 0

    @Ref('refresher')
    refresher: any

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

    mounted() {
      cleanupsModule.setCleanups([])
      this.fetch()
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

    openCleanup(id: string) {
      this.$router.push({name: 'Cleanup', params: {id}})
    }

    publish() {
      ModalPresenter.present(this.$ionic, SelectCleanupType, {
        title: this.$t('publish-cleanup'),
        message: this.$t('cleanup-type-selection'),
        alert: this.$t('alert'),
        cleanup: this.$t('cleanup')
      }, 'cleanup-type-modal', true).then(({data}) => {
        if (data) {
          this.$router.push({path: '/publish', query: {done: data.toString()}})
        }
      })
    }
  }
</script>
<style>
  ion-refresher ion-refresher-content {
    background-color: var(--ion-color-lighter);
    --color: var(--ion-color-primary) !important;
  }
</style>
