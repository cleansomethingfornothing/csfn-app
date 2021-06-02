import CSFNError from '@/types/errors/CSFNError'

export default class UnknownError implements CSFNError {

  message = 'unknown-error'
  param: string

  constructor(action: string) {
    this.param = action
  }

}
