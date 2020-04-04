import Cleanup from '@/types/Cleanup'
import CleanupFilters from '@/types/CleanupFilters'
import Location from '@/types/Location'

export class CleanupProvider {

  fetch(filters: CleanupFilters): Promise<Cleanup[]> {
    return new Promise(resolve => {
      setTimeout(() =>
          resolve(new Array(10).fill({
              user: {
                userName: '@gfcesar',
                email: ''
              },
              description: 'Shkodër is a town in the north of Albania. We stopped here to do a cleanup on a small tributary of the river Bojana that leads to the Adriatic Sea as final destination.\n' +
                '\n' +
                'This place is extremely dirty, we just took a bag of trash but it certainly needs many more to be clean... It seemed like it has been used as an illegal dump and many rests of plastic bags are still moving trapped in the branches of the riverside. Definitely Albania is a country with such incredible nature 🌿 but also full of contrasts like this... We did our bit to help turn this area a little bit cleaner. We are on the good path, however there is a long way to go. Thanks to such beautiful community of cleaners worldwide!!! We are making a real change',
              weight: 2,
              location: new Location(
                {
                  city: 'Shkodër',
                  country: 'Albania',
                  countryCode: 'ES',
                  state: 'Shkodër'
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
