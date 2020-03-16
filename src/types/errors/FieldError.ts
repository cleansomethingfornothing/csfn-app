import CSFNError from '@/types/errors/CSFNError'

export default class FieldError implements CSFNError {

  message: string
  param: string

  constructor(field: string, message: string) {
    this.param = field
    this.message = message
  }
}
