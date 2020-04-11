<template>
  <ion-page class="ion-page register-page">
    <transparent-header :title="$t('recover-password')"></transparent-header>
    <ion-content class="fullscreen h-screen">
      <forest-bg clazz="login-bg-image"></forest-bg>
      <div class="flex flex-col justify-between items-center w-full h-full">
        <form class="auth-form" @keyup.enter="resetPassword">
          <ion-label class="password-message z-10" color="white">
            {{$t('recover-password-text')}}
          </ion-label>
          <input-item icon="mail" placeholder="Email" type="email" v-model="email" :rounded="true"></input-item>
          <button-item color="secondary" :text="$t('send')" @click="resetPassword"></button-item>
        </form>
      </div>
    </ion-content>
  </ion-page>
</template>
<script lang="ts">
  import Vue from 'vue'
  import {Component} from 'vue-property-decorator'
  import ButtonItem from '@/views/components/common/ButtonItem.vue'
  import ForestBg from '@/views/components/common/ForestBg.vue'
  import InputItem from '@/views/components/common/InputItem.vue'
  import Avatar from '@/views/components/common/Avatar.vue'
  import TransparentHeader from '@/views/components/common/TransparentHeader.vue'
  import {authModule} from '@/store/authModule'

  @Component({
    name: 'forgotten-password',
    components: {TransparentHeader, Avatar, ButtonItem, ForestBg, InputItem}
  })
  export default class ForgottenPasswordPage extends Vue {

    public email = ''

    public sent = false

    resetPassword() {
      authModule.doResetPassword(this.email)
        .then(() => {
          this.sent = true
        })
      /*
      .catch((error) => {
        if (error instanceof FormValidationError) {

        }
      })
       */
    }
  }
</script>
<style>
  .password-message {
    font-size: 1.1em;
  }
</style>
