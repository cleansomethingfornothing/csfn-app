import auth from '@/i18n/messages/auth'
import cleanups from '@/i18n/messages/cleanups'
import common from '@/i18n/messages/common'
import errors from '@/i18n/messages/errors'
import user from '@/i18n/messages/user'
import events from '@/i18n/messages/events'
import community from '@/i18n/messages/community'
import alerts from '@/i18n/messages/alerts'
import settings from '@/i18n/messages/settings'

export default {
  en: {...auth.en, ...cleanups.en, ...common.en, ...errors.en, ...user.en, ...events.en, ...community.en, ...alerts.en, ...settings.en},
  es: {...auth.es, ...cleanups.es, ...common.es, ...errors.es, ...user.es, ...events.es, ...community.es, ...alerts.es, ...settings.es}
}
