import { createRouter, createWebHashHistory } from 'vue-router'
import store from './store'
import { useRouter } from 'vue-router'
import { SetUserLogout } from '../config/store'

const routes = [
    {
        name: 'authentication',
        path: '/auth',
        component: () =>
            import('../components/authentication/Authentication.vue'),
    },
    {
        name: 'dashboard',
        path: '/',
        component: () => import('../components/dashboard/Dashboard.vue'),
        meta: { requiresAuth: true },
    },
    {
        name: 'helices',
        path: '/helices',
        component: () => import('../components/helices/Helices.vue'),
        meta: { requiresAuth: true },
    },
    {
        name: 'logs',
        path: '/logs',
        component: () => import('../components/logs/Logs.vue'),
        meta: { requiresAuth: true },
    },
    {
        name: 'users',
        path: '/users',
        component: () => import('../components/users/Users.vue'),
        meta: { requiresAuth: true },
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'notfound',
        component: () => import('../components/template/NotExistPage.vue'),
    },
]

const router = createRouter({
    history: createWebHashHistory('/Ollix-Frontend/'),
    routes,
})

router.beforeEach((to, from, next) => {
    const isLoggedIn =
        store.getters.isLoggedIn || localStorage.getItem('authToken')

    if (isLoggedIn) {
        let storedExpiration = localStorage.getItem('expiresTokenIn')

        if (storedExpiration) {
            let expirationDate = new Date(storedExpiration)

            if (new Date() > expirationDate) {
                SetUserLogout()
                next({ name: 'authentication' })
            }
        }

        if (from.fullPath !== '/auth' && to.fullPath === '/auth') {
            next({ name: from.name?.toString() })
        }
    }

    let matched = to.matched

    if (!matched.some((route) => route.name)) {
        next({ name: 'notfound' })
    } else if (
        to.matched.some((route) => route.meta.requiresAuth) &&
        !isLoggedIn
    ) {
        next({ name: 'authentication' })
    } else {
        next()
    }
})

export default router
