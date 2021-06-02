<template>
  <ion-item class="button-item" expand="full" shape="round" mode="ios" :color="color"
            :disabled="disabled" button detail="false" @click="$emit('click')">
    <ion-icon v-if="icon || iconSrc" slot="start" :name="icon" :src="iconSrc" color="white"></ion-icon>
    <span :class="{'text-center': center}" class="full-width">{{ text }}</span>
  </ion-item>
</template>
<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { Prop } from 'vue-property-decorator'

@Component({
  name: 'button-item'
})
export default class ButtonItem extends Vue {

  @Prop(String)
  public readonly icon!: string

  @Prop(String)
  public readonly iconSrc!: string

  @Prop(String)
  public readonly type!: string

  @Prop(String)
  public readonly text!: string

  @Prop(String)
  public readonly color!: string

  @Prop(Boolean)
  public readonly disabled: boolean

  @Prop(Boolean)
  public readonly center: boolean
}
</script>
<style>
ion-item.button-item {
  border-radius: 999px;
  width: 100%;
}
</style>
