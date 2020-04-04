import Home from '@/views/pages/Home.vue'
import Login from '@/views/pages/Login.vue'
import Register from '@/views/pages/Register.vue'
import ForgottenPassword from '@/views/pages/ForgottenPassword.vue'
import PublishCleanup from '@/views/pages/PublishCleanup.vue'

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
