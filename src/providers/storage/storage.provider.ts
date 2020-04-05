import 'capacitor-secure-storage-plugin';
import {Plugins} from '@capacitor/core';

const {SecureStoragePlugin} = Plugins;

class StorageProvider {

  set(key: string, value: any): Promise<void> {
    return SecureStoragePlugin.set({
      key,
      value: JSON.stringify(value)
    })
  }

  get(key: string): Promise<any> {
    return SecureStoragePlugin.get({key})
      .then(({value}) => JSON.parse(value))
      .catch(() => undefined)
  }

  remove(key: string): Promise<void> {
    return SecureStoragePlugin.remove({key})
  }
}

export const storageProvider = new StorageProvider()
