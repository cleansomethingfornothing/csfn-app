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

    update(id: number, cleanup: Cleanup): Promise<void> {
        return this.http.patch('/' + id, cleanup)
            .catch(() => Promise.reject(new UnknownError('update-the-cleanup')))
    }

    fetchMarkers(origin: Coords, bounds?: string): Promise<Cleanup[]> {
        return this.http.get(`?onlyCoords=true&origin=${origin.lat},${origin.lng}${bounds ? '&bounds=' + bounds : ''}`)
            .then(({data}) => data)
            .catch(() => Promise.reject(new UnknownError('fetch-cleanups')))
    }

    fetchCleanup(id: number): Promise<Cleanup> {
        return this.http.get('/' + id)
            .then(({data}) => data)
            .catch(() => Promise.reject(new UnknownError('fetch-cleanup')))
    }
}

export const cleanupsProvider = new CleanupsProvider()
