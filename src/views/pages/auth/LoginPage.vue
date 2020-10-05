<template>
  <ion-page class="ion-page">
    <ion-content fullscreen="true">
      <forest-bg></forest-bg>
      <div class="w-full h-full flex flex-col justify-between items-center pb-2">
        <form class="auth-form justify-end h-full pb-8" @submit="credentialsLogin" @keyup.enter="credentialsLogin">
          <img alt="icon" src="@/assets/img/icon.png" width="35%" class="z-10 hidden sm:block">
          <img alt="title" src="@/assets/img/text_white.png" width="95%" class="z-10 hidden sm:block">
          <div></div>

          <input-item icon="mail" :placeholder="$t('email')" type="email" v-model="userLogin.email"
                      :rounded="true"
                      :errors="fieldErrors.email" @blur="blur"
                      @focus="resetError('email') || focus()"></input-item>
          <input-item icon="lock-closed" :placeholder="$t('password')" type="password" v-model="userLogin.password"
                      :rounded="true"
                      :errors="fieldErrors.password" @blur="blur"
                      @focus="resetError('password') || focus()"></input-item>
          <button-item color="primary" :text="$t('login')" :disabled="loading" :center="true"
                       @click="credentialsLogin"></button-item>
          <hr class="z-10">
          <button-item color="white" :iconSrc="require('@/assets/img/icons/google-icon.svg')"
                       :text="$t('continue-with', {'param': 'Google'})" class="google-button text-left"
                       @click="googleLogin"></button-item>
          <button-item color="facebook" :iconSrc="require('@/assets/img/icons/facebook-icon.svg')"
                       :text="$t('continue-with', {'param': 'Facebook'})"
                       @click="facebookLogin"></button-item>
        </form>
        <ion-footer>
          <ion-toolbar class="flex justify-between transparent-footer z-10">
            <ion-buttons slot="start">
              <ion-button fill="clear" color="white" shape="round" size="small" @click="$router.push('/register')">
                {{$t('register')}}
              </ion-button>
            </ion-buttons>
            <ion-buttons slot="end">
              <ion-button fill="clear" color="white" shape="round" size="small"
                          @click="$router.push('/forgotten-password')">
                {{$t('forgotten-password')}}
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
    import {authModule} from '@/store/authModule'
    import UnknownError from '@/types/errors/UnknownError'
    import ErrorMessage from '@/tools/ErrorMessage'
    import ToastPresenter from '@/tools/ToastPresenter'
    import FormError from '@/types/errors/FormError'
    import {nativeProvider} from '@/providers/native/native.provider'
    import User from '@/types/User'
    import {Plugins} from '@capacitor/core'
    import {appModule} from '@/store/appModule'
    import {FacebookLoginResponse} from '@capacitor-community/facebook-login'
    import {locationModule} from '@/store/locationModule'

    const {FacebookLogin, GoogleAuth} = Plugins

    @Component({
        name: 'login',
        components: {ForestBg, ButtonItem, InputItem}
    })
    export default class LoginPage extends Vue {

        loaded = false
        userLogin = new User()
        fieldErrors = {}
        typing = false
        loading = false

        mounted(): void {
            if (!this.loaded) {
                nativeProvider.hideSplashScreen()
                this.loaded = true
            }
            locationModule.initializeByIp()
        }

        get userCountry() {
            return locationModule.getAddress.countryCode
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

        facebookLogin() {
            FacebookLogin.login({permissions: ['email']})
                .then((result: FacebookLoginResponse) =>
                    result && result.accessToken && result.accessToken.token ? appModule.showLoader(this.$ionic)
                        .then(() => authModule.doFacebookLogin(result.accessToken.token)) : Promise.reject(null))
                .then((user) => {
                    appModule.hideLoader()
                    if((user as any).isNew){
                        this.$router.push('/welcome')
                    } else {
                        this.$router.push('/home')
                    }
                })
                .catch((error) => {
                    console.error(error)
                    if (error !== null) {
                        appModule.hideLoader()
                        ToastPresenter.present(this.$ionic, this.$t('errors.unknown-error', {param: this.$t('login-with', {param: 'Facebook'}).toString().toLowerCase()}))
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
                    if((user as any).isNew){
                        this.$router.push('/welcome')
                    } else {
                        this.$router.push('/home')
                    }
                })
                .catch((err) => {
                    console.error(err)
                    if (err !== null) {
                        appModule.hideLoader()
                        ToastPresenter.present(this.$ionic, this.$t('errors.unknown-error', {param: this.$t('login-with', {param: 'Google'}).toString().toLowerCase()}))
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
    width: 23px !important;
    margin-right: 18px;
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

  .transparent-footer {
    --background: transparent;
    --border-width: 0 !important;
  }
</style>
