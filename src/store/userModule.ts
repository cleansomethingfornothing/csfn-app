import User from '@/types/User'
import {Action, Module, Mutation, VuexModule} from 'vuex-class-modules'
import {store} from '@/store/index'
import {userProvider} from '@/providers/user/user.provider'

@Module
class UserModule extends VuexModule {

  user: User = undefined

  constructor() {
    super({store, name: 'user'})
  }

  get getCurrentUser(): User {
    return this.user
  }

  @Mutation
  setUser(user: User) {
    this.user = user
  }

  @Action
  fetchUser(userId: string): Promise<void> {
    return userProvider.fetchUser(userId)
      .then((user: User) => {
        this.setUser(user)
      })
  }
}

export const userModule = new UserModule()
