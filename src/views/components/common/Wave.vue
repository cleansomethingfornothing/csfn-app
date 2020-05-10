<template>
  <div class="wave">
    <img :src="require('@/assets/img/wave-0' + num + '.svg')" style="width: 100%">
  </div>
</template>
<script lang=ts>
  import Vue from 'vue'
  import Component from 'vue-class-component'
  import {Prop} from 'vue-property-decorator'

  @Component({
    name: "wave"
  })
  export default class Wave extends Vue {
    @Prop(Number)
    num: number
  }
</script>
<style>
  .wave {
    width: calc(100% + 2px);
    margin-left: -1px;
  }
</style>
