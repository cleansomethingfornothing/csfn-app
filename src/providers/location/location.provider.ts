import axios from 'axios'
import Coords from '@/types/Coords'
import {Plugins} from '@capacitor/core'
import LocationError from '@/types/errors/LocationError'
import distance from '@turf/distance'

const {Geolocation} = Plugins;

const ipLocationURL = 'https://get.geojs.io/v1/ip/geo.json'

export default class LocationProvider {

  getCurrentCoords(): Promise<Coords> {
    return Geolocation.getCurrentPosition()
      .then((position) => new Coords(position.coords.latitude, position.coords.longitude))
      .catch(() => this.getLocationByIp())
      .catch(() => Promise.reject(new LocationError()))
  }

  private getLocationByIp(): Promise<Coords> {
    return axios.get(ipLocationURL)
      .then(({data}) => new Coords(data.latitude, data.longitude))
  }

  public calculateDistance(frm: Coords, to: Coords): number {
    return distance([frm.lat, frm.lng], [to.lat, to.lng])
  }

}

export const locationProvider = new LocationProvider()
