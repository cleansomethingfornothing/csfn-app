import Cleanup from '@/types/Cleanup'
import CleanupFilters from '@/types/CleanupFilters'

export class CleanupProvider {

  fetch(filters: CleanupFilters): Promise<Cleanup[]> {
    return undefined
  }

  publish(cleanup: Cleanup): Promise<void> {
    return undefined;
  }

}

export const cleanupProvider = new CleanupProvider()
