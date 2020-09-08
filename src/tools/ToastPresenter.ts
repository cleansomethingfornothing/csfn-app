import {Toast} from '@ionic/core/dist/types/components/toast/toast'

export default class ToastPresenter {
  private static toast: Toast

  public static present(ionic, message: string, color = 'danger') {
    if (this.toast) {
      this.toast.dismiss()
    }

    ionic.toastController.create({
      message: message,
      position: 'top',
      mode: 'ios',
      duration: 3000,
      color,
      keyboardClose: true,
      buttons: [{
        text: 'Ok',
        role: 'cancel'
      }]
    }).then((toast) => {
      ToastPresenter.toast = toast
      toast.present()
    })
  }
}
