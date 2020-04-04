<template>
  <ion-page class="ion-page">
    <home-header :hide-top-toolbar="hideTopToolbar" :address="address" @click="homeButtonClicked"></home-header>
    <ion-content class="ion-content home-content" fullscreen="true"
                 :scroll-events="true" @ionScroll="onScroll">
      <placeholder-card v-if="!cleanups"></placeholder-card>
      <cleanup-card v-else v-for="cleanup in cleanups" :key="cleanup.id" :cleanup="cleanup"
                    @click="openCleanup(cleanup.id)"></cleanup-card>
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

  @Component({
    name: 'HomePage.vue',
    components: {PlaceholderCard, CleanupCard, HomeHeader}
  })
  export default class HomePage extends Vue {

    public hideTopToolbar = false
    private lastScroll = 0

    get coords() {
      return locationModule.getCoords
    }

    get address() {
      return locationModule.getAddress
    }

    get cleanups() {
      return cleanupsModule.getCleanups
    }

    mounted() {
      cleanupsModule.fetch()
    }

    public onScroll(event: CustomEvent): void {
      const scroll = event.detail.scrollTop

      if (!this.hideTopToolbar && scroll > 56 && scroll > this.lastScroll) {
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
        acceptText: this.$t('save')
      }).then(({data}) => {
        if (data) {
          locationModule.updateUserPosition(data.selectedCoords)
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
        buttonDone: this.$t('cleanup-type-selection-done'),
        buttonNotDone: this.$t('cleanup-type-selection-not-done')
      }, 'cleanup-type-modal', true).then(({data}) => {
        this.$router.push({path: '/publish', query: {done: data.toString()}})
      })
    }
  }
</script>
