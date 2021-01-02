<template>
    <ion-page class="ion-page">
        <ion-header mode="ios">
            <ion-toolbar mode="ios">
                <ion-buttons slot="start">
                    <ion-button fill="clear" shape="round" @click="$router.back()">
                        <ion-icon name="arrow-back"></ion-icon>
                    </ion-button>
                </ion-buttons>
                <ion-title>{{ $t('settings') }}</ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content class="list-large-items">
            <ion-list>
                <ion-item button @click="$router.push('/profile-settings')">
                    <ion-icon slot="start" :src="require('ionicons5/dist/svg/person-outline.svg')"
                              color="back"></ion-icon>
                    <ion-label>{{ $t('profile') }}</ion-label>
                </ion-item>
                <ion-item button @click="$router.push('/security-settings')">
                    <ion-icon slot="start" :src="require('ionicons5/dist/svg/shield-outline.svg')"
                              color="back"></ion-icon>
                    <ion-label>{{ $t('security') }}</ion-label>
                </ion-item>
                <ion-item button @click="openPrivacyPolicy">
                    <ion-icon slot="start" :src="require('ionicons5/dist/svg/information-circle-outline.svg')"
                              color="black"></ion-icon>
                    <ion-label>{{ $t('privacy-policy') }}</ion-label>
                </ion-item>
                <ion-item button detail="false" @click="logout">
                    <ion-icon slot="start" color="black" name="power"></ion-icon>
                    <ion-label>{{ $t('logout') }}</ion-label>
                </ion-item>
            </ion-list>
        </ion-content>
    </ion-page>
</template>
<script lang=ts>
import Vue from 'vue'
import Component from 'vue-class-component'
import {authModule} from '@/store/authModule'
import {appModule} from '@/store/appModule'

@Component({
    name: 'SettingsPage'
})
export default class SettingsPage extends Vue {


    openPrivacyPolicy() {
        window.open('https://www.cleansomethingfornothing.com/app-privacy-policy/', '_system', 'location=yes')
    }


    logout() {
        appModule.showLoader(this.$ionic)
            .then(() => authModule.doLogout())
            .then(() => {
                appModule.hideLoader()
                this.$router.replace('/login')
            })
            .catch(() => {
                appModule.hideLoader()
            })
    }

}
</script>
