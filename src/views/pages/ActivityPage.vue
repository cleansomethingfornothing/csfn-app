import {ActivityType} from '@/types/ActivityType'
<template>
  <page-transparent-header ref="page">
    <ion-page class="ion-page">
      <transparent-header>
        <template slot="end-buttons">
          <ion-button shape="round" fill="clear"
                      v-if="activity && activity.user.username === currentUser.username">
            <ion-icon name="create"></ion-icon>
          </ion-button>
        </template>
      </transparent-header>

      <ion-content class="fullscreen" color="lighter" :fullscreen="true" :scroll-events="true"
                   @ionScroll="$refs['page'].scrolled($event)" ref="cleanup-content">
        <div class="lg:w-2/3 xl:w-1/2 m-auto bg-white lg:rounded-lg lg:my-16 overflow-hidden lg:shadow-lg">

          <!-- Pictures -->
          <div class="cleanup-page__picture h-2/3 cursor-pointer">
            <ion-slides pager="true" v-if="activity" class="absolute h-full w-full">
              <ion-slide v-for="(picture, i) in activity.pictures" :key="i" @click="openPictures(i)">
                <img alt="Cleanup picture" :src="picture" class="absolute w-full h-full">
              </ion-slide>
            </ion-slides>
          </div>

          <div class="ion-padding">
            <!-- Title -->
            <ion-skeleton-text v-if="!activity" animated style="width: 70%"></ion-skeleton-text>
            <ion-label v-else class="text-xl font-bold">
              {{title}}
            </ion-label>
            <hr class="my-3" v-if="!activity || activity.done">

            <!-- Weight -->
            <ion-skeleton-text v-if="!activity" animated style="width: 50%"></ion-skeleton-text>
            <div v-if="activity && activity.done" class="flex items-center">
              <img src="@/assets/img/icons/cleanup-done.svg" class="w-6 mr-2">
              <ion-label color="dark" class="text-md">{{$t('cleaned-weight', {param: activity.weight})}}
              </ion-label>
            </div>
            <hr class="my-3" v-if="!activity || activity.done">
            <div v-else class="mt-2"></div>

            <!-- Description -->
            <div v-if="!activity">
              <ion-skeleton-text animated style="width: 100%"></ion-skeleton-text>
              <ion-skeleton-text animated style="width: 100%"></ion-skeleton-text>
              <ion-skeleton-text animated style="width: 100%"></ion-skeleton-text>
            </div>
            <ion-text v-else>{{activity.description}}</ion-text>
            <br>
            <ion-skeleton-text v-if="!activity" class="mb-3 mt-2" animated style="width: 30%"></ion-skeleton-text>
            <ion-chip v-else class="-ml-1 mt-4" color="dark" @click="$router.push('/user/' + activity.user.username)">
              <ion-avatar>
                <img :src="activity.user.picture">
              </ion-avatar>
              <ion-label class="mr-2">{{activity.user.username}}</ion-label>
            </ion-chip>

            <hr class="mt-3 mb-1">

            <!-- Date-->
            <ion-skeleton-text v-if="!activity" class="mb-3 mt-2" animated style="width: 60%"></ion-skeleton-text>
            <ion-item v-else class="pl-0" lines="none">
              <ion-icon name="calendar" color="dark" class="mr-2"></ion-icon>
              <ion-label color="dark">
                {{$t('published-on')}} {{formattedDate}}
              </ion-label>
            </ion-item>

            <hr class="mt-1 mb-1">

            <!-- Location -->
            <ion-skeleton-text class="my-4" v-if="!activity" animated style="width: 60%"></ion-skeleton-text>
            <ion-item v-else class="pl-0" lines="none">
              <ion-icon name="location" color="primary" class="mr-2"></ion-icon>
              <ion-label class="font-bold">{{activity.location.address.city}}, {{activity.location.address.state}},
                {{activity.location.address.country}}
              </ion-label>
            </ion-item>

            <!-- Map -->
            <div class="h-2/3 mt-2 rounded-md w-full map-wrapper overflow-hidden ripple-parent cursor-pointer"
                 @click="openMap">
              <img v-if="activity && width" class="absolute w-full h-full" :src="`https://maps.googleapis.com/maps/api/staticmap?key=${KEY}`
            + `&markers=color:0x${activity.done ? '9ed362': 'd32f2f'}|${activity.location.coords.lat},${activity.location.coords.lng}`
            + `&zoom=10&size=${width}x${Math.ceil(width * 2 / 3)}`">
              <ion-ripple-effect></ion-ripple-effect>
            </div>

          </div>
        </div>
      </ion-content>
    </ion-page>
  </page-transparent-header>
</template>
<script lang="ts">
  import Vue from 'vue'
  import Component from 'vue-class-component'
  import {cleanupsModule} from '@/store/activitiesModule'
  import {userModule} from '@/store/userModule'
  import Activity from '@/types/Activity'
  import User from '@/types/User'
  import ModalPresenter from '@/tools/ModalPresenter'
  import MapModal from '@/views/modals/MapModal.vue'
  import moment from 'moment'
  import PicturesModal from '@/views/modals/PicturesModal.vue'
  import TransparentHeader from '@/views/components/common/TransparentHeader.vue'
  import {Ref} from 'vue-property-decorator'
  import PageTransparentHeader from '@/views/components/common/PageTransparentHeader.vue'
  import {ActivityType} from '@/types/ActivityType'

  @Component({
    name: 'cleanup-page',
    components: {PageTransparentHeader, TransparentHeader}
  })
  export default class ActivityPage extends Vue {

    KEY = process.env.VUE_APP_GOOGLE_API_KEY

    width = 0

    @Ref('activity-content')
    content: HTMLIonContentElement

    get activity(): Activity {
      return cleanupsModule.getCleanup(this.$route.params.id)
    }

    get title(): string {
      return this.activity.type === ActivityType.event ? this.activity.title : `${this.$t(this.activity.type + '-in')} ${this.activity.location.address.city}`
    }

    get currentUser(): User {
      return userModule.getCurrentUser
    }

    get formattedDate() {
      return this.activity && moment(this.activity.date).format('D MMMM YYYY')
    }

    mounted() {
      cleanupsModule.fetchOne(this.$route.params.id)
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
      ModalPresenter.present(this.$ionic, PicturesModal, {pictures: this.activity.pictures, selected})
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
