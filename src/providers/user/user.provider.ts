import User from '@/types/User'
import FirebaseUserProvider from '@/providers/user/firebase.user.provider'

export interface UserProvider {
  fetchUser(id: string): Promise<User>
}

export const userProvider = new FirebaseUserProvider()
