<template>
  <ion-page class="ion-page cleanup-page">
    <div class="cleanup-header" :class="scrolled ? 'scrolled' : ''">
      <ion-header mode="ios">
        <ion-toolbar mode="ios">
          <ion-buttons slot="start">
            <ion-button shape="round" fill="clear" @click="$router.back()" :color="scrolled ? 'dark' : 'white'">
              <ion-icon name="arrow-back"></ion-icon>
            </ion-button>
          </ion-buttons>
          <ion-buttons slot="end">
            <ion-button shape="round" fill="clear" :color="scrolled ? 'dark' : 'white'"
                        v-if="cleanup && cleanup.user.username === currentUser.username">
              <ion-icon name="create"></ion-icon>
            </ion-button>
          </ion-buttons>
        </ion-toolbar>
      </ion-header>
    </div>

    <ion-content class="cleanup-content" color="lighter" :fullscreen="true" :scroll-events="true" @ionScroll="onScroll">
      <div class="lg:w-2/3 xl:w-1/2 m-auto bg-white lg:rounded-lg lg:mt-16 overflow-hidden lg:shadow-lg">

        <!-- Pictures -->
        <div class="cleanup-page__picture h-2/3 cursor-pointer">
          <ion-slides pager="true" v-if="cleanup" class="absolute h-full w-full">
            <ion-slide v-for="(picture, i) in cleanup.pictures" :key="i" @click="openPictures(i)">
              <img alt="Cleanup picture" :src="picture" class="absolute w-full h-full">
            </ion-slide>
          </ion-slides>
        </div>

        <!-- Weight -->
        <div class="ion-padding">
          <ion-skeleton-text class="mb-3 mt-2" v-if="!cleanup" animated style="width: 30%"></ion-skeleton-text>
          <div class="mt-1" v-else>
            <div v-if="cleanup.done" class="flex items-center">
              <img src="@/assets/img/cleanup-done.svg" class="w-6 mr-2">
              <ion-label class="font-bold">{{$t('cleaned-weight', {param: cleanup.weight})}}</ion-label>
            </div>
            <div v-else>
              <img src="@/assets/img/cleanup-not-done.svg" class="w-1/12">
            </div>
          </div>

          <hr class="my-4">

          <!-- Description -->
          <div v-if="!cleanup">
            <ion-skeleton-text animated style="width: 100%"></ion-skeleton-text>
            <ion-skeleton-text animated style="width: 100%"></ion-skeleton-text>
            <ion-skeleton-text animated style="width: 100%"></ion-skeleton-text>
          </div>
          <ion-text v-else>{{cleanup.description}}</ion-text>

          <hr class="mt-4 mb-2">

          <!-- User and date -->
          <div class="flex justify-between items-center -mt-2">
            <ion-skeleton-text class="mb-3 mt-2" v-if="!cleanup" animated style="width: 30%"></ion-skeleton-text>
            <ion-label v-else class="text-sm font-bold">{{cleanup.user.username}}</ion-label>
            <ion-item v-if="cleanup" class="text-sm pl-0" lines="none">
              <ion-icon name="calendar" slot="start" class="text-lg mr-2" color="dark"></ion-icon>
              <ion-label class="my-1 font-bold">{{formattedDate}}</ion-label>
            </ion-item>
            <ion-skeleton-text class="mb-3 mt-2" v-else animated style="width: 30%"></ion-skeleton-text>
          </div>

          <hr class="mb-1">

          <!-- Location -->
          <ion-skeleton-text class="my-4" v-if="!cleanup" animated style="width: 60%"></ion-skeleton-text>
          <ion-item v-else class="pl-0" lines="none">
            <ion-icon name="location" color="primary" class="mr-2"></ion-icon>
            <ion-label class="font-bold">{{cleanup.location.address.city}}, {{cleanup.location.address.state}},
              {{cleanup.location.address.country}}
            </ion-label>
          </ion-item>

          <!-- Map -->
          <div class="h-2/3 mt-1 rounded-md w-full map-wrapper overflow-hidden ripple-parent cursor-pointer"
               @click="openMap">
            <img v-if="cleanup && width" class="absolute w-full h-full" :src="`https://maps.googleapis.com/maps/api/staticmap?key=${KEY}`
            + `&markers=color:0x9ed362|${cleanup.location.coords.lat},${cleanup.location.coords.lng}`
            + `&zoom=13&size=${width}x${Math.ceil(width * 2 / 3)}`">
            <ion-ripple-effect></ion-ripple-effect>
          </div>

        </div>
      </div>
    </ion-content>
  </ion-page>
</template>
<script lang="ts">
  import Vue from 'vue'
  import Component from 'vue-class-component'
  import {cleanupsModule} from '@/store/cleanupsModule'
  import {userModule} from '@/store/userModule'
  import Cleanup from '@/types/Cleanup'
  import User from '@/types/User'
  import ModalPresenter from '@/tools/ModalPresenter'
  import MapModal from '@/views/modals/MapModal.vue'
  import moment from 'moment'
  import PicturesModal from '@/views/modals/PicturesModal.vue'

  @Component({
    name: 'cleanup-page'
  })
  export default class CleanupPage extends Vue {

    KEY = process.env.VUE_APP_GOOGLE_API_KEY

    width = 0
    scrolled = false

    get cleanup(): Cleanup {
      return cleanupsModule.getCleanup(this.$route.params.id)
    }

    get currentUser(): User {
      return userModule.getCurrentUser
    }

    get formattedDate() {
      return this.cleanup && moment(this.cleanup.date).format('D MMM YYYY')
    }

    mounted() {
      cleanupsModule.fetchOne(this.$route.params.id)
      setTimeout(() => {
        this.width = window.innerWidth
      })
    }

    openMap() {
      ModalPresenter.present(this.$ionic, MapModal, {origin: this.cleanup.location.coords})
    }

    openPictures(selected) {
      ModalPresenter.present(this.$ionic, PicturesModal, {pictures: this.cleanup.pictures, selected})
    }

    edit() {
      return
    }

    onScroll(event: CustomEvent): void {
      this.scrolled = event.detail.scrollTop > 0;
    }
  }
</script>
<style>
  .cleanup-page__picture {
    background-color: var(--ion-color-light);
  }

  .cleanup-page__picture img {
    width: 100%;
    object-fit: cover;
    object-position: center center;
  }

  ion-item.pl-0 {
    --padding-start: 0;
  }

  .map-wrapper {
    background-color: var(--ion-color-light);
  }

  .map-wrapper > img {
    object-position: center center;
    object-fit: cover;
  }

  .cleanup-header {
    background-color: transparent;
  }

  .cleanup-header ion-toolbar {
    --background: linear-gradient(180deg, rgba(0, 0, 0, 0.4), transparent 100%);
    --border-width: 0 !important;
    --box-shadow: none !important;
  }

  .cleanup-header * {
    transition: all 0.5s;
  }

  .cleanup-header.scrolled ion-toolbar {
    --background: #fff;
    --border-width: 0 0 0.55px 0 !important;
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  }

  .cleanup-content {
    top: -44px
  }

  @media (min-width: 600px) {
    .cleanup-header ion-toolbar {
      --background: #fff !important;
      --border-width: 0 0 0.55px 0 !important;
      box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
    }

    .cleanup-header ion-toolbar * {
      color: var(--ion-color-dark);
    }
  }
</style>
