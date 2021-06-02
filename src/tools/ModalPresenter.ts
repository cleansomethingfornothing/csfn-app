export default class ModalPresenter {
  public static present(ionic,
                        component,
                        props?,
                        cssClass?,
                        hideBackdrop?) {
    return ionic.modalController
      .create({
        showBackdrop: !hideBackdrop,
        mode: 'ios',
        cssClass,
        component,
        componentProps: {
          propsData: props
        }
      })
      .then(modal => modal.present().then(() => modal.onWillDismiss()))
  }
}
