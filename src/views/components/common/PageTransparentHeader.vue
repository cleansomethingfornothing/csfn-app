<template>
  <div :class="isScrolled ? 'scrolled' : ''">
    <slot></slot>
  </div>
</template>
<script lang=ts>
import Vue from 'vue'
import Component from 'vue-class-component'

@Component({
  name: "page-transparent-header"
})
export default class PageTransparentHeader extends Vue {

  isScrolled = false

  scrolled(event) {
    this.isScrolled = event.detail.scrollTop > 0
  }

}
</script>
<style scoped>

</style>
