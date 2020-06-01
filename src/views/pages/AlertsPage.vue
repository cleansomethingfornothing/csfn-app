<template>
  <page-transparent-header :content="content" ref="page">
    <ion-page>
      <transparent-header :title="$t('alerts')" :no-back="true" :no-gradient="true"></transparent-header>

      <ion-content ref="alerts-content" class="fullscreen " :scroll-events="true" color="white"
                   @ionScroll="$refs['page'].scrolled($event)">
        <div class="flex flex-col bg-poly bg-poly-3 h-64 lg:h-88 ios:h-60 sm:ios:h-64 lg:ios:h-72 xl:ios:h-88">
          <div class="h-toolbar-top sm:ios:mb-2"></div>
          <div class="flex flex-col h-full p-4 pt-16">
            <ion-label color="white" class="text-left mb-2">Las <b>alertas</b> indican zonas con gran concentración de basura.</ion-label>
            <!--
            <ion-button color="white" shape="round">
              <ion-label color="primary" class="font-bold">Publicar alerta</ion-label>
            </ion-button>
            -->
          </div>
        </div>
        <div class="-mt-24 lg:-mt-32 xl:-mt-40 -mb-16 pt-4 sm:ios:pt-8">
          <div style="padding-top: 5px"></div>
          <wave :num="3"/>
        </div>

        <placeholder-card></placeholder-card>
        <placeholder-card></placeholder-card>
        <placeholder-card></placeholder-card>

        <div class="pt-16"></div>
        <!--
        <ion-fab vertical="bottom" horizontal="end" slot="fixed" class="fab-gradient">
          <ion-fab-button color="white">
            <ion-icon size="large" :src="require('@/assets/img/icons/exclamation.svg')"></ion-icon>
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
  import Wave from '@/views/components/common/Wave.vue'
  import TransparentHeader from '@/views/components/common/TransparentHeader.vue'
  import {cleanupsModule} from '@/store/activitiesModule'
  import CleanupsList from '@/views/components/home/CleanupsList.vue'
  import {locationModule} from '@/store/locationModule'
  import {Ref} from 'vue-property-decorator'
  import PageTransparentHeader from '@/views/components/common/PageTransparentHeader.vue'
  import PlaceholderCard from '@/views/components/home/PlaceholderCard.vue'

  @Component({
    name: "alerts-page",
    components: {PlaceholderCard, PageTransparentHeader, CleanupsList, TransparentHeader, Wave}
  })
  export default class AlertsPage extends Vue {

    @Ref('alerts-content')
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
