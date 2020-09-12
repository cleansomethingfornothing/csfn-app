import "reflect-metadata"; // Siempre en la primera línea
import Vue from 'vue'
import Main from './App.vue'
import Ionic from '@ionic/vue'
import {store} from '@/store'
import {router} from '@/router'
import {i18n} from '@/i18n'
import {Plugins} from '@capacitor/core'
import './icons'
import './assets/style/tailwind.css'
import '@capacitor-community/http';

const {App, SplashScreen, StatusBar, Device} = Plugins

Vue.config.productionTip = false
Vue.config.ignoredElements = [/^ion-/]

Vue.use(Ionic)

new Vue({store, router, i18n, render: h => h(Main)})
  .$mount('#app')

