<template>
  <ion-page class="ion-page register-page">
    <transparent-header :title="$t('recover-password')" :always-transparent="true"></transparent-header>
    <ion-content class="fullscreen h-screen">
      <forest-bg clazz="login-bg-image"></forest-bg>
      <div class="flex flex-col justify-between items-center w-full h-full">
        <form class="auth-form" @submit.prevent="resetPassword">
          <ion-label class="password-message z-10" color="white">
            {{$t('recover-password-text')}}
          </ion-label>
          <input-item icon="mail" placeholder="Email" type="email" v-model="email"
                      :rounded="true" :errors="error ? [error] : undefined"
                      @focus="error = undefined"></input-item>
          <button-item color="primary" :text="$t('send')" @click="resetPassword"></button-item>
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
  import FormError from '@/types/errors/FormError'
  import ErrorMessage from '@/tools/ErrorMessage'
  import UnknownError from '@/types/errors/UnknownError'
  import ToastPresenter from '@/tools/ToastPresenter'
  import User from '@/types/User'
  import {appModule} from '@/store/appModule'

  @Component({
    name: 'forgotten-password',
    components: {TransparentHeader, Avatar, ButtonItem, ForestBg, InputItem}
  })
  export default class ForgottenPasswordPage extends Vue {

    loading = false

    public email = ''

    error = ''

    resetPassword() {
      const reset = new User()
      reset.email = this.email
      appModule.showLoader(this.$ionic)
        .then(() => authModule.doPasswordReset(reset))
        .then(() => {
          appModule.hideLoader()
          ToastPresenter.present(this.$ionic, this.$t('recover-password-success').toString(), 'success')
          this.$router.back()
        })
        .catch(error => {
          appModule.hideLoader()
          if (error instanceof FormError) {
            error.fieldErrors.forEach((fieldError) => {
              this.error = ErrorMessage.getMessage(fieldError)
            })
          }
          if (error instanceof UnknownError) {
            ToastPresenter.present(this.$ionic, ErrorMessage.getMessage(error))
          }
          this.loading = false
        })
    }
  }
</script>
<style>
  .password-message {
    font-size: 1.1em;
  }
</style>
