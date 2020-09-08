<template>
  <ion-page>
    <ion-header mode="ios">
      <ion-toolbar mode="ios">
        <ion-buttons slot="start">
          <ion-button shape="round" fill="clear" @click="dismiss()">
            <ion-icon name="arrow-back"></ion-icon>
          </ion-button>
        </ion-buttons>
        <ion-title>
          {{t.title}}
        </ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-item lines="full">
        <ion-label>
          <ion-text>
            <span class="font-bold text-xs">{{t.currentEmailLabel}}</span>
          </ion-text>
          <ion-text>
            <p>
              {{currentEmail}}
            </p>
          </ion-text>
        </ion-label>
      </ion-item>
      <form @submit="save" @keyup.enter="save">
        <input-item :label="t.newEmailLabel" :placeholder="t.newEmailMessage" v-model="change.email"
                    :errors="fieldErrors.email" @focus="fieldErrors.email = undefined"/>
        <input-item :label="t.passwordLabel" :placeholder="t.passwordMessage" v-model="change.password"
                    :errors="fieldErrors.password" @focus="fieldErrors.password = undefined"
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
    import User from '@/types/User'

    @Component({
        name: 'ChangeEmailModal',
        components: {InputItem}
    })
    export default class ChangeEmailModal extends Vue {

        @Prop(Object)
        t: Record<string, string>

        @Prop(String)
        currentEmail: string

        @Prop(Object)
        ionic: any

        change = new User()

        fieldErrors = {
            email: [],
            password: []
        }
        loading = false

        save() {
            if (this.change.email === this.currentEmail) {
                this.fieldErrors.email = [this.t.sameEmailError]
                return
            }
            this.loading = true
            authModule.changeEmail(this.change)
                .then(() => {
                    ToastPresenter.present(this.ionic, this.t.success, 'success')
                    this.dismiss()
                })
                .catch(error => {
                    console.log(error)
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

        dismiss() {
            this.$ionic.modalController.dismiss()
        }
    }
</script>
