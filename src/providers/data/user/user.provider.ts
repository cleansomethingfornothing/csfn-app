import User from '@/types/User'

export class UserProvider {
  fetchUser(id: string): Promise<User> {
    return Promise.resolve(id && new User( '@lester_ps'));
  }
}

export const userProvider = new UserProvider()
