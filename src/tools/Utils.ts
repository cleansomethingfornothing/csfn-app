import Address from '@/types/Address'

export function addressToString(address: Address) {
    return [address.city, address.state, address.country].filter(s => s !== undefined).join(', ')
}
