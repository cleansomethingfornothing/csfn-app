<template>
  <div class="transparent-header">
    <ion-button class="back" fill="clear" shape="round" color="white" @click="$router.back()">
      <ion-icon name="arrow-back" slot="icon-only"></ion-icon>
    </ion-button>
    <b>{{title}}</b>
    <i></i>
  </div>
</template>
<script lang="ts">
  import Vue from 'vue'
  import Component from 'vue-class-component'
  import {Prop} from 'vue-property-decorator'

  @Component({
    name: 'transparent-header'
  })
  export default class TransparentHeader extends Vue {
    @Prop(String)
    title: string
  }
</script>
<style>
  .transparent-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-left: 8px;
    padding-top: 6px;
    padding-right: 50px;
    width: 100%;
    font-size: 1.3em !important;
    color: white;
    z-index: 5;
  }

  .back {
    --padding-top: 17px;
    --padding-bottom: 20px;
    --padding-start: 6px;
    --padding-end: 8px;
  }
</style>
