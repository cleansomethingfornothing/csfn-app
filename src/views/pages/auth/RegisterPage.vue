<template>
    <ion-page class="ion-page register-page">
        <transparent-header :always-transparent="true" :title="$t('create-account')"></transparent-header>
        <ion-content class="fullscreen">
            <forest-bg></forest-bg>
            <div :style="'--keyboard-height: ' + keyboardHeight + 'px'"
                 class="w-full h-full flex flex-col justify-center items-center">
                <form :class="{'translate-form': focused}" action="javascript:void(0)"
                      class="auth-form register-form z-10" @keyup.enter="register">
                    <div class="w-full">
                        <div class="w-2/5 m-auto">
                            <upload-button :file="userRegistration.picture"
                                           :loading="loadingPicture"
                                           :rounded="true" @click="userRegistration.picture && openPreview($event)"
                                           @loading="loadingPicture = $event"
                                           @select="fileSelected"></upload-button>
                        </div>
                        <input-error :error="this.fieldErrors.picture && this.fieldErrors.picture[0]"></input-error>
                    </div>
                    <input-item v-model="userRegistration.username" :errors="fieldErrors.username"
                                :placeholder="$t('username')"
                                :rounded="true"
                                icon="person"
                                type="text" @focus="resetError('username')"></input-item>
                    <input-item v-model="userRegistration.email" :errors="fieldErrors.email" :rounded="true" icon="mail"
                                placeholder="Email"
                                type="email" @focus="resetError('email')"></input-item>
                    <input-item v-model="userRegistration.password" :errors="fieldErrors.password"
                                :placeholder="$t('password')"
                                :rounded="true"
                                icon="lock-closed"
                                type="password" @focus="resetError('password')"></input-item>
                    <button-item :text="$t('create-account')" class="text-center" color="primary" type="button"
                                 @click="register"></button-item>
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
import User from '@/types/User'
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
import {CREATE} from '@/types/ValidationGroups'
import {appModule} from '@/store/appModule'
import {KeyboardInfo, Plugins} from '@capacitor/core'

const {Keyboard} = Plugins

@Component({
    name: 'register',
    components: {UploadButton, InputError, TransparentHeader, Avatar, ButtonItem, ForestBg, InputItem}
})
export default class RegisterPage extends Vue {

    userRegistration = new User()
    focused = false
    keyboardHeight = 0

    fieldErrors = {
        email: [],
        password: [],
        picture: [],
        username: []
    }

    loadingPicture = false

    mounted() {
        Keyboard.addListener('keyboardWillShow', (info: KeyboardInfo) => {
            this.focused = true
            this.keyboardHeight = info.keyboardHeight
        })
        Keyboard.addListener('keyboardWillHide', () => {
            this.focused = false
        })
    }

    destroyed(): void {
        Keyboard.removeAllListeners()
    }

    register() {
        Validator.validate(this.userRegistration, CREATE)
            .then(() => Cropper.cropSquare(this.userRegistration.picture as Blob, true))
            .then((croppedImage) => appModule.showLoader(this.$ionic)
                .then(() => authModule.doRegister({...this.userRegistration, picture: croppedImage} as User)))
            .then(() => {
                appModule.hideLoader()
                this.$router.replace('/welcome')
            })
            .catch(error => {
                console.error(error)
                appModule.hideLoader()
                if (error instanceof FormError) {
                    error.fieldErrors.forEach((fieldError) => {
                        this.$set(this.fieldErrors, fieldError.param, [ErrorMessage.getMessage(fieldError)])
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

    openPreview(event) {
        event.preventDefault()
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

.register-form {
    bottom: calc(50% - 200px);
    position: absolute;
    transition: all 0.3s;
}

.translate-form {
    bottom: calc(var(--keyboard-height) + 10px);
    top: auto;
}
</style>
