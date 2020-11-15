import HomePage from '@/views/pages/home/HomePage.vue'
import LoginPage from '@/views/pages/auth/LoginPage.vue'
import RegisterPage from '@/views/pages/auth/RegisterPage.vue'
import ForgottenPasswordPage from '@/views/pages/auth/ForgottenPasswordPage.vue'
import EditionPage from '@/views/pages/edition/EditionPage.vue'
import ActivityPage from '@/views/pages/ActivityPage.vue'
import UserPage from '@/views/pages/UserPage.vue'
import SettingsPage from '@/views/pages/settings/SettingsPage.vue'
import UserActivitiesPage from '@/views/pages/UserActivitiesPage.vue'
import WorldMapPage from '@/views/pages/GlobalImpactPage.vue'
import SecuritySettingsPage from '@/views/pages/settings/SecuritySettingsPage.vue'
import WelcomePage from '@/views/pages/auth/WelcomePage.vue'
import ProfileSettingsPage from '@/views/pages/settings/ProfileSettingsPage.vue'

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
        path: '/welcome',
        name: 'WelcomePage',
        component: WelcomePage
    }, {
        path: '/',
        redirect: '/home/user'
    }, {
        path: '/home',
        redirect: '/home/user'
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
    }, {
        path: '/profile-settings',
        name: 'ProfileSettings',
        component: ProfileSettingsPage
    }
]
