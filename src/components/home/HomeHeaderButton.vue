<template>
  <div class="home-header-button ion-activatable ripple-parent shadow" :class="iconOnly ? 'square' : ''" @click="click">
    <slot></slot>
    <ion-ripple-effect></ion-ripple-effect>
  </div>
</template>
<script lang="ts">
  import Vue from 'vue'
  import Component from 'vue-class-component'
  import {Emit, Prop} from 'vue-property-decorator'

  @Component({
    name: 'home-header-button'
  })
  export default class HomeHeaderButton extends Vue {
    @Prop(Boolean)
    readonly iconOnly!: boolean

    @Emit('click')
    click() {
      return
    }
  }
</script>
<style>
  .home-header-button {
    display: inline-flex;
    align-items: center;
    justify-content: space-between;
    border-radius: 21px;
    border: 1px solid #ddd;
    height: 36px;
    padding: 0 12px;
    cursor: pointer;
    width: 100%;
  }

  .home-header-button > ion-icon {
    min-width: 15px;
    margin-right: 0.25em;
  }

  .home-header-button > ion-label {
    max-width: calc(100% - 0.25em - 15px);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .square {
    width: 36px;
    padding: 0 10px;
  }
</style>
