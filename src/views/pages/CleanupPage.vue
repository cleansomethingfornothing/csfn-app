<template>
  <ion-page class="ion-page cleanup-page">
    <transparent-header :scrolled="scrolled">
      <template slot="end-buttons">
        <ion-button shape="round" fill="clear" :color="scrolled ? 'dark' : 'white'"
                    v-if="cleanup && cleanup.user.username === currentUser.username">
          <ion-icon name="create"></ion-icon>
        </ion-button>
      </template>
    </transparent-header>

    <ion-content class="fullscreen" color="lighter" :fullscreen="true" :scroll-events="true" @ionScroll="onScroll">
      <div class="lg:w-2/3 xl:w-1/2 m-auto bg-white lg:rounded-lg lg:my-16 overflow-hidden lg:shadow-lg">

        <!-- Pictures -->
        <div class="cleanup-page__picture h-2/3 cursor-pointer">
          <ion-slides pager="true" v-if="cleanup" class="absolute h-full w-full">
            <ion-slide v-for="(picture, i) in cleanup.pictures" :key="i" @click="openPictures(i)">
              <img alt="Cleanup picture" :src="picture" class="absolute w-full h-full">
            </ion-slide>
          </ion-slides>
        </div>

        <div class="ion-padding">
          <!-- Title -->
          <ion-skeleton-text v-if="!cleanup" animated style="width: 70%"></ion-skeleton-text>
          <ion-label v-else class="text-xl font-bold">{{$t(cleanup.done ? 'cleanup-in' : 'alert-in')}}
            {{cleanup.location.address.city}}
          </ion-label>
          <hr class="my-3" v-if="!cleanup || cleanup.done">

          <!-- Weight -->
          <ion-skeleton-text v-if="!cleanup" animated style="width: 50%"></ion-skeleton-text>
          <div v-if="cleanup && cleanup.done" class="flex items-center">
            <img src="@/assets/img/cleanup-done.svg" class="w-6 mr-2">
            <ion-label color="dark" class="text-md">{{$t('cleaned-weight', {param: cleanup.weight})}}
            </ion-label>
          </div>
          <hr class="my-3" v-if="!cleanup || cleanup.done">
          <div v-else class="mt-2"></div>

          <!-- Description -->
          <div v-if="!cleanup">
            <ion-skeleton-text animated style="width: 100%"></ion-skeleton-text>
            <ion-skeleton-text animated style="width: 100%"></ion-skeleton-text>
            <ion-skeleton-text animated style="width: 100%"></ion-skeleton-text>
          </div>
          <ion-text v-else>{{cleanup.description}}</ion-text>
          <br>
          <ion-skeleton-text v-if="!cleanup" class="mb-3 mt-2" animated style="width: 30%"></ion-skeleton-text>
          <ion-chip v-else class="-ml-1 mt-4" color="dark" @click="$router.push('/user/' + cleanup.user.username)">
            <ion-avatar>
              <img :src="cleanup.user.picture">
            </ion-avatar>
            <ion-label class="mr-2">{{cleanup.user.username}}</ion-label>
          </ion-chip>

          <hr class="mt-3 mb-1">

          <!-- Date-->
          <ion-skeleton-text v-if="!cleanup" class="mb-3 mt-2" animated style="width: 60%"></ion-skeleton-text>
          <ion-item v-else class="pl-0" lines="none">
            <ion-icon name="calendar" color="dark" class="mr-2"></ion-icon>
            <ion-label color="dark">
              {{$t('published-on')}} {{formattedDate}}
            </ion-label>
          </ion-item>

          <hr class="mt-1 mb-1">

          <!-- Location -->
          <ion-skeleton-text class="my-4" v-if="!cleanup" animated style="width: 60%"></ion-skeleton-text>
          <ion-item v-else class="pl-0" lines="none">
            <ion-icon name="location" color="primary" class="mr-2"></ion-icon>
            <ion-label class="font-bold">{{cleanup.location.address.city}}, {{cleanup.location.address.state}},
              {{cleanup.location.address.country}}
            </ion-label>
          </ion-item>

          <!-- Map -->
          <div class="h-2/3 mt-2 rounded-md w-full map-wrapper overflow-hidden ripple-parent cursor-pointer"
               @click="openMap">
            <img v-if="cleanup && width" class="absolute w-full h-full" :src="`https://maps.googleapis.com/maps/api/staticmap?key=${KEY}`
            + `&markers=color:0x${cleanup.done ? '9ed362': 'd32f2f'}|${cleanup.location.coords.lat},${cleanup.location.coords.lng}`
            + `&zoom=10&size=${width}x${Math.ceil(width * 2 / 3)}`">
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
  import TransparentHeader from '@/views/components/common/TransparentHeader.vue'

  @Component({
    name: 'cleanup-page',
    components: {TransparentHeader}
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
      return this.cleanup && moment(this.cleanup.date).format('D MMMM YYYY')
    }

    mounted() {
      cleanupsModule.fetchOne(this.$route.params.id)
      setTimeout(() => {
        this.width = window.innerWidth
      })
    }

    openMap() {
      ModalPresenter.present(this.$ionic, MapModal, {
        origin: this.cleanup.location.coords,
        pin: this.cleanup.done ? '/img/cleanup_pin.png' : '/img/alert_pin.png'
      })
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
</style>
