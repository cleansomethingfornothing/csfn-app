<template>
  <div class="lg:w-2/3 xl:w-1/2 m-auto pb-4 cards flex flex-col justify-between relative">
    <div class="bg-white w-full h-32 absolute mt-8">

    </div>
    <div v-if="!cleanups" class="mt-8 py-20 bg-white z-50 w-full">
      <ion-spinner color="primary" class="w-12 h-12"></ion-spinner>
    </div>

    <div class="relative">
      <transition-group name="fade" tag="div">
        <cleanup-card :distance="calcDistance(cleanup.location.coords)" @click="click(cleanup.id)"></cleanup-card>
      </transition-group>
    </div>
  </div>
</template>
<script lang=ts>
import Vue from 'vue'
import Component from 'vue-class-component'
import { Emit, Prop } from 'vue-property-decorator'
import PlaceholderCard from '@/views/components/home/PlaceholderCard.vue'
import CleanupCard from '@/views/components/home/CleanupCard.vue'
import Coords from '@/types/Coords'
import Cleanup from '@/types/Cleanup'
import { calculateDistance } from '@/tools/Utils'

@Component({
  name: 'cleanups-list',
  components: { CleanupCard: CleanupCard, PlaceholderCard: PlaceholderCard }
})
export default class HomeCleanupsList extends Vue {

  @Prop(Object)
  coords: Coords

  @Prop(Object)
  cleanups: { [id: string]: Cleanup }

  calcDistance(cleanupCoords: Coords) {
    return this.coords ? Math.round(calculateDistance(this.coords, cleanupCoords)) : 0
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
