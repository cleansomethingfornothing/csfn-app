<template>
  <ion-card class="cleanup-card ion-activatable ripple-parent m-3" mode="ios" @click="click" button color="white">
    <div class="flex h-1/2">
      <img class="w-1/2 h-full absolute object-center object-cover" :src="cleanup.pictures[0]" style="width: 50%">
      <img class="w-1/2 h-full absolute object-center object-cover" :src="cleanup.pictures[1]"
           style="width: 50%; left: 50%">
    </div>
    <ion-card-content class="p-0">
      <div class="p-2 flex flex-col justify-between">
        <ion-label class="text-sm md:text-xl font-bold">{{$t(cleanup.done ? 'cleanup-in' : 'alert-in')}}
          {{cleanup.location.address.city}}
        </ion-label>
        <div class="map-card__description mt-1">
          {{cleanup.description}}
        </div>
        <div class="flex justify-between items-baseline mt-1">
          <ion-chip class="-ml-1 mt-2" color="dark">
            <ion-avatar>
              <img :src="cleanup.user.picture">
            </ion-avatar>
            <ion-label class="mr-2">{{cleanup.user.username}}</ion-label>
          </ion-chip>
          <ion-label color="medium" class="text-xs font-bold">{{formattedDate}}</ion-label>
        </div>
      </div>
    </ion-card-content>
    <ion-ripple-effect></ion-ripple-effect>
  </ion-card>
</template>
<script lang=ts>
  import Vue from 'vue'
  import Component from 'vue-class-component'
  import {Emit, Prop} from 'vue-property-decorator'
  import Activity from '@/types/Activity'
  import moment from 'moment'

  @Component({
    name: 'map-cleanup-card'
  })
  export default class MapCleanupCard extends Vue {
    @Prop(Object)
    cleanup: Activity

    get formattedDate() {
      if (!this.cleanup)
        return undefined
      const s = moment(this.cleanup.date).fromNow()
      return s.charAt(0).toUpperCase() + s.slice(1)
    }

    @Emit('click')
    click() {
      return
    }
  }
</script>
<style>
  .map-card__description {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
  }
</style>
