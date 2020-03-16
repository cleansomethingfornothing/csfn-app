<template>
  <ion-page class="ion-page">
    <home-header :hide-top-toolbar="hideTopToolbar" :address="address" @click="homeButtonClicked"></home-header>
    <ion-content class="ion-content home-content" fullscreen="true"
                 :scroll-events="true" @ionScroll="onScroll">
      <cleanup-card v-for="i in [1,2,3,4, 5, 6, 7, 8, 9, 10]" :key="i"></cleanup-card>
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
  import {nativeProvider} from '@/providers/native/native.provider'
  import SelectLocation from '@/views/SelectLocation.vue'
  import ModalPresenter from '@/tools/ModalPresenter'

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

    mounted() {
      nativeProvider.setStatusBarColor('#ffffff')
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
      this.$ionic.alertController.create({
        header: this.$t('publish-cleanup').toString(),
        message: this.$t('cleanup-type-selection').toString(),
        inputs: [
          {
            type: 'radio',
            label: this.$t('cleanup-type-selection-done').toString(),
            value: 'true',
          },
          {
            type: 'radio',
            label: this.$t('cleanup-type-selection-not-done').toString(),
            value: 'false',
          }
        ],
        buttons: [{
          text: this.$t('cancel').toString(),
          role: 'cancel'
        }, {
          text: this.$t('accept').toString(),
          handler: (done) => {
            this.$router.push({path: '/publish', query: {done}})
          }
        }]
      }).then(a => a.present())
    }
  }
</script>
<style>
  .home-content {
    --padding-top: 112px;
  }

  .ios .home-content {
    --padding-top: 80px;
  }
</style>
