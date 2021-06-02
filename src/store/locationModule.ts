import { Action, Module, Mutation, VuexModule } from 'vuex-class-modules'
import { store } from '@/store/index'
import Coords from '@/types/Coords'
import { placesProvider } from '@/providers/places/places.provider'
import Location from '@/types/Location'
import Address from '@/types/Address'
import { locationProvider } from '@/providers/location/location.provider'
import Vue from 'vue'

@Module
class LocationModule extends VuexModule {

  userCoords: Coords = new Coords(null, null)
  userAddress: Address = new Address('', '', '', '')

  constructor() {
    super({ store, name: 'location' })
  }

  get getCoords(): Coords {
    return this.userCoords
  }

  get getAddress(): Address {
    return this.userAddress
  }

  @Mutation
  setUserCoords(coords: Coords) {
    Vue.set(this, 'userCoords', coords)
  }

  @Mutation
  setUserAddress(address: Address) {
    Vue.set(this, 'userAddress', address)
  }

  @Action
  initialize(): Promise<void> {
    return locationProvider.getCurrentCoords()
      .then((coords) => {
        this.setUserCoords(coords)
        return placesProvider.getAddress(coords)
      })
      .then((address) => this.setUserAddress(address))
      .catch((err) => {
        this.setUserAddress(null)
      })
  }

  @Action
  getLocationByIp(): Promise<Location> {
    return locationProvider.getLocationByIp()
  }

}

export const locationModule = new LocationModule()
