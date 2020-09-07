import FormError from '@/types/errors/FormError'
import FieldError from '@/types/errors/FieldError'
import {AxiosError} from 'axios'

export const handleBackError = (error: AxiosError) => {
  try {
    if (error.response.status === 400 && error.response.data.message) {
      return Promise.reject(new FormError(error.response.data.message.map(({property, constraints}) => new FieldError(property, Object.keys(constraints)[0]))))
    }
  } catch (e) {
    //
  }
  return Promise.reject(error)
}
