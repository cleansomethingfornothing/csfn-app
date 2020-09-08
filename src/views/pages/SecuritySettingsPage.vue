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
          <ion-icon name="shield-outline" class="mr-2 -ml-2"></ion-icon>
          {{$t('security')}}
          </span>
        </ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content class="flex flex-col justify-between">
      <ion-list class="list-large-items">
        <ion-item button @click="changeEmail">
          <ion-icon slot="start" name="mail-outline" color="dark"></ion-icon>
          <ion-label>{{$t('change-email')}}</ion-label>
        </ion-item>
        <ion-item button @click="changePassword">
          <ion-icon slot="start" name="lock-closed-outline" color="dark"></ion-icon>
          <ion-label>{{$t('change-password')}}</ion-label>
        </ion-item>
      </ion-list>
    </ion-content>
    <ion-footer>
      <ion-item lines="none" button detail="false" class="large-item">
        <ion-label class="text-center" color="danger">{{$t('delete-account')}}</ion-label>
      </ion-item>
    </ion-footer>
  </ion-page>
</template>
<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator'
    import ModalPresenter from '@/tools/ModalPresenter'
    import ChangeEmailModal from '@/views/modals/ChangeEmailModal.vue'
    import {userModule} from '@/store/userModule'

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
                    passwordMessage: this.$t('password-message'),
                    success: this.$t('change-email-success'),
                    sameEmailError: this.$t('same-email-error')
                },
                ionic: this.$ionic,
                currentEmail: this.currentUser.email
            }).then(() => this.$router.push('/home/user'))
        }

        changePassword() {
            //
        }
    }
</script>
<style scoped>

</style>
