import Address from '@/types/Address'
import CoordsBound from '@/types/CoordsBound'
import Coords from '@/types/Coords'
import distance from '@turf/distance'

export function addressToString(address: Address) {
  return [address.city, address.state, address.country].filter(s => !!s).join(', ')
}

export function coordsBoundToString(bounds: CoordsBound): string {
  if (!bounds) {
    return ''
  }
  return [bounds.sw.lat, bounds.sw.lng, bounds.ne.lat, bounds.ne.lng].join(',')
}


export function calculateDistance(frm: Coords,
                                  to: Coords): number {
  return frm && to ? distance([frm.lat, frm.lng], [to.lat, to.lng]) : Infinity
}

export function remToPixel(rem) {
  return rem * parseFloat(getComputedStyle(document.documentElement).fontSize)
}
