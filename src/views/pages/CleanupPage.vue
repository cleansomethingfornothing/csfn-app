<template>
  <ion-page class="ion-page cleanup-page">
    <ion-content color="lighter">
      <ion-fab vertical="top" horizontal="start" slot="fixed">
        <ion-fab-button color="white" @click="$router.back()" size="small">
          <ion-icon name="arrow-back" color="dark"></ion-icon>
        </ion-fab-button>
      </ion-fab>
      <ion-fab vertical="top" horizontal="end" slot="fixed"
               v-if="cleanup && cleanup.user.username === currentUser.username">
        <ion-fab-button color="white" @click="$router.back()" size="small">
          <ion-icon name="create" color="dark"></ion-icon>
        </ion-fab-button>
      </ion-fab>
      <div class="lg:w-2/3 xl:w-1/2 m-auto bg-white lg:rounded-lg lg:my-8 overflow-hidden lg:shadow-lg">
        <div class="cleanup-page__picture h-2/3">
          <img v-if="cleanup" :src="cleanup.pictures[0]" class="absolute w-full h-full">
        </div>
        <div class="ion-padding">
          <div class="flex justify-between items-center -mt-2">
            <ion-label v-if="cleanup" class="text-sm">{{cleanup.user.username}}</ion-label>
            <ion-skeleton-text class="mb-3 mt-2" v-else animated style="width: 30%"></ion-skeleton-text>
            <ion-item v-if="cleanup" class="text-sm pl-0" lines="none">
              <ion-icon name="calendar" slot="start" class="text-lg mr-2" color="dark"></ion-icon>
              <ion-label class="my-1 ">{{cleanup.date.toLocaleDateString()}}
              </ion-label>
            </ion-item>
            <ion-skeleton-text class="mb-3 mt-2" v-else animated style="width: 30%"></ion-skeleton-text>
          </div>
          <hr class="mt-1 mb-4">
          <ion-text v-if="cleanup">{{cleanup.description}}</ion-text>
          <div v-else>
            <ion-skeleton-text animated style="width: 100%"></ion-skeleton-text>
            <ion-skeleton-text animated style="width: 100%"></ion-skeleton-text>
            <ion-skeleton-text animated style="width: 100%"></ion-skeleton-text>
          </div>
          <hr class="mt-4 mb-1">
          <ion-item v-if="cleanup" class="pl-0 text-base" lines="none">
            <ion-icon name="location" color="primary"></ion-icon>
            <ion-label>{{cleanup.location.address.city}}, {{cleanup.location.address.state}},
              {{cleanup.location.address.country}}
            </ion-label>
          </ion-item>
          <ion-skeleton-text class="my-4" v-else animated style="width: 60%"></ion-skeleton-text>
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

  @Component({
    name: 'cleanup-page'
  })
  export default class CleanupPage extends Vue {

    KEY = process.env.VUE_APP_GOOGLE_API_KEY

    width = 0

    mounted() {
      cleanupsModule.fetchOne(this.$route.params.id)
      setTimeout(() => {
        this.width = window.innerWidth
      })
    }

    get cleanup(): Cleanup {
      return cleanupsModule.getCleanup(this.$route.params.id)
    }

    get currentUser(): User {
      return userModule.getCurrentUser
    }

    openMap() {
      ModalPresenter.present(this.$ionic, MapModal, {origin: this.cleanup.location.coords})
    }

    edit() {
      return
    }
  }
</script>
<style>
  .cleanup-page__picture {
    background-color: var(--ion-color-light);
  }

  .cleanup-page__picture img {
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
