<template>
  <div class="month-bar-container">
    <div class="month-bar">
      <div class="face top"></div>
      <div class="face front"></div>
      <div class="face side"></div>
    </div>
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

.month-bar-container {
  height: 100%;
  perspective: 400px;
}

.month-bar {
  --side: 2em;
  position: relative;
  width: 100%;
  perspective: 400px;
  perspective-origin: 50px -100px;
  transform: translateZ(-80px) translateY(10px) translateX(-5px);
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
  background-color: var(--ion-color-primary-tint);
  transform: rotateX(90deg) rotateZ(45deg) translateZ(calc(var(--side) / 2));
}

.front {
  width: var(--side);
  background: linear-gradient(135deg, var(--ion-color-primary), var(--ion-color-tertiary));
  transform: rotateY(-45deg) translateZ(calc(var(--side) / 2));
}

.side {
  width: var(--side);
  background: linear-gradient(135deg, var(--ion-color-primary), var(--ion-color-tertiary));
  transform: rotateY(45deg) translateZ(calc(var(--side) / 2));
}
</style>
