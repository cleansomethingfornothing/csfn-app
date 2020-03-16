import FieldError from '@/types/errors/FieldError'
import CSFNError from '@/types/errors/CSFNError'

export default class FormError implements CSFNError {
    param = undefined
    message = undefined

    fieldErrors: FieldError[]

    constructor(fieldErrors: FieldError[]) {
        this.fieldErrors = fieldErrors
    }
}
