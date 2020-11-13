<template>
  <ion-page>
    <ion-header mode="ios">
      <ion-toolbar mode="ios">
        <ion-buttons slot="start">
          <ion-button shape="round" fill="clear" @click="$router.back()">
            <ion-icon name="arrow-back"></ion-icon>
          </ion-button>
        </ion-buttons>
        <ion-title>
          <span class="flex items-center justify-center">
          <ion-icon :src="require('ionicons5/dist/svg/shield-outline.svg')" class="mr-2 -ml-2"></ion-icon>
          {{ $t('security') }}
          </span>
        </ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content class="flex flex-col justify-between">
      <ion-list class="list-large-items">
        <ion-item button @click="changeEmail">
          <ion-icon slot="start" :src="require('ionicons5/dist/svg/mail-outline.svg')" color="dark"></ion-icon>
          <ion-label>{{ $t('change-email') }}</ion-label>
        </ion-item>
        <ion-item button @click="changePassword">
          <ion-icon slot="start" :src="require('ionicons5/dist/svg/lock-closed-outline.svg')" color="dark"></ion-icon>
          <ion-label>{{ $t('change-password') }}</ion-label>
        </ion-item>
      </ion-list>
    </ion-content>
    <ion-footer>
      <ion-item lines="none" button detail="false" class="large-item" @click="deleteAccount">
        <ion-label class="text-center" color="danger">{{ $t('delete-account') }}</ion-label>
      </ion-item>
    </ion-footer>
  </ion-page>
</template>
<script lang="ts">
import {Component, Vue} from 'vue-property-decorator'
import ModalPresenter from '@/tools/ModalPresenter'
import ChangeEmailModal from '@/views/modals/ChangeEmailModal.vue'
import {userModule} from '@/store/userModule'
import ChangePasswordModal from '@/views/modals/ChangePasswordModal.vue'
import DeleteAccountModal from '@/views/modals/DeleteAccountModal.vue'

@Component({
  name: 'SecuritySettingsPage'
})
export default class SecuritySettingsPage extends Vue {

  get currentUser() {
    return userModule.getCurrentUser
  }

  changeEmail() {
    ModalPresenter.present(this.$ionic, ChangeEmailModal, {
      t: {
        title: this.$t('change-email'),
        save: this.$t('save'),
        currentEmailLabel: this.$t('current-email'),
        newEmailLabel: this.$t('new-email'),
        passwordLabel: this.$t('password'),
        newEmailMessage: this.$t('new-email-message'),
        passwordMessage: this.$t('current-password-message'),
        success: this.$t('change-email-success'),
        sameEmailError: this.$t('same-email-error')
      },
      ionic: this.$ionic,
      currentEmail: this.currentUser.email
    }).then(({data}) => {
      if (data) {
        this.$router.push('/home/user')
      }
    })
  }

  changePassword() {
    ModalPresenter.present(this.$ionic, ChangePasswordModal, {
      t: {
        title: this.$t('change-password'),
        save: this.$t('save'),
        currentPasswordLabel: this.$t('current-password'),
        currentPasswordMessage: this.$t('current-password-message'),
        newPasswordLabel: this.$t('newPassword'),
        newPasswordMessage: this.$t('new-password-message'),
        samePasswordError: this.$t('same-password-error'),
        success: this.$t('change-password-success')
      },
      ionic: this.$ionic,
      currentEmail: this.currentUser.email
    }).then(({data}) => {
      if (data) {
        this.$router.push('/home/user')
      }
    })
  }

  deleteAccount() {
    ModalPresenter.present(this.$ionic, DeleteAccountModal, {
      t: {
        title: this.$t('delete-account'),
        password: this.$t('password'),
        currentPasswordMessage: this.$t('current-password-message'),
        delete: this.$t('delete'),
        deleteMessage: this.$t('delete-account-message'),
        deleteConfirmation: this.$t('delete-account-confirmation'),
        success: this.$t('Your account was deleted'),
        accept: this.$t('accept'),
        cancel: this.$t('cancel')
      },
      ionic: this.$ionic
    }).then(({data}) => {
      if (data) {
        this.$router.push('/login')
      }
    })
  }
}
</script>
<style scoped>

</style>
