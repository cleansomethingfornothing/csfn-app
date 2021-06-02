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
          {{ t.title }}
        </ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <form @submit.prevent="doDelete">
        <input-item :label="t.password" :placeholder="t.currentPasswordMessage" v-model="password"
                    :errors="error ? [error]: undefined" @focus="error = ''"
                    type="password"/>
        <div class="p-4">
          {{ t.deleteMessage }}
        </div>
        <div class="flex justify-center mt-4">
          <ion-button mode="ios" shape="round" class="w-1/2" :disabled="loading" type="submit">
            {{ t.delete }}
          </ion-button>
        </div>
      </form>
    </ion-content>
  </ion-page>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import InputItem from '@/views/components/common/InputItem.vue'
import { authModule } from '@/store/authModule'
import ErrorMessage from '@/tools/ErrorMessage'
import FormError from '@/types/errors/FormError'
import UnknownError from '@/types/errors/UnknownError'
import ToastPresenter from '@/tools/ToastPresenter'
import FieldError from '@/types/errors/FieldError'
import { appModule } from '@/store/appModule'

@Component({
  name: 'ChangePasswordModal',
  components: { InputItem }
})
export default class DeleteAccountModal extends Vue {

  @Prop(Object)
  t: Record<string, string>

  @Prop(Object)
  ionic: any

  password = ''
  error = ''
  loading = false

  doDelete() {
    if (!this.password) {
      this.error = ErrorMessage.getMessage(new FieldError('password', 'required-error-f'))
      return
    }

    this.ionic.alertController.create({
      message: this.t.deleteConfirmation,
      buttons: [{
        text: this.t.cancel,
        role: 'cancel'
      }, {
        text: this.t.accept,
        handler: () => {
          this.confirmDelete()
        }
      }]
    }).then((alert) => alert.present())
  }

  confirmDelete() {
    this.loading = true
    appModule.showLoader(this.ionic)
      .then(() => authModule.deleteAccount(this.password))
      .then(() => {
        appModule.hideLoader()
        ToastPresenter.present(this.ionic, this.t.success, 'success')
        this.dismiss(true)
      })
      .catch(error => {
        appModule.hideLoader()
        if (error instanceof FormError) {
          error.fieldErrors.forEach((fieldError) => {
            this.error = ErrorMessage.getMessage(fieldError)
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
