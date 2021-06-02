<template>
  <div>
    <!--<div class=" flex flex-col bg-poly bg-poly-4 h-64 lg:h-88 ios:h-60 sm:ios:h-64 lg:ios:h-72 xl:ios:h-88">
    class="p-4 lg:p-16 bg-poly bg-poly-2 h-64 lg:h-88 ios:h-60 sm:ios:h-64 lg:ios:h-72 xl:ios:p-24 xl:ios:h-88 flex flex-col">
    -->
    <div :class="`pb-12 bg-poly bg-poly-${num} h-72 lg:h-88 ios:h-72 sm:ios:h-72 lg:ios:h-72 xl:ios:h-88 relative`">
      <div class="px-4 lg:px-16 flex flex-col h-full">
        <slot/>
      </div>
      <wave :num="num"/>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { Prop } from 'vue-property-decorator'
import HomeHeaderButton from '@/views/components/home/HomeHeaderButton.vue'
import Wave from '@/views/components/common/Wave.vue'

@Component({
  name: 'home-header',
  components: { Wave, HomeHeaderButton }
})
export default class HomeHeader extends Vue {
  @Prop(Number)
  readonly num!: number
}
</script>
