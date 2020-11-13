<template>
  <div class="flex items-center justify-end text-4xl">
    <div v-for="(digit, i) in digits" :key="i">
      <digit-display v-if="!isNaN(digit)" :digit="digit" class="ml-1"></digit-display>
      <span v-else class="text-4xl text-white ml-1 -mt-4">{{ digit }}</span>
    </div>
  </div>
</template>
<script lang=ts>
import Vue from 'vue'
import Component from 'vue-class-component'
import {Prop} from 'vue-property-decorator'
import DigitDisplay from '@/views/components/community/DigitDisplay.vue'

@Component({
  name: "NumberDisplay",
  components: {DigitDisplay}
})
export default class NumberDisplay extends Vue {
  @Prop(Number)
  number: number

  get digits() {
    return new Intl.NumberFormat().format(this.number).split('')
  }
}
</script>
<style scoped>
</style>
