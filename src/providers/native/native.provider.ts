import {Plugins, StatusBarStyle} from '@capacitor/core';

const {App, SplashScreen, StatusBar, Device} = Plugins;

class NativeProvider {

  mobile: boolean
  ios: boolean
  statusBarStyle: StatusBarStyle
  hidden = false

  isMobile(): Promise<boolean> {
    return ((this.mobile === undefined)
      ? Device.getInfo().then(({platform}) => {
        this.mobile = platform !== 'web'
      }) : Promise.resolve())
      .then(() => this.mobile)
  }

  isIOS(): Promise<boolean> {
    return ((this.ios === undefined)
      ? Device.getInfo().then(({platform}) => {
        this.ios = platform === 'ios'
      }) : Promise.resolve())
      .then(() => this.ios)
  }

  hideSplashScreen() {
    if (!this.hidden) {
      this.isMobile()
        .then((isMobile) => {
          if (isMobile) {
            window.screen.orientation.lock('portrait');
            StatusBar.setStyle({style: StatusBarStyle.Light})
            StatusBar.setOverlaysWebView({overlay: true})
            SplashScreen.hide()
            this.hidden = true
          }
        })
    }
  }
}

export const nativeProvider = new NativeProvider()
