import DataProvider from '@/providers/data/data.provider'
import Cleanup from '@/types/Cleanup'
import UnknownError from '@/types/errors/UnknownError'
import Coords from '@/types/Coords'

export class CleanupsProvider extends DataProvider {

    constructor() {
        super('/cleanups')
    }

    publish(cleanup: Cleanup): Promise<void> {
        return this.http.post('/', cleanup)
            .catch(() => Promise.reject(new UnknownError('publish-the-cleanup')))
    }

    fetchMarkers(origin: Coords): Promise<Cleanup[]> {
        return this.http.get(`?onlyCoords=true&origin=${origin.lat},${origin.lng}`)
            .then(({data}) => data)
            .catch(() => Promise.reject(new UnknownError('fetch-cleanups')))
    }
}

export const cleanupsProvider = new CleanupsProvider()