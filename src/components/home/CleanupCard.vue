<template>
  <ion-card class="cleanup-card" mode="ios">
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
<script>
  import Vue from 'vue'
  import Component from 'vue-class-component'

  @Component({
    name: 'cleanup-card'
  })
  export default class CleanupCard extends Vue {
  }
</script>
<style>
  .cleanup-card + .cleanup-card {
    margin-top: 0.5em;
  }
</style>
