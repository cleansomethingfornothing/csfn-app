<template>
  <ion-card class="cleanup-card ion-activatable ripple-parent text-left" mode="ios" @click="click" button color="white">
    <div class="cleanup-card__image">
      <img :src="cleanup.pictures[0]">
    </div>
    <ion-card-content>
      <ion-label v-if="cleanup.type !== 'event'" class="text-lg font-bold">{{$t(cleanup.done ? 'cleanup-in' : 'alert-in')}}
        {{cleanup.location.address.city}}
      </ion-label>
      <ion-label v-else class="text-lg font-bold">{{cleanup.title}}</ion-label>
      <br>
      <ion-label color="medium" class="text-xs font-bold">{{distance}} Km</ion-label>
      <ion-text class="cleanup-card__description mt-1">
        {{cleanup.description}}
      </ion-text>
      <div v-if="cleanup.type === 'event'" class="mt-4">
        <progress-bar :value="random"/>
      </div>
      <div class="flex justify-between items-baseline" v-else>
        <ion-chip class="-ml-1 mt-2" color="dark"
                  @click="$router.push({name: 'User', params:{ id: cleanup.user.username}})">
          <ion-avatar>
            <img :src="cleanup.user.picture">
          </ion-avatar>
          <ion-label class="mr-2">{{cleanup.user.username}}</ion-label>
        </ion-chip>
        <ion-label color="medium" class="text-xs font-bold">{{formattedDate}}</ion-label>
      </div>
    </ion-card-content>
    <ion-ripple-effect></ion-ripple-effect>
  </ion-card>
</template>
<script lang="ts">
  import Vue from 'vue'
  import Component from 'vue-class-component'
  import {Emit, Prop} from 'vue-property-decorator'
  import Activity from '@/types/Activity'
  import moment from 'moment'
  import ProgressBar from '@/views/components/user/ProgressBar.vue'
  import _ from 'lodash'

  @Component({
    name: 'cleanup-card',
    components: {ProgressBar}
  })
  export default class CleanupCard extends Vue {

    @Prop(Object)
    cleanup: Activity

    @Prop(Number)
    distance: number

    get formattedDate() {
      if (!this.cleanup)
        return undefined
      const s = moment(this.cleanup.date).fromNow()
      return s.charAt(0).toUpperCase() + s.slice(1)
    }

    get random(){
      return _.random(30, 90)
    }

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

  .cleanup-card ion-title {
    font-size: smaller;
  }

  .cleanup-card ion-item {
    --padding-start: 0;
  }

  .cleanup-card__image {
    background-color: #eee;
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
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
  }
</style>
