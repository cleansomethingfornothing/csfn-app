<template>
  <ion-content class="menu-items">
    <ion-list lines="none" class="ion-no-margin ion-no-padding">
      <ion-item button>
        <ion-icon name="trash" slot="start" color="primary"></ion-icon>
        <ion-label>{{$t('my-cleanups')}}</ion-label>
      </ion-item>
      <ion-item button>
        <ion-icon name="stats" slot="start" color="primary"></ion-icon>
        <ion-label>{{$t('statistics')}}</ion-label>
      </ion-item>
      <ion-item button>
        <ion-icon name="settings" slot="start" color="primary"></ion-icon>
        <ion-label>{{$t('settings')}}</ion-label>
      </ion-item>
    </ion-list>
    <ion-list lines="none" class="ion-no-margin ion-no-padding logout-button">
      <ion-item button @click="$emit('logout')" detail="false">
        <ion-icon name="arrow-left" slot="start" color="primary"></ion-icon>
        <ion-label>{{$t('log-out')}}</ion-label>
      </ion-item>
    </ion-list>
  </ion-content>
</template>
<script lang="ts">
  import Vue from 'vue'
  import Component from 'vue-class-component'

  @Component({
    name: 'menu-items'
  })
  export default class MenuItems extends Vue {
    open(page: string) {
      this.$router.push(page)
    }
  }
</script>
<style>
  .menu-items {
    height: calc(100vh - 300px);
    position: relative;
  }

  .menu-items ion-label {
    margin-top: 1.3em;
    margin-bottom: 1.3em;
  }

  .logout-button {
    width: 100%;
    position: absolute;
    bottom: 0
  }
</style>
