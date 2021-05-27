<template>
  <page-transparent-header ref="page" :transparent="true">
    <ion-page class="ion-page">
      <transparent-header>
        <template slot="end-buttons">
          <ion-button v-if="activity && activity.user.username === currentUser.username" fill="clear"
                      shape="round"
                      @click="$router.push('/edit-cleanup')">
            <ion-icon name="pencil-sharp"></ion-icon>
          </ion-button>
        </template>
      </transparent-header>

      <ion-content ref="cleanup-content" :fullscreen="true" :scroll-events="true" class="fullscreen"
                   color="lighter" @ionScroll="onScroll">
        <div class="lg:w-2/3 xl:w-1/2 m-auto bg-white lg:rounded-lg lg:my-16 overflow-hidden lg:shadow-lg">

          <!-- Pictures -->
          <div class="cleanup-page__picture h-2/3 cursor-pointer">
            <transition name="fade">
              <ion-slides v-if="activity" class="absolute h-full w-full" pager="true">
                <ion-slide v-for="(picture, i) in activity.pictures" :key="i" @click="openPictures(i)">
                  <img :src="picture.publicUrl" alt="Cleanup picture" class="absolute w-full h-full">
                </ion-slide>
              </ion-slides>
              <ion-skeleton-text v-else animated class="absolute w-full h-full m-0"></ion-skeleton-text>
            </transition>
          </div>

          <transition name="fade">
            <div v-if="activity" class="ion-padding">
              <!-- Title -->
              <ion-label class="text-xl font-bold">
                {{ title }}
              </ion-label>

              <!-- Chips -->
              <div class="my-1">
                <ion-chip class="ml-0" color="secondary">
                  <ion-icon :src="require('@/assets/img/icons/bag.svg')" class="ml-0 mr-2 text-sm"/>
                  {{ activity.volume }} {{ $t('liters') }}
                </ion-chip>
                <ion-chip v-if="activity.weight" color="secondary">
                  <ion-icon :src="require('@/assets/img/icons/scale.svg')"
                            class="ml-0 mr-2 text-sm"/>
                  {{ activity.weight | localeString }} {{ $t('kilos') }}
                </ion-chip>
              </div>

              <!-- Description -->
              <ion-text>{{ activity.description }}</ion-text>

              <!-- User and date -->
              <div class="flex justify-between items-end">
                <ion-chip class="-ml-1 mt-4" color="dark">
                  <!--@click="$router.push('/user/' + activity.user.username)"-->
                  <ion-avatar>
                    <img :src="activity.user.picture.publicUrl">
                  </ion-avatar>
                  <ion-label class="mr-2 font-bold">{{ activity.user.username }}</ion-label>
                </ion-chip>

                <ion-label class="text-sm mb-1" color="dark">
                  {{ formattedDate }}
                </ion-label>
              </div>

              <hr class="mt-2 mb-1">

              <!-- Location -->
              <ion-item class="pl-0" lines="none">
                <ion-icon class="mr-2" color="secondary" name="location-sharp"></ion-icon>
                <ion-label class="font-bold text-xs">
                  {{ addressString }}
                </ion-label>
              </ion-item>

              <!-- Map -->
              <div
                class="h-2/3 mt-2 rounded-md w-full map-wrapper overflow-hidden ripple-parent cursor-pointer">
                <img v-if="width" :src="`https://maps.googleapis.com/maps/api/staticmap?key=${KEY}`
                                + `&markers=icon:https://storage.googleapis.com/csfn-public-assets/pin_cleanup.png|${activity.location.coords.lat},${activity.location.coords.lng}`
                                + `&zoom=11&size=${width}x${Math.ceil(width * 2 / 3)}`" class="absolute w-full h-full">
                <ion-ripple-effect></ion-ripple-effect>
              </div>

            </div>
            <div v-else class="ion-padding">
              <ion-skeleton-text animated></ion-skeleton-text>
              <div class="flex mt-3">
                <ion-skeleton-text animated class="w-1/3 rounded-full"></ion-skeleton-text>
                <ion-skeleton-text animated class="w-1/3 rounded-full ml-3"></ion-skeleton-text>
              </div>
              <ion-skeleton-text animated class="mt-3"></ion-skeleton-text>
              <ion-skeleton-text animated class="mt-3"></ion-skeleton-text>
              <ion-skeleton-text animated class="mt-3"></ion-skeleton-text>
              <div class="flex justify-between mt-3">
                <ion-skeleton-text animated class="w-1/3 rounded-full"></ion-skeleton-text>
                <ion-skeleton-text animated class="w-1/3 rounded-full"></ion-skeleton-text>
              </div>
              <hr class="my-4">
              <ion-skeleton-text animated></ion-skeleton-text>
              <ion-skeleton-text animated class="h-2/3 mt-3"></ion-skeleton-text>
            </div>
          </transition>
        </div>
      </ion-content>
    </ion-page>
  </page-transparent-header>
</template>
<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { userModule } from '@/store/userModule'
import User from '@/types/User'
import ModalPresenter from '@/tools/ModalPresenter'
import MapModal from '@/views/pages/home/community/CleanupsMapPage.vue'
import moment from 'moment'
import PicturesModal from '@/views/modals/PicturesModal.vue'
import TransparentHeader from '@/views/components/common/TransparentHeader.vue'
import { Ref } from 'vue-property-decorator'
import PageTransparentHeader from '@/views/components/common/PageTransparentHeader.vue'
import Cleanup from '@/types/Cleanup'
import { cleanupsModule } from '@/store/cleanupsModule'
import Image from '@/types/Image'
import { addressToString } from '@/tools/Utils'

@Component({
  name: 'cleanup-page',
  components: { PageTransparentHeader, TransparentHeader }
})
export default class ActivityPage extends Vue {

  KEY = process.env.VUE_APP_GOOGLE_API_KEY

  width = 0

  @Ref('activity-content')
  content: HTMLIonContentElement

  get activity(): Cleanup {
    return cleanupsModule.getCleanup
    //return cleanupsModule.getCleanup(this.$route.params.id)
  }

  get title(): string {
    return this.$t('cleanup-in') + ' ' + this.activity.location.address.city
    //return this.activity.type === ActivityType.event ? this.activity.title : `${this.$t(this.activity.type + '-in')} ${this.activity.location.address.city}`
  }

  get currentUser(): User {
    return userModule.getCurrentUser
  }

  get formattedDate() {
    return this.activity && moment(this.activity.date).format('D MMMM YYYY')
  }

  get addressString() {
    return addressToString(this.activity.location.address)
  }

  mounted() {
    cleanupsModule.fetchCleanup(Number(this.$route.params.id))
    setTimeout(() => {
      this.width = window.innerWidth
    })
  }

  openMap() {
    ModalPresenter.present(this.$ionic, MapModal, {
      title: this.title,
      origin: this.activity.location.coords,
      pin: '/img/cleanup_pin.png'
    })
  }

  openPictures(selected) {
    ModalPresenter.present(this.$ionic, PicturesModal, {
      pictures: (this.activity.pictures as Image[]).map(({ publicUrl }) => publicUrl),
      selected
    })
  }

  edit() {
    return
  }

  onScroll(event) {
    (this.$refs['page'] as any).scrolled(event)
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
  width: 100%;
}

ion-item.pl-0 {
  --padding-start: 0;
}

.map-wrapper {
  background-color: var(--ion-color-light);
}

.map-wrapper > img {
  object-fit: cover;
  object-position: center center;
}
</style>
