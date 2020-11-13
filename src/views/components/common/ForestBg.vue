<template>
  <picture>
    <img
        class="forest-bg"
        sizes="(max-width: 1920px) 100vw, 1920px"
        srcset="/img/forest_bg/forest_bg_w_360.jpg 360w,
            /img/forest_bg/forest_bg_w_601.jpg 601w,
            /img/forest_bg/forest_bg_w_780.jpg 780w,
            /img/forest_bg/forest_bg_w_918.jpg 918w,
            /img/forest_bg/forest_bg_w_1024.jpg 1024w,
            /img/forest_bg/forest_bg_w_1130.jpg 1130w,
            /img/forest_bg/forest_bg_w_1220.jpg 1220w,
            /img/forest_bg/forest_bg_w_1306.jpg 1306w,
            /img/forest_bg/forest_bg_w_1389.jpg 1389w,
            /img/forest_bg/forest_bg_w_1472.jpg 1472w,
            /img/forest_bg/forest_bg_w_1550.jpg 1550w,
            /img/forest_bg/forest_bg_w_1624.jpg 1624w,
            /img/forest_bg/forest_bg_w_1920.jpg 1920w"
        src="/img/forest_bg/forest_bg_w_1920.jpg"
        alt="Forest background">
  </picture>
</template>
<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

@Component({
  name: 'forest-bg'
})
export default class ForestBg extends Vue {
}
</script>
<style>
.forest-bg {
  z-index: 1;
  width: 100%;
  height: 100%;
  object-fit: cover;
  position: fixed;
}
</style>
