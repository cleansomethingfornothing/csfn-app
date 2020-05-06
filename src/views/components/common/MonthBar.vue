<template>
  <div class="month-bar">
    <div class="face top"></div>
    <div class="face front"></div>
    <div class="face side"></div>
  </div>
</template>
<script lang=ts>
  import Vue from 'vue'
  import Component from 'vue-class-component'

  @Component({
    name: "month-bar"
  })
  export default class MonthBar extends Vue {
  }
</script>
<style scoped>

  .month-bar {
    perspective: 300px;
    transform-style: preserve-3d;
    perspective-origin: -100% -100%;
    --side: 24px;
    position: relative;
    width: 100%
  }

  .month-bar, .front, .side {
    height: 100%;
  }

  .face {
    position: absolute;
    display: block;
  }

  .top {
    width: var(--side);
    height: var(--side);
    background-color: var(--ion-color-secondary);
    transform: rotateX(90deg) translateZ(50px);
  }

  .front {
    width: var(--side);
    background-color: var(--ion-color-primary-tint);
    transform: translateZ(50px);
  }

  .side {
    width: var(--side);
    background-color: var(--ion-color-primary-shade);
    transform: rotateY(-90deg) translateZ(50px);
  }
</style>
