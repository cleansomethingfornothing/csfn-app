import FormError from '@/types/errors/FormError'
import FieldError from '@/types/errors/FieldError'
import {AxiosError} from 'axios'
import UnknownError from '@/types/errors/UnknownError'

export const handleBackError = (action: string) => (error: AxiosError) => {
  try {
    if (error.response.status === 400 && error.response.data.message) {
      return Promise.reject(new FormError(error.response.data.message.map(({property, constraints}) => new FieldError(property, Object.keys(constraints)[0]))))
    }
    if (error.response.status === 404 && error.response.data.message) {
      return Promise.reject(new FormError([new FieldError(error.response.data.message, 'not-found')]))
    }
    if (error.response.status === 401) {
      if (error.response.data.message === 'invalidEmail') {
        return Promise.reject(new FormError([new FieldError('email', 'invalidEmail')]))
      } else if (error.response.data.message === 'invalidPassword') {
        return Promise.reject(new FormError([new FieldError('password', 'invalidPassword')]))
      }
    }
  } catch (e) {
    //
  }
  return Promise.reject(new UnknownError(action))
}
