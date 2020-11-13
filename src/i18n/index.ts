import VueI18n from 'vue-i18n'
import messages from './messages'
import Vue from 'vue'
import moment from 'moment'

Vue.use(VueI18n)

const locale = /^es.*/.test(window.navigator.language) ? 'es' : 'en'

moment.locale(locale)

export const i18n = new VueI18n({
    locale,
    messages
})
