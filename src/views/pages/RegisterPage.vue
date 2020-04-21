<template>
  <ion-page class="ion-page register-page">
    <transparent-header :title="$t('create-account')" :always-transparent="true"></transparent-header>
    <ion-content class="fullscreen">
      <forest-bg></forest-bg>
      <div class="w-full h-full flex flex-col justify-between items-center">
        <form class="auth-form" @keyup.enter="register" action="javascript:void(0)">
          <div class="w-full">
            <div class="w-2/5 m-auto ">
              <upload-button :file="userRegistration.picture" @click="userRegistration.picture && openPreview()"
                             @select="fileSelected" :rounded="true" :loading="loadingPicture"></upload-button>
            </div>
            <input-error :error="this.fieldErrors.picture && this.fieldErrors.picture[0]"></input-error>
          </div>
          <input-item icon="person" :placeholder="$t('username')" type="text" v-model="userRegistration.username"
                      :rounded="true"
                      :errors="fieldErrors.username" @focus="resetError('username')"></input-item>
          <input-item icon="mail" placeholder="Email" type="email" v-model="userRegistration.email" :rounded="true"
                      :errors="fieldErrors.email" @focus="resetError('email')"></input-item>
          <input-item icon="lock" :placeholder="$t('password')" type="password" v-model="userRegistration.password"
                      :rounded="true"
                      :errors="fieldErrors.password" @focus="resetError('password')"></input-item>
          <input-item icon="lock" :placeholder="$t('passwordConfirmation')" type="password" :rounded="true"
                      v-model="userRegistration.passwordConfirmation"
                      :errors="fieldErrors.passwordConfirmation"
                      @focus="resetError('passwordConfirmation')"></input-item>
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
  import ButtonItem from '@/views/components/common/ButtonItem.vue'
  import ForestBg from '@/views/components/common/ForestBg.vue'
  import InputItem from '@/views/components/common/InputItem.vue'
  import Avatar from '@/views/components/common/Avatar.vue'
  import TransparentHeader from '@/views/components/common/TransparentHeader.vue'
  import UserRegistration from '@/types/UserRegistration'
  import {authModule} from '@/store/authModule'
  import FormError from '@/types/errors/FormError'
  import InputError from '@/views/components/common/InputError.vue'
  import UnknownError from '@/types/errors/UnknownError'
  import ToastPresenter from '@/tools/ToastPresenter'
  import ErrorMessage from '@/tools/ErrorMessage'
  import UploadButton from '@/views/components/common/UploadButton.vue'
  import PicturesModal from '@/views/modals/PicturesModal.vue'
  import ModalPresenter from '@/tools/ModalPresenter'
  import Cropper from '@/tools/Cropper'
  import Validator from '@/tools/Validator'

  @Component({
    name: 'register',
    components: {UploadButton, InputError, TransparentHeader, Avatar, ButtonItem, ForestBg, InputItem}
  })
  export default class RegisterPage extends Vue {

    userRegistration = new UserRegistration()

    fieldErrors = {}

    loadingPicture = false

    register() {
      Validator.validate(this.userRegistration)
        .then(() => Cropper.cropSquare(this.userRegistration.picture as Blob, true))
        .then((croppedImage) =>
          authModule.doRegister({...this.userRegistration, picture: croppedImage} as UserRegistration))
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

    fileSelected(file: Blob) {
      this.loadingPicture = true
      this.fieldErrors['picture'] = undefined
      Cropper.cropSquare(file)
        .then((cropped) => {
          this.loadingPicture = false
          this.$set(this.userRegistration, 'picture', cropped)
        })
    }

    openPreview() {
      this.resetError('pictures')
      ModalPresenter.present(this.$ionic, PicturesModal, {
        pictures: [this.userRegistration.picture],
        selected: 0,
        removable: true
      }).then(({data}) => {
        if (data?.index !== undefined) {
          this.$set(this.userRegistration, 'picture', undefined)
        }
      })
    }
  }
</script>
<style>
  .name-input {
    border-right: 2px solid #eee;
  }
</style>
