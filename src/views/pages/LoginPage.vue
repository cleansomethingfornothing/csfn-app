<template>
  <ion-page class="ion-page">
    <ion-content fullscreen="true">
      <forest-bg></forest-bg>
      <div class="w-full h-full flex flex-col justify-between items-center">
        <form class="auth-form" @submit="credentialsLogin" @keyup.enter="credentialsLogin">
          <img alt="icon" src="@/assets/img/icon.png" width="35%" class="z-10">
          <img alt="title" src="@/assets/img/text_white.png" width="95%" class="z-10">

          <input-item icon="person" :placeholder="$t('username')" type="text" v-model="userLogin.username"
                      :rounded="true"
                      :errors="fieldErrors.username" @blur="blur"
                      @focus="resetError('username') || focus()"></input-item>
          <input-item icon="lock" :placeholder="$t('password')" type="password" v-model="userLogin.password"
                      :rounded="true"
                      :errors="fieldErrors.password" @blur="blur"
                      @focus="resetError('password') || focus()"></input-item>
          <button-item color="secondary" :text="$t('login')" :disabled="loading"
                       @click="credentialsLogin"></button-item>
          <!--
          <hr class="z-10">
          <button-item color="instagram" icon="instagram" :text="$t('continue-with', {'param': 'Instagram'})"
                       @click="instagramLogin"></button-item>
          <button-item color="facebook" icon="facebook" :text="$t('continue-with', {'param': 'Facebook'})"
                       @click="facebookLogin"></button-item>
           -->
        </form>

        <div class="flex justify-between w-full z-10">
          <ion-button fill="clear" color="light" shape="round" size="small" @click="$router.push('/register')">
            {{$t('register')}}
          </ion-button>
          <ion-button fill="clear" color="light" shape="round" size="small"
                      @click="$router.push('/forgotten-password')">
            {{$t('forgotten-password')}}
          </ion-button>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>
<script lang="ts">
  import Vue from 'vue'
  import Component from 'vue-class-component'
  import InputItem from '@/views/components/common/InputItem.vue'
  import ButtonItem from '@/views/components/common/ButtonItem.vue'
  import ForestBg from '@/views/components/common/ForestBg.vue'
  import {authModule} from '@/store/authModule'
  import UserLogin from '@/types/UserLogin'
  import UnknownError from '@/types/errors/UnknownError'
  import ErrorMessage from '@/tools/ErrorMessage'
  import ToastPresenter from '@/tools/ToastPresenter'
  import FormError from '@/types/errors/FormError'
  import {nativeProvider} from '@/providers/native/native.provider'

  @Component({
    name: 'login',
    components: {ForestBg, ButtonItem, InputItem}
  })
  export default class LoginPage extends Vue {

    userLogin = new UserLogin()

    fieldErrors = {}

    typing = false

    loading = false

    credentialsLogin() {
      this.loading = true
      authModule.doCredentialsLogin(this.userLogin)
        .then(() => {
          this.$router.push('/')
        })
        .catch(error => {
          if (error instanceof FormError) {
            error.fieldErrors.forEach((fieldError) => {
              this.$set(this.fieldErrors, fieldError.param,
                [ErrorMessage.getMessage(fieldError)])
            })
          }
          if (error instanceof UnknownError) {
            ToastPresenter.present(this.$ionic, ErrorMessage.getMessage(error))
          }
          this.loading = false
        })
    }

    resetError(field) {
      this.$set(this.fieldErrors, field, undefined)
    }

    focus() {
      this.typing = true
    }

    blur() {
      this.typing = false
    }
  }
</script>
<style>
  .login-page {
    background-color: #3e6137;
    min-height: 635px;
  }

  .password-button {
    position: absolute;
    bottom: 0.25em;
    right: 0.25em;
    z-index: 5;
  }

  .register-button {
    position: absolute;
    bottom: 0.25em;
    left: 0.25em;
    z-index: 5;
  }
</style>
