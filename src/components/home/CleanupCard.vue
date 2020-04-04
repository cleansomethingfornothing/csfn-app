<template>
  <ion-card class="cleanup-card" mode="ios">
    <img :src="cleanup.afterPictures[0] || cleanup.beforePictures[0]">
    <ion-card-header>
      <ion-card-subtitle>Card Subtitle</ion-card-subtitle>
      <ion-card-title>Card Title</ion-card-title>
    </ion-card-header>

    <ion-card-content>
      Keep close to Nature's heart... and break clear away, once in awhile,
      and climb a mountain or spend a week in the woods. Wash your spirit clean.
    </ion-card-content>
  </ion-card>
</template>
<script lang="ts">
  import Vue from 'vue'
  import Component from 'vue-class-component'
  import {Prop} from 'vue-property-decorator'
  import Cleanup from '@/types/Cleanup'

  @Component({
    name: 'cleanup-card'
  })
  export default class CleanupCard extends Vue {

    @Prop(Object)
    cleanup: Cleanup

  }
</script>
<style>
  .cleanup-card + .cleanup-card {
    margin-top: 0.5em;
  }
</style>
