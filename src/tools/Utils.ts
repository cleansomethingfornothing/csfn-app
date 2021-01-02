import Address from '@/types/Address'
import CoordsBound from '../../../csfn-server/src/types/CoordsBound'

export function addressToString(address: Address) {
    return [address.city, address.state, address.country].filter(s => s !== undefined).join(', ')
}

export function coordsBoundToString(bounds: CoordsBound): string {
    if (!bounds) {
        return ''
    }
    return [bounds.sw.lat, bounds.sw.lng, bounds.ne.lat, bounds.ne.lng].join(',')
}
