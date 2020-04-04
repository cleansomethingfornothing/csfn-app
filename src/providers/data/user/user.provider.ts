import User from '@/types/User'

export class UserProvider {
  fetchUser(id: string): Promise<User> {
    return Promise.resolve(id && new User('Lester', 'Pérez', '@lester_ps'));
  }
}

export const userProvider = new UserProvider()
