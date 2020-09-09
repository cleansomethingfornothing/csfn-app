<template>
  <ion-page>
    <ion-header mode="ios">
      <ion-toolbar mode="ios">
        <ion-buttons slot="start">
          <ion-button shape="round" fill="clear" @click="dismiss(false)">
            <ion-icon name="arrow-back"></ion-icon>
          </ion-button>
        </ion-buttons>
        <ion-title>
          {{t.title}}
        </ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <form @submit="save" @keyup.enter="save">
        <input-item :label="t.currentPasswordLabel" :placeholder="t.currentPasswordMessage" v-model="password"
                    :errors="fieldErrors.password" @focus="fieldErrors.password = undefined" type="password"/>
        <input-item :label="t.newPasswordLabel" :placeholder="t.newPasswordMessage" v-model="newPassword"
                    :errors="fieldErrors.newPassword" @focus="fieldErrors.newPassword = undefined"
                    type="password"/>
        <div class="flex justify-center mt-4">
          <ion-button mode="ios" shape="round" class="w-1/2" @click="save" :disabled="loading">
            {{t.save}}
          </ion-button>
        </div>
      </form>
    </ion-content>
  </ion-page>
</template>
<script lang="ts">
    import {Component, Prop, Vue} from 'vue-property-decorator'
    import InputItem from '@/views/components/common/InputItem.vue'
    import {authModule} from '@/store/authModule'
    import ErrorMessage from '@/tools/ErrorMessage'
    import FormError from '@/types/errors/FormError'
    import UnknownError from '@/types/errors/UnknownError'
    import ToastPresenter from '@/tools/ToastPresenter'
    import FieldError from '@/types/errors/FieldError'

    @Component({
        name: 'ChangePasswordModal',
        components: {InputItem}
    })
    export default class ChangePasswordModal extends Vue {

        @Prop(Object)
        t: Record<string, string>

        @Prop(Object)
        ionic: any

        password = ''
        newPassword = ''

        fieldErrors = {
            password: [],
            newPassword: []
        }
        loading = false

        save() {
            if (!this.password) {
                this.fieldErrors.password = [ErrorMessage.getMessage(new FieldError('password', 'required-error-f'))]
            }
            if (!this.newPassword) {
                this.fieldErrors.newPassword = [ErrorMessage.getMessage(new FieldError('newPassword', 'required-error-f'))]
            }
            if (!this.password || !this.newPassword) {
                return
            }
            if (this.password === this.newPassword) {
                this.fieldErrors.newPassword = [this.t.samePasswordError]
                return
            }
            this.loading = true
            authModule.changePassword({currentPassword: this.password, newPassword: this.newPassword})
                .then(() => {
                    ToastPresenter.present(this.ionic, this.t.success, 'success')
                    this.dismiss(true)
                })
                .catch(error => {
                    if (error instanceof FormError) {
                        error.fieldErrors.forEach((fieldError) => {
                            this.$set(this.fieldErrors, fieldError.param,
                                [ErrorMessage.getMessage(fieldError)])
                        })
                    }
                    if (error instanceof UnknownError) {
                        ToastPresenter.present(this.ionic, ErrorMessage.getMessage(error))
                    }
                    this.loading = false
                })
        }

        dismiss(updated: boolean) {
            this.$ionic.modalController.dismiss(updated)
        }
    }
</script>
