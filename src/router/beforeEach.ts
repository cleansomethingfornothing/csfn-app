import { Route } from 'vue-router'
import { authModule } from '@/store/authModule'
import { appModule } from '@/store/appModule'

export default function beforeEach(to: Route,
                                   _: Route,
                                   next: Function) {
  appModule.initialize()
    .then(() => {
      const isLogged = authModule.isLogged
      if (!isLogged && !to.meta.public) {
        next('/login')
      } else if (isLogged && to.meta.public) {
        next('/')
      } else {
        next()
      }
    })
}
