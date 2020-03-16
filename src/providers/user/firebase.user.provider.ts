import User from '@/types/User'
import {UserProvider} from '@/providers/user/user.provider'

export default class FirebaseUserProvider implements UserProvider {

  fetchUser(id: string): Promise<User> {
    return Promise.resolve(id && new User('Lester', 'Pérez', '@lester_ps'));
  }

}
