<template>
  <ion-page v-if="type" class="ion-page">
    <ion-header mode="ios">
      <ion-toolbar mode="ios">
        <ion-buttons slot="start">
          <ion-button @click="$router.back()">
            <ion-icon slot="icon-only" name="arrow-back"/>
          </ion-button>
        </ion-buttons>
        <ion-title>{{ this.$t(this.activityType.title) }}</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content color="light">
      <div v-if="!activities.length" class="flex flex-col items-center justify-center p-8 text-center">
        <img class="w-3/4 mt-4" :src="activityType.placeholder.image"/>
        <span class="mt-8">{{ this.$t(this.activityType.placeholder.text) }}</span>
        <ion-button shape="round" class="mt-4" @click="$router.push('/publish?type=' + activityType.sing)">
          {{ this.$t(this.activityType.placeholder.button) }}
        </ion-button>
      </div>
    </ion-content>
  </ion-page>
</template>
<script lang=ts>
import Vue from 'vue'
import Component from 'vue-class-component'

@Component({
  name: "user-activities-page"
})
export default class UserActivitiesPage extends Vue {

  activityTypes = {
    cleanups: {
      title: 'cleanups',
      sing: 'cleanup',
      placeholder: {
        text: 'no-cleanups',
        image: require(`@/assets/img/empty/cleanups_woman.png`),
        button: 'publish-cleanup'
      }
    },
    alerts: {
      title: 'alerts',
      sing: 'alert',
      placeholder: {
        text: 'no-alerts',
        image: require('@/assets/img/empty/alerts.png'),
        button: 'publish-alert'
      }
    },
    events: {
      title: 'events',
      sing: 'event',
      placeholder: {
        text: 'no-events',
        image: require('@/assets/img/empty/events.png'),
        button: 'create-event'
      }
    }
  }

  type = null

  activities = []

  get activityType() {
    return this.type && this.activityTypes[this.type]
  }

  created() {
    this.type = this.$route.query.type
  }

}
</script>
<style scoped>

</style>
