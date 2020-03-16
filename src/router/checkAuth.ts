import {Route} from 'vue-router'
import {authModule} from '@/store/authModule'

export default function checkAuth(to: Route, _: Route, next: Function) {
  authModule.isLogged().then((isLogged) => {
    if (!isLogged && !to.meta.public) {
      next('/login')
    } else if (isLogged && to.meta.public) {
      next('/')
    } else {
      next()
    }
  })
}
