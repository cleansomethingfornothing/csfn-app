import Cleanup from '@/types/Cleanup'

export interface CleanupProvider {
  publish(cleanup: Cleanup): Promise<void>


}
