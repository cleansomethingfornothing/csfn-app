import VueI18n from 'vue-i18n'
import {messages} from '@/i18n/messages'
import Vue from 'vue'

Vue.use(VueI18n)

export const i18n = new VueI18n({
  locale: /^es.*/.test(window.navigator.language) ? 'es' : 'en',
  messages
})
