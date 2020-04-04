<template>
  <ion-card class="placeholder-card ion-activatable ripple-parent" mode="ios" button>
    <div class="placeholder-card__image">
      <img src="/img/placeholder.png" class="opacity-25">
    </div>
    <ion-card-content>
      <div class="flex justify-between items-center mt-3 mb-4">
        <ion-skeleton-text animated style="width: 30%"></ion-skeleton-text>
        <ion-skeleton-text animated style="width: 40%"></ion-skeleton-text>
      </div>
      <div class="mb-4">
        <ion-skeleton-text animated style="width: 100%"></ion-skeleton-text>
        <ion-skeleton-text animated style="width: 100%"></ion-skeleton-text>
        <ion-skeleton-text animated style="width: 100%"></ion-skeleton-text>
      </div>
      <ion-skeleton-text animated class="mb-3" style="width: 100%"></ion-skeleton-text>
    </ion-card-content>
    <ion-ripple-effect></ion-ripple-effect>
  </ion-card>
</template>
<script lang="ts">
  import Vue from 'vue'
  import Component from 'vue-class-component'

  @Component({
    name: 'placeholder-card'
  })
  export default class PlaceholderCard extends Vue {

  }
</script>
<style>
  .placeholder-card__image {
    position: relative;
  }

  .placeholder-card__image > img {
    position: absolute;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center center;
  }

  .placeholder-card__image:after {
    content: '';
    padding-top: 66%;
    display: block;
  }
</style>
