import User from '@/types/User'
import Activity from '@/types/Activity'
import DataProvider from '@/providers/data/data.provider'
import {handleBackError} from '@/tools/handleBackError'

export class UserProvider extends DataProvider {

  constructor() {
    super('/user')
  }

  updateUser(id: number, update: User): Promise<User> {
    return this.http.patch('/' + id, update)
      .then(({data}) => data)
      .catch(handleBackError('update-profile'))
  }

  fetchUser(): Promise<User> {
    return null
  }

  fetchUserCleanups(): Promise<Activity[]> {
    return Promise.resolve(undefined)
  }

  fetchUserEvents(): Promise<Activity[]> {
    return Promise.resolve(undefined)
  }

  fetchUserAlerts(): Promise<Activity[]> {
    return Promise.resolve(undefined)
  }

  changeUserPassword(): Promise<void> {
    return Promise.resolve(undefined)
  }

  removeUser(): Promise<void> {
    return Promise.resolve(undefined)
  }

}

export const userProvider = new UserProvider()
