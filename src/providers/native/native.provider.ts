import {Plugins, StatusBarStyle} from '@capacitor/core';

const {App, SplashScreen, StatusBar, Device} = Plugins;

class NativeProvider {
  mobile: boolean

  isMobile(): Promise<boolean> {
    return ((this.mobile === undefined)
      ? Device.getInfo().then(({platform}) => {
        this.mobile = platform !== 'web'
      }) : Promise.resolve())
      .then(() => this.mobile)
  }

  setStatusBarColor(color: string) {
    this.isMobile()
      .then((isMobile) => {
        if (isMobile) {
          StatusBar.setStyle({style: StatusBarStyle.Light})
          StatusBar.setBackgroundColor({color})
        }
      })
  }

  hideSplashScreen() {
    this.isMobile()
      .then((isMobile) => {
        isMobile && SplashScreen.hide()
      })
  }
}

export const nativeProvider = new NativeProvider()
