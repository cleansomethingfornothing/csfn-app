export default class ModalPresenter {
  public static present(ionic, component, props) {
    return ionic.modalController
      .create({
        showBackdrop: false,
        component,
        componentProps: {
          propsData: props
        }
      })
      .then(modal => modal.present()
        .then(() => modal.onWillDismiss()))
  }
}
