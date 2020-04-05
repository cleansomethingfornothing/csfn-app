import axios, {AxiosInstance} from 'axios'
import Coords from '@/types/Coords'
import UnknownError from '@/types/errors/UnknownError'
import Address from '@/types/Address'
import Location from '@/types/Location'

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
        addressdetails: 1
      }
    }).then(({data}) => {
      return new Address(data.address.city || data.address.town || data.address.village || data.address.hamlet, data.address.state, data.address.country, data.address.country_code.toUpperCase())
    }).catch(() => Promise.reject(new UnknownError('obtain-location')))
  }

  searchPlace(query: string, country: string): Promise<Location[]> {
    return this.axios.get(searchURL, {
      params: {
        q: query,
        countrycodes: country,
        addressdetails: 1,
        format: 'json'
      }
    }).then(({data}) => {
      const places = data
        .filter((location) => location.type == 'administrative' && (location.address.city || location.address.town || location.address.village || location.address.hamlet))
        .map(({address, lat, lon}) => new Location(
          new Address(address.city || address.town || address.village || address.hamlet, address.state, address.country, address.country_code.toUpperCase()),
          new Coords(Number(lat), Number(lon))))
      return PlacesProvider.uniqueResults(places)
    }).catch((error) => {
      console.log(error)
      return Promise.reject(new UnknownError('search-place'))
    })
  }

  private static uniqueResults(results: Location[]): Location[] {
    const unique: Location[] = []
    results.forEach(r => {
      if (!unique.find(u => u.equals(r))) {
        unique.push(r)
      }
    })
    return unique
  }

}

export const placesProvider = new PlacesProvider()
