import Cleanup from '@/types/Cleanup'
import CleanupFilters from '@/types/CleanupFilters'
import Location from '@/types/Location'
import {AxiosInstance} from 'axios'
import moment from 'moment'
import {locationModule} from '@/store/locationModule'
import {placesProvider} from '@/providers/places/places.provider'

export class CleanupsProvider {

  cleanups: { [key: string]: Cleanup } = {}

  axios: AxiosInstance

  constructor(axios) {
    this.axios = axios
  }

  fetch(filters: CleanupFilters): Promise<Cleanup[]> {
    return Promise.all(['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i'].map((id) => {
        const coords = {
          lat: locationModule.getCoords.lat + Math.random() - 0.5,
          lng: locationModule.getCoords.lng + Math.random() - 0.5
        }
        return placesProvider.getAddress(coords).then((address) => {
          this.cleanups[id] = {
            id,
            user: {
              username: '@lester_pr',
              email: '',
              picture: '/img/user-placeholder.png'
            },
            description: 'Shkodër is a town in the north of Albania. We stopped here to do a cleanup on a small tributary of the river Bojana that leads to the Adriatic Sea as final destination.\n' +
              '\n' +
              'This place is extremely dirty, we just took a bag of trash but it certainly needs many more to be clean.',
            weight: 2,
            location: new Location(address, coords),
            date: moment([2020, 0, 29]).toDate(),
            done: Math.random() < 0.5,
            pictures: ['/img/placeholder.png', '/img/placeholder.png', '/img/placeholder.png']
          }

          return this.cleanups[id]
        })
      })
    )
  }

  fetchOne(id: string): Promise<Cleanup> {
    return new Promise(resolve => {
      setTimeout(() =>
        resolve(this.cleanups[id]), 1000)
    })
  }

  publish(cleanup: Cleanup): Promise<void> {
    return undefined;
  }

}

