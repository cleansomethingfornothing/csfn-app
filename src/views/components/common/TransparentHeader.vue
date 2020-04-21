<template>
  <div class="transparent-header"
       :class="(alwaysTransparent ? 'always-transparent' : '') + ' '+ (scrolled ? 'scrolled' : '')">
    <ion-header mode="ios">
      <ion-toolbar mode="ios">
        <ion-buttons slot="start">
          <ion-button shape="round" fill="clear" @click="$router.back()" :color="scrolled ? 'dark' : 'white'">
            <ion-icon name="arrow-back"></ion-icon>
          </ion-button>
        </ion-buttons>
        <ion-title v-if="title" :color="scrolled ? 'dark' : 'white'">{{title}}</ion-title>
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
  import {Prop} from 'vue-property-decorator'

  @Component({
    name: "TransparentHeader"
  })
  export default class TransparentHeader extends Vue {

    @Prop(Boolean)
    scrolled: boolean

    @Prop(String)
    title: string

    @Prop(Boolean)
    alwaysTransparent: boolean
  }
</script>
<style>
  .transparent-header {
    background-color: transparent;
  }

  .transparent-header ion-toolbar {
    --background: linear-gradient(180deg, rgba(0, 0, 0, 0.4), transparent 100%);
    --border-width: 0 !important;
    --box-shadow: none !important;
  }

  .transparent-header.always-transparent ion-toolbar {
    --background: transparent !important;
  }

  .transparent-header * {
    transition: all 0.5s;
  }

  .transparent-header.scrolled ion-toolbar {
    --background: #fff;
    --border-width: 0 0 0.55px 0 !important;
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  }

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
</style>
