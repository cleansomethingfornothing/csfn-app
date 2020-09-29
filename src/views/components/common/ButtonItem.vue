<template>
  <ion-item class="button-item" expand="full" shape="round" mode="ios" :color="color"
            @click="$emit('click')" button :disabled="disabled" detail="false">
    <ion-icon v-if="icon || iconSrc" :src="iconSrc" :name="icon" slot="start" color="white"></ion-icon>
    <span class="full-width" :class="{'text-center': center}">{{text}}</span>
  </ion-item>
</template>
<script lang="ts">
    import Vue from 'vue'
    import Component from 'vue-class-component'
    import {Prop} from 'vue-property-decorator'

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
    width: 100%;
    border-radius: 999px;
  }
</style>
