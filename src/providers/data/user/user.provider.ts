import User from '@/types/User'
import {AxiosInstance} from 'axios'
import Activity from '@/types/Activity'
import UserRegistration from '@/types/UserRegistration'
import UserRegistrationResult from '@/types/UserRegistrationResult'

export class UserProvider {

  axios: AxiosInstance

  constructor(axios) {
    this.axios = axios
  }

  registerUser(user: UserRegistration): Promise<UserRegistrationResult> {
    return Promise.resolve(undefined)
  }

  fetchUser(): Promise<User> {
    return Promise.resolve(new User('@lester_prz', 'lester@gmail.com', '/img/user-placeholder.png'));
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
