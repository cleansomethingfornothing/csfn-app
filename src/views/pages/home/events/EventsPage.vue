<template>
  <page-transparent-header ref="page" :content="content">
    <ion-page class="ion-page">
      <transparent-header :no-back="true" :no-gradient="true" :title="$t('events')"/>

      <ion-content ref="events-content" :scroll-events="true" class="fullscreen " color="white"
                   @ionScroll="$refs['page'].scrolled($event)">
        <home-header :num="4">
          <div class="h-toolbar-top sm:ios:mb-2"></div>
          <div class="flex flex-col h-full pt-20 relative">
            <img src="@/assets/img/empty/events.png" class="absolute -mt-18"/>
            <!--
            <div class="w-48 absolute" style="top: 40px; left: 10px">
              <img src="@/assets/img/empty/events.png"/>
            </div>
            -->
            <!--
            <div class="rounded-full overflow-hidden shadow ion-activatable relative z-10"
                 style="margin-top: 15%">
                <ion-item>
                    <ion-icon slot="start" color="secondary" name="location-sharp"></ion-icon>
                    <ion-label>{{ address }}</ion-label>
                </ion-item>
                <ion-ripple-effect></ion-ripple-effect>
            </div>
            -->
          </div>
        </home-header>

        <div class="mt-2 mb-2 w-1/3 mx-auto">
          <img src="@/assets/img/icons/wip.svg" style="opacity: 0.15"/>
        </div>
        <span class="font-bold text-xl capitalize opacity-75">{{ $t('coming-soon') }}</span>
        <div class="p-4 opacity-75 text-sm">{{ $t('no-events-more') }}</div>
        <div class="pt-20"></div>

        <div class="pt-20"></div>
      </ion-content>
    </ion-page>
  </page-transparent-header>
</template>
<script lang=ts>
import Vue from 'vue'
import Component from 'vue-class-component'
import TransparentHeader from '@/views/components/common/TransparentHeader.vue'
import Wave from '@/views/components/common/Wave.vue'
import { locationModule } from '@/store/locationModule'
import CleanupsList from '@/views/components/home/CleanupsList.vue'
import { Ref } from 'vue-property-decorator'
import PageTransparentHeader from '@/views/components/common/PageTransparentHeader.vue'
import PlaceholderCard from '@/views/components/home/PlaceholderCard.vue'
import { addressToString } from '@/tools/Utils'
import HomeHeader from '@/views/components/home/HomeHeader.vue'

@Component({
  name: 'events-page',
  components: { HomeHeader, PlaceholderCard, PageTransparentHeader, CleanupsList, Wave, TransparentHeader }
})
export default class EventsPage extends Vue {

  @Ref('events-content')
  content: HTMLIonContentElement

  get events() {
    return []
    //return cleanupsModule.getEvents
  }

  get address() {
    return locationModule.getAddress ? addressToString(locationModule.getAddress) : ''
  }

  get coords() {
    return locationModule.getCoords
  }

  init() {
    //cleanupsModule.fetch()
  }

  exit() {
    return
  }

}
</script>
<style scoped>

</style>
