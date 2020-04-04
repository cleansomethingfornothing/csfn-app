<template>
  <ion-card class="cleanup-card ion-activatable ripple-parent" mode="ios" @click="click" button>
    <div class="cleanup-card__image">
      <img :src="cleanup.afterPictures[0] || cleanup.beforePictures[0]">
    </div>
    <ion-card-content>
      <div class="flex justify-between items-center">
        <ion-label class="text-sm">{{cleanup.user.userName}}</ion-label>
        <ion-item class="text-sm pl-0" lines="none">
          <ion-icon name="calendar" slot="start" class="text-lg mr-2" color="dark"></ion-icon>
          <ion-label color="dark" class="my-1">{{cleanup.date.toLocaleDateString()}}
          </ion-label>
        </ion-item>
      </div>
      <div class="cleanup-card__description">
        {{cleanup.description}}
      </div>
      <ion-item class="text-sm pl-0" lines="none">
        <ion-icon name="location" slot="start" class="text-lg mr-2" color="primary"></ion-icon>
        <ion-label color="dark">{{cleanup.location.address.city}}, {{cleanup.location.address.country}}
        </ion-label>
      </ion-item>
    </ion-card-content>
    <ion-ripple-effect></ion-ripple-effect>
  </ion-card>
</template>
<script lang="ts">
  import Vue from 'vue'
  import Component from 'vue-class-component'
  import {Emit, Prop} from 'vue-property-decorator'
  import Cleanup from '@/types/Cleanup'

  @Component({
    name: 'cleanup-card'
  })
  export default class CleanupCard extends Vue {

    @Prop(Object)
    cleanup: Cleanup

    @Emit('click')
    click() {
      return
    }
  }
</script>
<style>
  .cleanup-card + .cleanup-card {
    margin-top: 0.5em;
  }

  .cleanup-card ion-item {
    --padding-start: 0;
  }

  .cleanup-card__image {
    position: relative;
  }

  .cleanup-card__image:after {
    content: '';
    padding-top: 66%;
    display: block;
  }

  .cleanup-card__image > img {
    position: absolute;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center center;
  }

  .cleanup-card__description {
    color: var(--ion-text-color);
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
  }
</style>
