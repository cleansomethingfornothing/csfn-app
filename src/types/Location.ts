import Address from '@/types/Address'
import Coords from '@/types/Coords'

export default class Location {
    address: Address
    coords: Coords

    constructor(address: Address, coords: Coords) {
        this.address = address
        this.coords = coords
    }

    public equals(other: Location): boolean {
        return this.toString() == other.toString()
    }
}
