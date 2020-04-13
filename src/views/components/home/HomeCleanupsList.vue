<template>
  <div class="lg:w-2/3 xl:w-1/2 m-auto pb-4 cards min-h-screen flex flex-col justify-between">
    <placeholder-card v-if="!Object.keys(cleanups).length"></placeholder-card>

    <cleanup-card v-else v-for="cleanup in cleanups" :key="cleanup.id" :cleanup="cleanup"
                  @click="click(cleanup.id)"></cleanup-card>

    <ion-label size="small" color="medium" class="title ml-4">
      © Clean something for nothing {{new Date().getFullYear()}}
    </ion-label>
  </div>
</template>
<script lang=ts>
  import Vue from 'vue'
  import Component from 'vue-class-component'
  import {Emit, Prop} from 'vue-property-decorator'
  import Cleanup from '@/types/Cleanup'
  import HomePlaceholderCard from '@/views/components/home/HomePlaceholderCard.vue'
  import HomeCleanupCard from '@/views/components/home/HomeCleanupCard.vue'

  @Component({
    name: "HomeCleanupsList",
    components: {CleanupCard: HomeCleanupCard, PlaceholderCard: HomePlaceholderCard}
  })
  export default class HomeCleanupsList extends Vue {

    @Prop(Object)
    cleanups: { [id: string]: Cleanup }

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
