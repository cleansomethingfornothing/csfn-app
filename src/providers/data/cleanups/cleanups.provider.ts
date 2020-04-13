import Cleanup from '@/types/Cleanup'
import CleanupFilters from '@/types/CleanupFilters'
import Location from '@/types/Location'
import {AxiosInstance} from 'axios'
import moment from 'moment'

export class CleanupsProvider {

  axios: AxiosInstance

  constructor(axios) {
    this.axios = axios
  }

  fetch(filters: CleanupFilters): Promise<Cleanup[]> {
    return new Promise(resolve => {
      setTimeout(() =>
          resolve(['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i'].map((id) => ({
              id,
              user: {
                username: '@lester_pr',
                email: '',
                picture: '/img/user-placeholder.png'
              },
              description: 'Shkodër is a town in the north of Albania. We stopped here to do a cleanup on a small tributary of the river Bojana that leads to the Adriatic Sea as final destination.\n' +
                '\n' +
                'This place is extremely dirty, we just took a bag of trash but it certainly needs many more to be clean... It seemed like it has been used as an illegal dump and many rests of plastic bags are still moving trapped in the branches of the riverside. Definitely Albania is a country with such incredible nature 🌿 but also full of contrasts like this... We did our bit to help turn this area a little bit cleaner. We are on the good path, however there is a long way to go. Thanks to such beautiful community of cleaners worldwide!!! We are making a real change',
              weight: 2,
              location: new Location(
                {
                  city: 'San Lorenzo de El Escorial',
                  country: 'Albania',
                  countryCode: 'ES',
                  state: 'Shkodër'
                }, {
                  lat: 40.2423808,
                  lng: -3.76832
                }),
              date: moment([2020, 0, 29]).toDate(),
              done: false,
              pictures: ['/img/placeholder.png', '/img/placeholder.png', '/img/placeholder.png']
            })
          ))
        , 1000)
    })
  }

  fetchOne(id: string): Promise<Cleanup> {
    return new Promise(resolve => {
      setTimeout(() =>
        resolve({
          id,
          user: {
            username: '@lester_pr',
            email: '',
            picture: '/img/user-placeholder.png'
          },
          description: 'Shkodër is a town in the north of Albania. We stopped here to do a cleanup on a small tributary of the river Bojana that leads to the Adriatic Sea as final destination.\n' +
            '\n' +
            'This place is extremely dirty, we just took a bag of trash but it certainly needs many more to be clean... It seemed like it has been used as an illegal dump and many rests of plastic bags are still moving trapped in the branches of the riverside. Definitely Albania is a country with such incredible nature 🌿 but also full of contrasts like this... We did our bit to help turn this area a little bit cleaner. We are on the good path, however there is a long way to go. Thanks to such beautiful community of cleaners worldwide!!! We are making a real change',
          weight: 2,
          location: new Location(
            {
              city: 'San Lorenzo de El Escorial',
              country: 'Albania',
              countryCode: 'ES',
              state: 'Shkodër'
            }, {
              lat: 40.2423808,
              lng: -3.76832
            }),
          date: moment([2020, 0, 29]).toDate(),
          done: true,
          pictures: ['/img/placeholder.png', '/img/placeholder.png', '/img/placeholder.png']
        }), 1000)
    })
  }

  publish(cleanup: Cleanup): Promise<void> {
    return undefined;
  }

}

