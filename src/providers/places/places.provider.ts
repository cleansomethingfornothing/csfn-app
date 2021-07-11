import axios, { AxiosInstance } from 'axios'
import { countries } from 'countries-list'
import Coords from '@/types/Coords'
import UnknownError from '@/types/errors/UnknownError'
import Address from '@/types/Address'
import Location from '@/types/Location'
import _ from 'lodash'

const baseUrl = 'https://nominatim.openstreetmap.org'
const reverseURL = '/reverse'
const searchURL = '/search'

class PlacesProvider {

  axios: AxiosInstance

  constructor() {
    this.axios = axios.create({
      baseURL: baseUrl
    })
  }

  getAddress(coords: Coords): Promise<Address> {
    return this.axios.get(reverseURL, {
      params: {
        lat: coords.lat,
        lon: coords.lng,
        format: 'json',
        addressdetails: 1,
        'accept-language': 'en'
      }
    }).then(({ data }) => {
      const countryCode = data.address.country_code.toUpperCase()
      return new Address(data.address.city || data.address.town || data.address.village || data.address.hamlet,
        data.address.state || data.address.county, countries[countryCode].name, countryCode)
    }).catch(() => Promise.reject(new UnknownError('obtain-location')))
  }

  searchPlace(query: string,
              country: string): Promise<Location[]> {
    return this.axios.get(searchURL, {
      params: {
        q: query,
        addressdetails: 1,
        format: 'json',
        'accept-language': 'en'
      }
    }).then(({ data }) => _.uniqWith<Location>(data
      .filter(({ type, address }) => type == 'administrative' && [address.city, address.town, address.village, address.hamlet, address.state || address.county, address.country, address.country_code]
        .some(field => field && field.toLowerCase().includes(query.toLowerCase())))
      .map(({ address, lat, lon }) => new Location(
        new Address(address.city || address.town || address.village || address.hamlet, address.state || address.county, address.country, address.country_code.toUpperCase()),
        new Coords(Number(lat), Number(lon)))), _.isEqual)
    ).catch((error) => {
      console.log(error)
      return Promise.reject(new UnknownError('search-place'))
    })
  }

}

export const placesProvider = new PlacesProvider()
