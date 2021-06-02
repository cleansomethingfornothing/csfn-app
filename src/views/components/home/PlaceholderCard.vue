<template>
  <ion-card button class="placeholder-card ion-activatable ripple-parent" color="white" mode="ios">
    <div class="placeholder-card__image"></div>
    <ion-card-content>
      <ion-skeleton-text animated style="width: 50%"></ion-skeleton-text>
      <ion-skeleton-text animated class="mt-2" style="width: 30%"></ion-skeleton-text>
      <div class="my-4">
        <ion-skeleton-text animated style="width: 100%"></ion-skeleton-text>
        <ion-skeleton-text animated style="width: 100%"></ion-skeleton-text>
        <ion-skeleton-text animated style="width: 100%"></ion-skeleton-text>
      </div>
      <ion-skeleton-text animated style="width: 100%"></ion-skeleton-text>
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
  background-color: #eee;
  position: relative;
}

.placeholder-card__image > img {
  height: 100%;
  object-fit: cover;
  object-position: center center;
  position: absolute;
  width: 100%;
}

.placeholder-card__image:after {
  content: '';
  display: block;
  padding-top: 66%;
}
</style>
