<template>
  <div class="digit-display bg-white rounded w-6 text-center relative shadow-md">
    <div class="text-center relative font-bold text-primary text-2xl z-1">{{ digit }}</div>
    <div class="split-line"></div>
  </div>
</template>
<script lang=ts>
import Vue from 'vue'
import Component from 'vue-class-component'
import {Prop} from 'vue-property-decorator'

@Component({
  name: "DigitDisplay"
})
export default class DigitDisplay extends Vue {
  @Prop(String)
  digit: string
}
</script>
<style scoped>
.z-1 {
  z-index: 1;
}

.split-line {
  width: 100%;
  height: 1px;
  background-color: #ccc;
  position: absolute;
  top: 50%;
}
</style>
