import 'reflect-metadata' // Siempre en la primera línea
import Vue from 'vue'
import Main from './App.vue'
import Ionic from '@ionic/vue'
import { store } from '@/store'
import { router } from '@/router'
import { i18n } from '@/i18n'
import { registerWebPlugin } from '@capacitor/core'
import { FacebookLogin } from '@capacitor-community/facebook-login'
import '@codetrix-studio/capacitor-google-auth'
import '@capacitor-community/firebase-analytics'
import { defineCustomElements } from '@ionic/pwa-elements/loader'
import './icons'
import './assets/style/tailwind.css'
import * as _ from 'lodash'

Vue.config.productionTip = false
Vue.config.ignoredElements = [/^ion-/]

registerWebPlugin(FacebookLogin)

Vue.use(Ionic)

Vue.filter('capitalize', function (value) {
  return _.capitalize(value)
})

Vue.filter('localeString', function (value) {
  return Number(value).toLocaleString()
})

new Vue({ store, router, i18n, render: h => h(Main) })
  .$mount('#app')

defineCustomElements(window)
