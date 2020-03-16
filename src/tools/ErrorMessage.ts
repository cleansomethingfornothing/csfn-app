import CSFNError from '../types/errors/CSFNError'
import {i18n} from '../i18n'

export default class ErrorMessage {
  public static getMessage(error: CSFNError): string {
    return (i18n.t('errors.' + error.message,
      {param: (i18n.t(error.param) as string).toLowerCase()}) as string)
  }
}
