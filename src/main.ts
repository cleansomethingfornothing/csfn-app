import "reflect-metadata"; // Siempre en la primera línea
import Vue from 'vue'
import Main from './App.vue'
import Ionic from '@ionic/vue'
import './icons'
import {store} from '@/store'
import {router} from '@/router'
import {i18n} from '@/i18n'
import './assets/style/tailwind.css'
import {AppRestoredResult, Plugins} from '@capacitor/core'

const {App, SplashScreen, StatusBar, Device} = Plugins;

Vue.config.productionTip = false
Vue.config.ignoredElements = [/^ion-/]

Vue.use(Ionic)

new Vue({store, router, i18n, render: h => h(Main)})
  .$mount('#app')

