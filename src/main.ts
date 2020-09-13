import "reflect-metadata"; // Siempre en la primera línea
import Vue from 'vue'
import Main from './App.vue'
import Ionic from '@ionic/vue'
import {store} from '@/store'
import {router} from '@/router'
import {i18n} from '@/i18n'
import {Plugins, registerWebPlugin} from '@capacitor/core'
import {FacebookLogin} from '@capacitor-community/facebook-login';
import { defineCustomElements } from '@ionic/pwa-elements/loader';
import './icons'
import './assets/style/tailwind.css'


Vue.config.productionTip = false
Vue.config.ignoredElements = [/^ion-/]

registerWebPlugin(FacebookLogin)

Vue.use(Ionic)

new Vue({store, router, i18n, render: h => h(Main)})
  .$mount('#app')

defineCustomElements(window)
