<template>
  <div class="error z-10" v-if="error">
    <ion-icon name="alert" color="danger"></ion-icon>
    <span color="danger" size="small"><b>{{error}}</b></span>
  </div>
</template>
<script lang="ts">
  import Component from 'vue-class-component'
  import Vue from 'vue'
  import {Prop} from 'vue-property-decorator'

  @Component({
    name: 'input-error'
  })
  export default class TextItem extends Vue {
    @Prop(String)
    error: string
  }
</script>
<style>
  .error {
    padding-left: 1.5em;
    padding-top: 0.5em;
    display: flex;
    align-items: center;
    margin-bottom: -0.5em;
    font-size: 0.8em;
    color: var(--ion-color-danger);
  }

  .error span {
    margin-left: 1em
  }
</style>
