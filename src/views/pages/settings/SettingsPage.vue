<template>
  <ion-page class="ion-page">
    <ion-header mode="ios">
      <ion-toolbar mode="ios">
        <ion-buttons slot="start">
          <ion-button shape="round" fill="clear" @click="$router.back()">
            <ion-icon name="arrow-back"></ion-icon>
          </ion-button>
        </ion-buttons>
        <ion-title>{{$t('settings')}}</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content class="list-large-items">
      <ion-list>
        <ion-item button @click="$router.push('/security-settings')">
          <ion-icon slot="start" name="shield-outline" color="dark"></ion-icon>
          <ion-label>{{$t('security')}}</ion-label>
        </ion-item>
        <ion-item button @click="logout" detail="false">
          <ion-icon slot="start" name="power-outline" color="dark"></ion-icon>
          <ion-label>{{$t('logout')}}</ion-label>
        </ion-item>
      </ion-list>
    </ion-content>
  </ion-page>
</template>
<script lang=ts>
  import Vue from 'vue'
  import Component from 'vue-class-component'
  import {authModule} from '@/store/authModule'

  @Component({
    name: "SettingsPage"
  })
  export default class SettingsPage extends Vue {

    logout() {
      authModule.doLogout()
        .then(() => this.$router.replace('/login'))
    }

  }
</script>
