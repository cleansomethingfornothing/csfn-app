<template>
  <ion-page class="ion-page">
    <home-header :hide-top-toolbar="hideTopToolbar" :address="address" @click="homeButtonClicked"></home-header>
    <ion-content class="ion-content home-content" fullscreen="true"
                 :scroll-events="true" @ionScroll="onScroll">
      <cleanup-card v-for="cleanup in cleanups" :key="cleanup.id" :cleanup="cleanup"></cleanup-card>
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
  import HomeHeader from '@/components/home/HomeHeader.vue'
  import CleanupCard from '@/components/home/CleanupCard.vue'
  import {locationModule} from '@/store/locationModule'
  import SelectLocation from '@/views/modals/SelectLocation.vue'
  import ModalPresenter from '@/tools/ModalPresenter'
  import SelectCleanupType from '@/views/modals/SelectCleanupType.vue'
  import {cleanupsModule} from '@/store/cleanupsModule'

  @Component({
    name: 'Home',
    components: {CleanupCard, HomeHeader}
  })
  export default class Home extends Vue {

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
<style>

</style>
