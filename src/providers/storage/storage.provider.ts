import {Plugins} from '@capacitor/core';

const {Storage} = Plugins;

class StorageProvider {

  set(key: string, value: any): Promise<void> {
    return Storage.set({
      key,
      value: JSON.stringify(value)
    })
  }

  get(key: string): Promise<any> {
    return Storage.get({key})
      .then(({value}) => JSON.parse(value))
  }
}

export const storageProvider = new StorageProvider()
