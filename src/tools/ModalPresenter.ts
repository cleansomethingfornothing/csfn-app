export default class ModalPresenter {
  public static present(ionic, component, props, cssClass?, showBakdrop?) {
    return ionic.modalController
      .create({
        showBackdrop: showBakdrop,
        cssClass,
        component,
        componentProps: {
          propsData: props
        }
      })
      .then(modal => modal.present()
        .then(() => modal.onWillDismiss()))
  }
}
