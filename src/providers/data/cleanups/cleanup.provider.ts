import Cleanup from '@/types/Cleanup'
import CleanupFilters from '@/types/CleanupFilters'
import Location from '@/types/Location'

export class CleanupProvider {

  fetch(filters: CleanupFilters): Promise<Cleanup[]> {
    return new Promise(resolve => {
      setTimeout(() =>
          resolve(new Array(10).fill({
              user: {
                userName: '@lester_prz',
                email: ''
              },
              description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce vel suscipit justo. Pellentesque eget porta est. Sed ornare purus eget facilisis finibus. Donec eget turpis ultrices magna posuere tincidunt. Donec id risus ut libero commodo rhoncus a ac sapien. Cras volutpat vel sem at finibus.',
              weight: 2,
              location: new Location(
                {
                  city: 'El Escorial',
                  country: 'España',
                  countryCode: 'ES',
                  state: 'Comunidad de Madrid'
                }, {
                  lat: 40.2423808,
                  lng: -3.76832
                }),
              date: new Date(),
              done: false,
              beforePictures: ['https://www.cleansomething.com/imgBasuras/@gfcesar-68.png'],
              afterPictures: []
            }
          ))
        , 3000)
    })
  }

  publish(cleanup: Cleanup): Promise<void> {
    return undefined;
  }

}

export const cleanupProvider = new CleanupProvider()
