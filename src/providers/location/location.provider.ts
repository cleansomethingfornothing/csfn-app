import axios from 'axios'
import Coords from '@/types/Coords'
import {Plugins} from '@capacitor/core'
import LocationError from '@/types/errors/LocationError'
import Location from '@/types/Location'
import Address from '@/types/Address'

const {Geolocation} = Plugins;

const ipLocationURL = 'https://get.geojs.io/v1/ip/geo.json'

export default class LocationProvider {

    getCurrentCoords(): Promise<Coords> {
        return Geolocation.getCurrentPosition()
            .then(({coords}) => new Coords(coords.latitude, coords.longitude))
            .catch(() => this.getLocationByIp()
                .then((location: Location) => location.coords))
            .catch(() => Promise.reject(new LocationError()))
    }

    public getLocationByIp(): Promise<Location> {
        return axios.get(ipLocationURL)
            .then(({data}) => new Location(new Address(data.city, data.region, data.country, data.country_code), new Coords(Number(data.latitude), Number(data.longitude))))
    }

}

export const locationProvider = new LocationProvider()
