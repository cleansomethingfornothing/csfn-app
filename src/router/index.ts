import Vue from 'vue'
import {IonicVueRouter} from '@ionic/vue'
import routes from './routes'
import checkAuth from '@/router/checkAuth'

Vue.use(IonicVueRouter)

export default class Router extends IonicVueRouter {
  constructor() {
    super({mode: 'history', base: process.env.BASE_URL, routes})
    this.beforeEach(checkAuth)
  }
}

export const router = new Router()
