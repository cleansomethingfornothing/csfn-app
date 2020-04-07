<template>
  <ion-app>
    <ion-vue-router id="main"></ion-vue-router>
  </ion-app>
</template>
<style lang="scss">
  @import 'assets/style/main';
</style>
<script>
  import Vue from 'vue'
  import Component from 'vue-class-component'
  import AppMenu from '@/views/components/menu/AppMenu'
  import {userModule} from '@/store/userModule'
  import {authModule} from '@/store/authModule'
  import {nativeProvider} from '@/providers/native/native.provider'
  import {locationModule} from '@/store/locationModule'

  @Component({
    components: {AppMenu}
  })
  export default class Main extends Vue {

    get user() {
      return userModule.getCurrentUser
    }

    mounted() {
      nativeProvider.hideSplashScreen()
      locationModule.fetchCurrentPosition()
    }

    logout() {
      authModule.doLogout()
        .then(() => this.$router.replace('/login'))
    }

  }
</script>
