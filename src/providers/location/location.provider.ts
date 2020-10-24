import axios from 'axios'
import Coords from '@/types/Coords'
import {Plugins} from '@capacitor/core'
import LocationError from '@/types/errors/LocationError'
import distance from '@turf/distance'
import Location from '@/types/Location'
import Address from '@/types/Address'

const {Geolocation} = Plugins;

const ipLocationURL = 'https://get.geojs.io/v1/ip/geo.json'

export default class LocationProvider {

  getCurrentCoords(): Promise<Coords> {
    return Geolocation.getCurrentPosition()
      .then((position) => new Coords(position.coords.latitude, position.coords.longitude))
      .catch(() => this.getLocationByIp())
      .then((location: Location) => location.coords)
      .catch(() => Promise.reject(new LocationError()))
  }

  public getLocationByIp(): Promise<Location> {
    return axios.get(ipLocationURL)
      .then(({data}) => new Location(new Address(data.city, data.region, data.country, data.country_code), new Coords(data.latitude, data.longitude)))
  }

  public calculateDistance(frm: Coords, to: Coords): number {
    return frm && to ? distance([frm.lat, frm.lng], [to.lat, to.lng]) : Infinity
  }

}

export const locationProvider = new LocationProvider()
