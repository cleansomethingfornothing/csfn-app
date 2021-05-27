import FormError from '@/types/errors/FormError'
import FieldError from '@/types/errors/FieldError'
import UnknownError from '@/types/errors/UnknownError'
import {HttpResponse} from '@capacitor-community/http'

export const handleBackError = (action: string) => (error: Partial<HttpResponse>) => {
    try {
        if (error.status === 400 && error.data.message) {
            return Promise.reject(new FormError(error.data.message.map(({property, constraints}) => new FieldError(property, Object.keys(constraints)[0]))))
        }
        if (error.status === 404 && error.data.message) {
            return Promise.reject(new FormError([new FieldError(error.data.message, 'not-found')]))
        }
        if (error.status === 401) {
            if (error.data.message === 'invalidEmail') {
                return Promise.reject(new FormError([new FieldError('email', 'invalidEmail')]))
            } else if (error.data.message === 'invalidPassword') {
                return Promise.reject(new FormError([new FieldError('password', 'invalidPassword')]))
            }
        }
    } catch (e) {
        //
    }
    return Promise.reject(new UnknownError(action))
}
