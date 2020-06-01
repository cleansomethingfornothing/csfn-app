<template>
  <page-transparent-header :content="content" ref="page">
    <ion-page>
      <transparent-header :title="$t('events')" :no-back="true" :no-gradient="true"/>

      <ion-content ref="events-content" class="fullscreen " :scroll-events="true" color="white"
                   @ionScroll="$refs['page'].scrolled($event)">
        <div class="p-4 lg:p-24 pt-24 bg-poly bg-poly-4 h-64 lg:h-88 ios:h-60 sm:ios:h-64 lg:ios:h-72 xl:ios:h-88">
        </div>
        <div class="-mt-24 pt-3 lg:-mt-32 xl:-mt-40 z-10 -mb-16 sm:ios:pt-4">
          <div class="sm:ios:pt-3"></div>
          <wave :num="4"/>
        </div>

        <placeholder-card></placeholder-card>

        <!--
        <ion-fab vertical="bottom" horizontal="end" slot="fixed" class="fab-gradient">
          <ion-fab-button color="white">
            <ion-icon size="large" :src="require('@/assets/img/icons/flag.svg')"></ion-icon>
          </ion-fab-button>
        </ion-fab>
        -->

      </ion-content>
    </ion-page>
  </page-transparent-header>
</template>
<script lang=ts>
  import Vue from 'vue'
  import Component from 'vue-class-component'
  import TransparentHeader from '@/views/components/common/TransparentHeader.vue'
  import Wave from '@/views/components/common/Wave.vue'
  import {cleanupsModule} from '@/store/activitiesModule'
  import {locationModule} from '@/store/locationModule'
  import CleanupsList from '@/views/components/home/CleanupsList.vue'
  import {Ref} from 'vue-property-decorator'
  import PageTransparentHeader from '@/views/components/common/PageTransparentHeader.vue'
  import PlaceholderCard from '@/views/components/home/PlaceholderCard.vue'

  @Component({
    name: "events-page",
    components: {PlaceholderCard, PageTransparentHeader, CleanupsList, Wave, TransparentHeader}
  })
  export default class EventsPage extends Vue {

    @Ref('events-content')
    content: HTMLIonContentElement

    get cleanups() {
      return cleanupsModule.getCleanups
    }

    get coords() {
      return locationModule.getCoords
    }

    init() {
      cleanupsModule.fetch()
    }

    exit() {
      return
    }

  }
</script>
<style scoped>

</style>
