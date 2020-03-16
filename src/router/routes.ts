import Home from '@/views/Home.vue'
import Login from '@/views/Login.vue'
import Register from '@/views/Register.vue'
import ForgottenPassword from '@/views/ForgottenPassword.vue'
import PublishCleanup from '@/views/PublishCleanup.vue'

export default [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: {
      public: true
    }
  }, {
    public: true,
    path: '/register',
    name: 'Register',
    component: Register,
    meta: {
      public: true
    }
  }, {
    public: true,
    path: '/forgotten-password',
    name: 'ForgottenPassword',
    component: ForgottenPassword,
    meta: {
      public: true
    }
  }, {
    path: '/publish',
    name: 'Publish',
    component: PublishCleanup
  }
]
