import {Action, Module, Mutation, VuexModule} from 'vuex-class-modules'
import {store} from '@/store/index'
import {storageProvider} from '@/providers/storage/storage.provider'
import Coords from '@/types/Coords'
import {placesProvider} from '@/providers/places/places.provider'
import Address from '@/types/Address'
import {locationProvider} from '@/providers/location/location.provider'

const LAST_COORDS = 'CSFN_LAST_COORDS'
const LAST_ADDRESS = 'CSFN_LAST_ADDRESS'

@Module
class LocationModule extends VuexModule {

  userCoords: Coords = undefined
  userAddress: Address = undefined

  constructor() {
    super({store, name: 'location'})
  }

  get getCoords(): Coords {
    return this.userCoords
  }

  get getAddress(): Address {
    return this.userAddress
  }

  @Mutation
  setUserCoords(coords: Coords) {
    this.userCoords = coords
  }

  @Mutation
  setUserAddress(address: Address) {
    this.userAddress = address
  }

  @Action
  initialize(): Promise<void> {
    return locationProvider.getCurrentCoords()
      .then((currentCoords) => this.setUserCoords(currentCoords))
      .then(() => storageProvider.get(LAST_ADDRESS))
      .then((lastAddress) => this.setUserAddress(lastAddress))
      .then(() => this.updateAddressIfUserHasMoved())
      .then(() => storageProvider.set(LAST_COORDS, this.userCoords))
      .catch(() => this.setUserAddress(null))
  }

  updateUserPosition(newCoords: Coords) {
    if (this.userHasMoved(this.userCoords, newCoords, 0.5)) {
      this.setUserAddress(undefined)
      placesProvider.getAddress(newCoords)
        .then((address) => {
          this.setUserAddress(address)
          storageProvider.set(LAST_ADDRESS, address)
        })
    }
    this.setUserCoords(newCoords)
    storageProvider.set(LAST_COORDS, newCoords)
  }

  private updateAddressIfUserHasMoved(): Promise<void> {
    return storageProvider.get(LAST_COORDS)
      .then((lastCoords: Coords) => {
        if (!this.userAddress || this.userHasMoved(this.userCoords, lastCoords, 2)) {
          return this.getCurrentAddress(this.userCoords)
        }
      })
  }

  private getCurrentAddress(currentCoords: Coords): Promise<void> {
    return placesProvider.getAddress(currentCoords)
      .then((currentAddress: Address) => {
        return storageProvider.set(LAST_ADDRESS, currentAddress)
          .then(() => this.setUserAddress(currentAddress))
      })
  }

  private userHasMoved(lastCoords, currentCoords, distance) {
    return locationProvider.calculateDistance(lastCoords, currentCoords) > distance
  }
}

export const locationModule = new LocationModule()
