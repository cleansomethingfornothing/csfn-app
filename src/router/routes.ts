import HomePage from '@/views/pages/HomePage.vue'
import LoginPage from '@/views/pages/LoginPage.vue'
import RegisterPage from '@/views/pages/RegisterPage.vue'
import ForgottenPasswordPage from '@/views/pages/ForgottenPasswordPage.vue'
import EditionPage from '@/views/pages/EditionPage.vue'
import ActivityPage from '@/views/pages/ActivityPage.vue'
import UserPage from '@/views/pages/UserPage.vue'
import SettingsPage from '@/views/pages/SettingsPage.vue'
import UserActivitiesPage from '@/views/pages/UserActivitiesPage.vue'
import WorldMapPage from '@/views/pages/WorldMapPage.vue'
import SecuritySettingsPage from '@/views/pages/SecuritySettingsPage.vue'

export default [
  {
    path: '/login',
    name: 'LoginPage',
    component: LoginPage,
    meta: {
      public: true
    }
  }, {
    public: true,
    path: '/register',
    name: 'RegisterPage',
    component: RegisterPage,
    meta: {
      public: true
    }
  }, {
    public: true,
    path: '/forgotten-password',
    name: 'ForgottenPasswordPage',
    component: ForgottenPasswordPage,
    meta: {
      public: true
    }
  }, {
    path: '/',
    redirect: '/home/community'
  }, {
    path: '/home',
    redirect: '/home/community'
  }, {
    path: '/home/:tab',
    name: 'HomePage',
    component: HomePage
  }, {
    path: '/user/:id',
    name: 'User',
    component: UserPage
  }, {
    path: '/user-activities',
    name: 'UserActivities',
    component: UserActivitiesPage
  }, {
    path: '/activity/:id',
    name: 'Cleanup',
    component: ActivityPage
  }, {
    path: '/publish',
    name: 'Publish',
    component: EditionPage
  }, {
    path: '/settings',
    name: 'Settings',
    component: SettingsPage
  }, {
    path: '/world-map',
    name: 'WorldMap',
    component: WorldMapPage
  }, {
    path: '/security-settings',
    name: 'SecuritySettings',
    component: SecuritySettingsPage
  }
]
