<template>
  <div :class="isScrolled ? 'scrolled' : ''">
    <slot></slot>
  </div>
</template>
<script lang=ts>
import Vue from 'vue'
import Component from 'vue-class-component'
import { Prop } from 'vue-property-decorator'
import { nativeProvider } from '@/providers/native/native.provider'
import { StatusBarStyle } from '@capacitor/core'

@Component({
  name: 'page-transparent-header'
})
export default class PageTransparentHeader extends Vue {

  @Prop(Boolean)
  transparent: boolean

  isScrolled = false

  scrolled(event) {
    const wasScrolled = this.isScrolled
    this.isScrolled = event.detail.scrollTop > 0
    if (this.isScrolled !== wasScrolled && this.transparent) {
      if (this.transparent && this.isScrolled) {
        nativeProvider.setStatusBarStyle(StatusBarStyle.Light)
      } else {
        nativeProvider.setStatusBarStyle(StatusBarStyle.Dark)
      }
    }
  }

  mounted() {
    if (this.transparent) {
      nativeProvider.setStatusBarStyle(StatusBarStyle.Dark)
    }
  }

  beforeDestroy() {
    if (this.transparent) {
      nativeProvider.setStatusBarStyle(StatusBarStyle.Light)
    }
  }
}
</script>
<style scoped>

</style>
