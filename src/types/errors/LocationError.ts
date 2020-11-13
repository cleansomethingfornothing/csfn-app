import CSFNError from '@/types/errors/CSFNError'

export default class LocationError implements CSFNError {
    message: 'location-error'
    param = undefined
}
