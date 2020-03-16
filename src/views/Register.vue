<template>
  <ion-page class="ion-page register-page">
    <ion-content>
      <forest-bg></forest-bg>
      <div class="w-full h-full flex flex-col justify-between items-center">
        <transparent-header :title="$t('create-account')"></transparent-header>
        <form class="auth-form" @keyup.enter="register" action="javascript:void(0)">
          <!--
          <div class="w-full flex flex-col items-center justify-center">
            <label class="w-2/5 flex justify-center ripple-parent">
              <avatar :src="picture || '/add-picture.png'" :invalid="!!this.fieldErrors.picture"></avatar>
              <input class="hidden" type="file" @change="fileSelected($event.target.files[0])" accept=".png,.jpg">
              <ion-ripple-effect></ion-ripple-effect>
            </label>

            <input-error :error="this.fieldErrors.picture && this.fieldErrors.picture[0]"></input-error>
          </div>
          -->
          <input-item icon="person" type="text" @click="resetError('firstName') || resetError('lastName')" :rounded="true"
                     :errors="(this.fieldErrors.firstName && this.fieldErrors.lastName) && [...this.fieldErrors.firstName, ...this.fieldErrors.lastName]">
            <ion-row class="ion-no-padding">
              <ion-col class="name-input ion-no-padding" size="5">
                <ion-input type="text" :placeholder="$t('firstName')" :value="userRegistration.firstName" :rounded="true"
                           @ionFocus="resetError('firstName') || resetError('lastName')"
                           @ionChange="userRegistration.firstName = $event.target.value"></ion-input>
              </ion-col>
              <ion-col size="7" class="ion-no-padding ion-padding-start">
                <ion-input ref="input" type="text" :placeholder="$t('lastName')" :value="userRegistration.lastName" :rounded="true"
                           @ionChange="userRegistration.lastName = $event.target.value"
                           @ionFocus="resetError('firstName') || resetError('lastName')"></ion-input>
              </ion-col>
            </ion-row>
          </input-item>
          <input-item icon="at" :placeholder="$t('username')" type="text" v-model="userRegistration.username" :rounded="true"
                     :errors="fieldErrors.username" @focus="resetError('username')"></input-item>
          <input-item icon="mail" placeholder="Email" type="email" v-model="userRegistration.email" :rounded="true"
                     :errors="fieldErrors.email" @focus="resetError('email')"></input-item>
          <input-item icon="lock" :placeholder="$t('password')" type="password" v-model="userRegistration.password" :rounded="true"
                     :errors="fieldErrors.password" @focus="resetError('password')"></input-item>
          <input-item icon="lock" :placeholder="$t('passwordConfirmation')" type="password" :rounded="true"
                     v-model="userRegistration.passwordConfirmation"
                     :errors="fieldErrors.passwordConfirmation" @focus="resetError('passwordConfirmation')"></input-item>
          <button-item color="secondary" :text="$t('create-account')" type="button" @click="register"></button-item>
        </form>
        <i></i>
      </div>
    </ion-content>
  </ion-page>
</template>
<script lang="ts">
  import Vue from 'vue'
  import {Component} from 'vue-property-decorator'
  import ButtonItem from '@/components/common/ButtonItem.vue'
  import ForestBg from '@/components/common/ForestBg.vue'
  import InputItem from '@/components/common/InputItem.vue'
  import Avatar from '@/components/common/Avatar.vue'
  import TransparentHeader from '@/components/common/TransparentHeader.vue'
  import UserRegistration from '@/types/UserRegistration'
  import {authModule} from '@/store/authModule'
  import FormError from '@/types/errors/FormError'
  import InputError from '@/components/common/InputError.vue'
  import UnknownError from '@/types/errors/UnknownError'
  import ToastPresenter from '@/tools/ToastPresenter'
  import ErrorMessage from '@/tools/ErrorMessage'

  @Component({
    name: 'register',
    components: {InputError, TransparentHeader, Avatar, ButtonItem, ForestBg, InputItem}
  })
  export default class Register extends Vue {

    userRegistration = new UserRegistration()

    picture = ''

    fieldErrors = {}

    register() {
      authModule.doRegister(this.userRegistration)
        .then(() => this.$router.replace('/'))
        .catch(error => {
          if (error instanceof FormError) {
            error.fieldErrors.forEach((fieldError) => {
              this.$set(this.fieldErrors, fieldError.param,
                [ErrorMessage.getMessage(fieldError)])
            })
          } else if (error instanceof UnknownError) {
            ToastPresenter.present(this.$ionic, ErrorMessage.getMessage(error))
          }
        })
    }

    resetError(field) {
      this.fieldErrors[field] = undefined
    }

    /*
    fileSelected(file: Blob) {
      this.fieldErrors['picture'] = undefined
      Cropper.crop(file)
        .then((cropped) => {
          this.userRegistration.picture = cropped
          this.picture = URL.createObjectURL(cropped)
        })
    }
     */
  }
</script>
<style>
  .name-input {
    border-right: 2px solid #eee;
  }
</style>
