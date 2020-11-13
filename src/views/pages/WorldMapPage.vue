<template>
  <ion-page>
    <ion-header mode="ios">
      <ion-toolbar mode="ios" ref="toolbar">
        <ion-buttons slot="start">
          <ion-button shape="round" color="dark" fill="clear" @click="$router.back()">
            <ion-icon name="arrow-back"></ion-icon>
          </ion-button>
        </ion-buttons>
        <ion-title class="lg:text-lg xl:text-xl">{{ $t('world-map') }}</ion-title>
      </ion-toolbar>
    </ion-header>
  </ion-page>
</template>
<script lang="ts">
import {Component, Vue} from 'vue-property-decorator'

@Component({
  name: 'world-map-page'
})
export default class WorldMapPage extends Vue {
}
</script>
<style scoped>

</style>
