<template>
  <div class="transparent-header"
       :class="{'always-transparent': alwaysTransparent, 'no-gradient': noGradient, 'no-content': noContent}">
    <ion-header mode="ios">
      <ion-toolbar mode="ios" ref="toolbar">
        <ion-buttons slot="start" v-if="!noBack">
          <ion-button shape="round" fill="clear" @click="$router.back()">
            <ion-icon color="light" name="arrow-back"></ion-icon>
          </ion-button>
        </ion-buttons>
        <ion-title class="lg:text-lg xl:text-xl" v-if="title">{{ title }}</ion-title>
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
import {Prop, Ref} from 'vue-property-decorator'

@Component({
  name: 'TransparentHeader'
})
export default class TransparentHeader extends Vue {
  @Ref('toolbar')
  toolbar: any

  @Prop(String)
  title: string

  @Prop(Boolean)
  alwaysTransparent: boolean

  @Prop(Boolean)
  noGradient: boolean

  @Prop(Boolean)
  noBack: boolean

  @Prop(Boolean)
  noContent: boolean
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
  --color: var(--ion-color-white);
}

.transparent-header.always-transparent ion-toolbar {
  --color: #FFFFFF !important;
  --background: transparent !important;
}

.transparent-header.no-content ion-toolbar {
  height: 30px !important;
}

.scrolled .transparent-header ion-toolbar {
  --background: #fff;
  --color: var(--ion-text-color-ligth);
  --border-width: 0 0 0.55px 0 !important;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
}

.transparent-header ion-button {
  color: #fff !important;
  transition: color 0.3s;
}

.scrolled .transparent-header ion-button {
  color: var(--ion-color-dark) !important;
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
