<template>
  <div class="lg:w-2/3 xl:w-1/2 m-auto pb-4 cards flex flex-col justify-between">
    <placeholder-card v-if="cleanups === null"></placeholder-card>

    <cleanup-card v-else v-for="cleanup in cleanups" :key="cleanup.id" :cleanup="cleanup"
                  :distance="calcDistance(cleanup.location.coords)" @click="click(cleanup.id)"></cleanup-card>
  </div>
</template>
<script lang=ts>
  import Vue from 'vue'
  import Component from 'vue-class-component'
  import {Emit, Prop} from 'vue-property-decorator'
  import Cleanup from '@/types/Cleanup'
  import PlaceholderCard from '@/views/components/home/PlaceholderCard.vue'
  import CleanupCard from '@/views/components/home/CleanupCard.vue'
  import Coords from '@/types/Coords'
  import {locationProvider} from '@/providers/location/location.provider'

  @Component({
    name: "cleanups-list",
    components: {CleanupCard: CleanupCard, PlaceholderCard: PlaceholderCard}
  })
  export default class HomeCleanupsList extends Vue {

    @Prop(Object)
    coords: Coords

    @Prop(Object)
    cleanups: { [id: string]: Cleanup }

    calcDistance(cleanupCoords: Coords) {
      return Math.round(locationProvider.calculateDistance(this.coords, cleanupCoords))
    }

    @Emit('click')
    click(id) {
      return id
    }
  }
</script>
<style>
  ion-refresher ion-refresher-content {
    background-color: var(--ion-color-lighter);
    --color: var(--ion-color-primary) !important;
  }
</style>
