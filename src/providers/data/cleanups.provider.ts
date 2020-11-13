import DataProvider from "@/providers/data/data.provider";
import Cleanup from "@/types/Cleanup";
import UnknownError from "@/types/errors/UnknownError";

export class CleanupsProvider extends DataProvider {

    constructor() {
        super('/cleanups')
    }

    publish(cleanup: Cleanup): Promise<void> {
        return this.http.post('/', cleanup)
            .catch(() => Promise.reject(new UnknownError('publish-the-cleanup')))
    }
}

export const cleanupsProvider = new CleanupsProvider()