<template>
    <ion-page>
        <ion-header mode="ios">
            <ion-toolbar mode="ios">
                <ion-buttons slot="start">
                    <ion-button fill="clear" shape="round" @click="$router.back()">
                        <ion-icon name="arrow-back"></ion-icon>
                    </ion-button>
                </ion-buttons>
                <ion-title>
          <span class="flex items-center justify-center">
          <ion-icon :src="require('ionicons5/dist/svg/person-outline.svg')" class="mr-2 -ml-2"></ion-icon>
          {{ $t('profile') }}
          </span>
                </ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content>
            <div class="mx-auto my-6 w-2/5 rounded-full border-solid border-4 border-white shadow-md">
                <upload-button :rounded="true" :url="user.picture.publicUrl" @select="updatePicture"/>
            </div>

            <ion-list>
                <input-item ref="username-input" :label="$t('username')" :readonly="true" :value="user.username"
                            @focus="doEditUsername">
                    <div slot="end" class="m-auto">
                        <ion-button color="medium" fill="clear" shape="round" size="medium"
                                    style="width: 2.3rem; --padding-start: 2px; --padding-end: 2px">
                            <ion-icon slot="icon-only" class="m-0" name="pencil-sharp"/>
                        </ion-button>
                    </div>
                </input-item>
                <ion-item>
                    <ion-label class="font-bold" position="stacked">{{ $t('country') }}</ion-label>
                    <ion-select :value="user.country" @ionChange="updateUserCountry($event.detail.value)">
                        <ion-select-option v-for="country in countries" :key="country.code" :value="country.code">
                            {{ country.emoji }}&nbsp;&nbsp;{{ country.name }}
                        </ion-select-option>
                    </ion-select>
                </ion-item>
            </ion-list>
        </ion-content>
    </ion-page>
</template>
<script lang="ts">
import {Component, Vue} from 'vue-property-decorator'
import UploadButton from '@/views/components/common/UploadButton.vue'
import {userModule} from '@/store/userModule'
import User from '@/types/User'
import InputItem from '@/views/components/common/InputItem.vue'
import {countries} from 'countries-list'
import _ from 'lodash'
import ToastPresenter from '@/tools/ToastPresenter'
import ErrorMessage from '@/tools/ErrorMessage'
import UnknownError from '@/types/errors/UnknownError'
import FormError from '@/types/errors/FormError'
import {appModule} from '@/store/appModule'
import Cropper from '@/tools/Cropper'

@Component({
    name: 'profile-settings-page',
    components: {InputItem, UploadButton}
})
export default class ProfileSettingsPage extends Vue {

    originalUsername = ''

    get user(): User {
        return userModule.getCurrentUser
    }

    get countries() {
        return _.sortBy(Object.entries(countries).map(([code, country]) => ({
            code,
            name: country.name,
            emoji: country.emoji
        })), (c) => c.name)
    }

    mounted() {
        this.originalUsername = this.user.username
    }

    doEditUsername() {
        this.$ionic.alertController.create({
            message: this.$t('new-username-message').toString(),
            cssClass: 'username-alert',
            inputs: [{
                name: 'username',
                id: 'username',
                placeholder: this.user.username,
                type: 'text'
            }],
            buttons: [{
                text: this.$t('cancel').toString(),
                role: 'cancel'
            }, {
                text: this.$t('save').toString(),
                handler: (data) => {
                    this.updateUsername(data.username)
                }
            }]
        }).then(alert => alert.present())
    }

    updatePicture(picture) {
        appModule.showLoader(this.$ionic)
            .then(() => Cropper.cropSquare(picture as Blob, true))
            .then((cropped) => userModule.updateUserPicture(cropped))
            .then(() => this.handleSuccess())
            .catch((error) => this.handleError(error))
    }

    updateUsername(username: string) {
        if (this.originalUsername === username) {
            return
        }
        appModule.showLoader(this.$ionic)
            .then(() => userModule.updateUser({username}))
            .then(() => this.handleSuccess())
            .catch((error) => this.handleError(error))
    }

    updateUserCountry(country: string) {
        appModule.showLoader(this.$ionic)
            .then(() => userModule.updateUser({country}))
            .then(() => this.handleSuccess())
            .catch((error) => this.handleError(error))
    }

    handleSuccess() {
        appModule.hideLoader()
        ToastPresenter.present(this.$ionic, this.$t('update-profile-success'), 'success')
    }

    handleError(error) {
        appModule.hideLoader()
        if (error instanceof FormError) {
            ToastPresenter.present(this.$ionic, ErrorMessage.getMessage(error.fieldErrors[0]))
        } else if (error instanceof UnknownError) {
            ToastPresenter.present(this.$ionic, ErrorMessage.getMessage(error))
        }
    }
}
</script>
<style>

.username-alert .alert-input-group.sc-ion-alert-md {
    padding-top: 0 !important;
}

.username-alert .alert-message.sc-ion-alert-md {
    padding-bottom: 0 !important;
}

</style>
