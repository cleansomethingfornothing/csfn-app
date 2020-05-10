<template>
  <div class="transparent-header"
       :class="(alwaysTransparent ? 'always-transparent' : '') + ' '
       + (scrolled ? 'scrolled' : '') + ' '
       + (noGradient ? 'no-gradient' : '')">
    <ion-header mode="ios">
      <ion-toolbar mode="ios" ref="toolbar">
        <ion-buttons slot="start" v-if="!noBack">
          <ion-button shape="round" fill="clear" @click="$router.back()" :color="scrolled ? 'dark' : 'white'">
            <ion-icon name="arrow-back"></ion-icon>
          </ion-button>
        </ion-buttons>
        <ion-title class="lg:text-lg xl:text-xl" v-if="title" :color="scrolled ? 'dark' : 'white'">{{title}}</ion-title>
        <ion-buttons slot="end">
          <slot name="end-buttons"></slot>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
  </div>
</template>
<script lang=ts>
  import Vue from 'vue'
  import Component from 'vue-class-component'
  import {Prop, Ref, Watch} from 'vue-property-decorator'
  import {createAnimation} from '@ionic/core'

  @Component({
    name: "TransparentHeader"
  })
  export default class TransparentHeader extends Vue {

    isScrolled = false

    @Ref('toolbar')
    toolbar: any

    @Prop(Boolean)
    scrolled: boolean

    @Prop(String)
    title: string

    @Prop(Boolean)
    alwaysTransparent: boolean

    @Prop(Boolean)
    noGradient: boolean

    @Prop(Boolean)
    noBack: boolean

    @Watch('scrolled')
    onScrolled(scrolled) {
      if (scrolled) {
        createAnimation()
          .addElement(this.toolbar)
          .duration(300)
          .iterations(1)
          .direction('normal')
          .fromTo('background', 'transparent', 'linear-gradient(135deg, var(--ion-color-secondary), var(--ion-color-primary))')
      }
    }
  }
</script>
<style>
  .transparent-header ion-toolbar {
    --background: linear-gradient(180deg, rgba(0, 0, 0, 0.4), transparent 100%);
    --border-width: 0 !important;
    --box-shadow: none !important;
  }

  .transparent-header.no-gradient ion-toolbar {
    --background: transparent;
  }

  .transparent-header.always-transparent ion-toolbar {
    --background: transparent !important;
  }

  .transparent-header.scrolled ion-toolbar {
    --background: #fff;
    /*--background: linear-gradient(135deg, var(--ion-color-secondary), var(--ion-color-primary));*/
    --border-width: 0 0 0.55px 0 !important;
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  }

  /*
  @media (min-width: 600px) {
    .transparent-header:not(.always-transparent) ion-toolbar {
      --background: #fff !important;
      --border-width: 0 0 0.55px 0 !important;
      box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
    }

    .transparent-header:not(.always-transparent) ion-toolbar * {
      color: var(--ion-color-dark);
    }
  }
   */
</style>
