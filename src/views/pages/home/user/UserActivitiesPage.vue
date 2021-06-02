<template>
  <ion-page v-if="type" class="ion-page">
    <ion-header mode="ios">
      <ion-toolbar mode="ios">
        <ion-buttons slot="start">
          <ion-button @click="$router.back()">
            <ion-icon slot="icon-only" color="dark" name="arrow-back"/>
          </ion-button>
        </ion-buttons>
        <ion-title>{{ this.$t(this.activityType.title) }}</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content color="light">
      <div v-if="loading" class="flex justify-center p-8 absolute top-0 w-full">
        <ion-spinner class="w-12 h-12" color="primary"/>
      </div>
      <div v-if="!loading && !activities.length"
           class="flex flex-col items-center justify-center p-8 text-center">
        <img :src="activityType.placeholder.image" class="w-3/4 mt-4 mb-8"/>
        <span>{{ this.$t(this.activityType.placeholder.text) }}</span>
        <ion-button :class="{'opacity-75': type !== 'cleanup'}" class="mt-4" shape="round"
                    @click="type === 'cleanup' && $router.push('/edit-' + type)">
          {{ this.$t(this.activityType.placeholder.button) }}
        </ion-button>
      </div>
      <ion-list v-else class="p-0 bg-transparent" lines="none">
        <ion-item v-for="activity in activities" :key="activity.id" button class="p-0 m-2"
                  @click="open(activity.id)">
          <ion-thumbnail slot="start" class="w-24 h-24 m-2">
            <img :src="activity.pictures[0].publicUrl" class="h-full"/>
          </ion-thumbnail>
          <ion-label class="m-0">
            <p class="font-bold pl-2">{{ title(activity) }}</p>
            <p class="pl-2">{{ activity.description }}</p>
            <div class="ion-text-wrap">
              <ion-chip v-if="activity.volume" color="secondary">
                <ion-icon :src="require('@/assets/img/icons/bag.svg')" class="mr-1 text-sm"/>
                {{ activity.volume }} {{ $t('liters') }}
              </ion-chip>
              <ion-chip v-if="activity.weight" color="secondary">
                <ion-icon :src="require('@/assets/img/icons/scale.svg')" class="mr-1 text-sm"/>
                {{ activity.weight | localeString }} {{ $t('kilos') }}
              </ion-chip>
            </div>
          </ion-label>
        </ion-item>
      </ion-list>
    </ion-content>
  </ion-page>
</template>
<script lang=ts>
import Vue from 'vue'
import Component from 'vue-class-component'
import { userModule } from '@/store/userModule'
import Cleanup from '@/types/Cleanup'
import { Activity } from '@/types/Activity'
import { Prop } from 'vue-property-decorator'

@Component({
  name: 'user-activities-page'
})
export default class UserActivitiesPage extends Vue {

  activityTypes = {
    cleanup: {
      title: 'cleanups',
      sing: 'cleanup',
      placeholder: {
        text: 'no-cleanups',
        image: require(`@/assets/img/empty/cleanup_woman.png`),
        button: 'publish-cleanup'
      }
    },
    alert: {
      title: 'alerts',
      sing: 'alert',
      placeholder: {
        text: 'no-alerts',
        image: require('@/assets/img/empty/alerts_wip.png'),
        button: 'coming-soon'
      }
    },
    event: {
      title: 'events',
      sing: 'event',
      placeholder: {
        text: 'no-events',
        image: require('@/assets/img/empty/events_wip.png'),
        button: 'coming-soon'
      }
    }
  }

  @Prop(String)
  type!: string

  get loading() {
    return userModule.loadingUserActivities
  }

  get activities(): Activity[] {
    switch (this.type) {
      case 'cleanup':
        return userModule.getCurrentUserCleanups
      default:
        return []
    }
  }

  get fetchMethod() {
    switch (this.type) {
      case 'cleanup':
        return userModule.fetchCurrentUserCleanups
      default:
        return null
    }
  }

  get activityType() {
    return this.type && this.activityTypes[this.type]
  }

  mounted() {
    this.fetchMethod?.apply(userModule)
  }

  title(activity) {
    return this.$t('cleanup-in') + ' ' + (activity as Cleanup).location.address.city
  }

  open(activityId: number) {
    this.$router.push('/cleanup/' + activityId)
  }
}
</script>
<style scoped>

</style>
