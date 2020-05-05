<template>
  <!--
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" class="wave">
    <path fill-opacity="1"
          d="M0,96L120,85.3C240,75,480,53,720,64C960,75,1200,117,1320,138.7L1440,160L1440,0L1320,0C1200,0,960,0,720,0C480,0,240,0,120,0L0,0Z"></path>
  </svg>
  -->
  <svg class="wave" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#0099ff" fill-opacity="1" d="M0,32L60,53.3C120,75,240,117,360,117.3C480,117,600,75,720,53.3C840,32,960,32,1080,74.7C1200,117,1320,203,1380,245.3L1440,288L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z"></path></svg>
</template>
<script lang=ts>
  import Vue from 'vue'
  import Component from 'vue-class-component'

  @Component({
    name: "wave"
  })
  export default class Wave extends Vue {
  }
</script>
<style>
  .wave path {
    fill: var(--ion-color-primary);
  }
</style>
