<template>
  <ion-page class="ion-page">
    <ion-content fullscreen="true">
      <forest-bg></forest-bg>
      <div class="w-full h-full flex flex-col justify-between items-center pb-2">
        <form class="auth-form justify-end h-full pb-8" @submit="credentialsLogin"
              @keyup.enter="credentialsLogin">
          <img alt="icon" class="z-10 hidden sm:block" src="@/assets/img/icon.png" width="35%">
          <img alt="title" class="z-10 hidden sm:block" src="@/assets/img/text_white.png" width="95%">
          <div></div>

          <input-item v-model="userLogin.email" :errors="fieldErrors.email" :placeholder="$t('email')"
                      :rounded="true"
                      icon="mail"
                      type="email" @blur="blur"
                      @focus="resetError('email') || focus()"></input-item>
          <input-item v-model="userLogin.password" :errors="fieldErrors.password"
                      :placeholder="$t('password')"
                      :rounded="true"
                      icon="lock-closed"
                      type="password" @blur="blur"
                      @focus="resetError('password') || focus()"></input-item>
          <button-item :center="true" :disabled="loading" :text="$t('login')" color="primary"
                       @click="credentialsLogin"></button-item>
          <hr class="z-10">
          <button-item :iconSrc="require('@/assets/img/icons/google-icon.svg')"
                       :text="$t('continue-with', {'param': 'Google'})"
                       class="google-button text-left" color="white"
                       @click="googleLogin"></button-item>
          <button-item :iconSrc="require('@/assets/img/icons/facebook-icon.svg')"
                       :text="$t('continue-with', {'param': 'Facebook'})"
                       color="facebook"
                       @click="facebookLogin"></button-item>
        </form>
        <ion-footer>
          <ion-toolbar class="flex justify-between transparent-footer z-10">
            <ion-buttons slot="start">
              <ion-button color="white" fill="clear" shape="round" size="small"
                          @click="$router.push('/register')">
                {{ $t('register') }}
              </ion-button>
            </ion-buttons>
            <ion-buttons slot="end">
              <ion-button color="white" fill="clear" shape="round" size="small"
                          @click="$router.push('/forgotten-password')">
                {{ $t('forgotten-password') }}
              </ion-button>
            </ion-buttons>
          </ion-toolbar>
        </ion-footer>
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
import { authModule } from '@/store/authModule'
import UnknownError from '@/types/errors/UnknownError'
import ErrorMessage from '@/tools/ErrorMessage'
import ToastPresenter from '@/tools/ToastPresenter'
import FormError from '@/types/errors/FormError'
import { nativeProvider } from '@/providers/native/native.provider'
import User from '@/types/User'
import { Plugins } from '@capacitor/core'
import { appModule } from '@/store/appModule'
import { FacebookLoginResponse } from '@capacitor-community/facebook-login'
import { locationModule } from '@/store/locationModule'
import { FirebaseAnalytics } from '@capacitor-community/firebase-analytics'

const { FacebookLogin, GoogleAuth } = Plugins

@Component({
  name: 'login',
  components: { ForestBg, ButtonItem, InputItem }
})
export default class LoginPage extends Vue {

  loaded = false
  userLogin = new User()
  fieldErrors = {}
  typing = false
  loading = false

  get userCountry() {
    return locationModule.getAddress.countryCode
  }

  mounted(): void {
    if (!this.loaded) {
      nativeProvider.hideSplashScreen()
      this.loaded = true
    }
  }

  credentialsLogin() {
    this.loading = true
    appModule.showLoader(this.$ionic)
      .then(() => authModule.doCredentialsLogin(this.userLogin))
      .then((user) => {
        appModule.hideLoader()
        this.$router.replace('/home')
      })
      .catch(error => {
        appModule.hideLoader()
        if (error instanceof FormError) {
          error.fieldErrors.forEach((fieldError) => {
            this.$set(this.fieldErrors, fieldError.param, [ErrorMessage.getMessage(fieldError)])
          })
        }
        if (error instanceof UnknownError) {
          ToastPresenter.present(this.$ionic, ErrorMessage.getMessage(error))
        }
        this.loading = false
      })
  }

  facebookLogin() {
    FacebookLogin.login({ permissions: ['email'] })
      .then((result: FacebookLoginResponse) =>
        result && result.accessToken && result.accessToken.token ? appModule.showLoader(this.$ionic)
          .then(() => authModule.doFacebookLogin(result.accessToken.token)) : Promise.reject(null))
      .then((user) => {
        appModule.hideLoader()
        if ((user as any).isNew) {
          FirebaseAnalytics.logEvent({ name: 'sign_up', params: { method: 'facebook' } })
          this.$router.push('/welcome')
        } else {
          FirebaseAnalytics.logEvent({ name: 'login', params: { method: 'facebook' } })
          this.$router.push('/home')
        }
      })
      .catch((error) => {
        if (error !== null) {
          appModule.hideLoader()
          ToastPresenter.present(this.$ionic, this.$t('errors.unknown-error', { param: this.$t('login-with', { param: 'Facebook' }).toString().toLowerCase() }))
        }
      })
  }

  googleLogin() {
    GoogleAuth.signIn()
      .then((result) =>
        result && result.authentication && result.authentication.idToken ? appModule.showLoader(this.$ionic)
          .then(() => authModule.doGoogleLogin(result.authentication.idToken)) : Promise.reject(null))
      .then((user) => {
        appModule.hideLoader()
        if ((user as any).isNew) {
          FirebaseAnalytics.logEvent({ name: 'sign_up', params: { method: 'google' } })
          this.$router.push('/welcome')
        } else {
          FirebaseAnalytics.logEvent({ name: 'login', params: { method: 'google' } })
          this.$router.push('/home')
        }
      })
      .catch((err) => {
        if (!err || (err.message && !err.message.includes('user canceled'))) {
          appModule.hideLoader()
          ToastPresenter.present(this.$ionic, this.$t('errors.unknown-error', { param: this.$t('login-with', { param: 'Google' }).toString().toLowerCase() }))
        }
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

.google-button ion-icon {
  margin-right: 18px;
  width: 23px !important;
}

.password-button {
  bottom: 0.25em;
  position: absolute;
  right: 0.25em;
  z-index: 5;
}

.register-button {
  bottom: 0.25em;
  left: 0.25em;
  position: absolute;
  z-index: 5;
}

.transparent-footer {
  --background: transparent;
  --border-width: 0 !important;
}
</style>
