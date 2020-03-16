import {Route} from 'vue-router'
import {Plugins} from "@capacitor/core";

const {FirebaseAnalytics} = Plugins;

export default function afterEach(to: Route, _: Route) {
    FirebaseAnalytics.setScreenName({
        screenName: to.name,
        nameOverride: to.name
    });
}
