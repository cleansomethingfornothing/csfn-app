import { Route } from 'vue-router'
import { FirebaseAnalytics } from '@capacitor-community/firebase-analytics'

export default function afterEach(to: Route,
                                  _: Route) {
  FirebaseAnalytics.setScreenName({
    screenName: to.name,
    nameOverride: to.name
  })
}
