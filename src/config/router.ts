import { createRouter, createWebHashHistory } from 'vue-router'
import store from './store'
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
        meta: { requiresAuth: true, justClient: true },
    },
    {
        name: 'admin',
        path: '/admin',
        component: () => import('../components/dashboard/AdminDashboard.vue'),
        meta: { requiresAuth: true, justAdmin: true },
    },
    {
        name: 'clients',
        path: '/clients',
        component: () => import('../components/clients/Clients.vue'),
        meta: { requiresAuth: true, justAdmin: true },
    },
    {
        name: 'clientsById',
        path: '/clients/:clientId',
        component: () => import('../components/clients/ClientDetails.vue'),
        meta: { requiresAuth: true, justAdmin: true },
    },
    {
        name: 'orders',
        path: '/orders',
        component: () => import('../components/orders/Orders.vue'),
        meta: { requiresAuth: true },
    },
    {
        name: 'helices',
        path: '/helices/:clientId',
        component: () => import('../components/helices/Helices.vue'),
        meta: { requiresAuth: true, justClient: true },
    },
    {
        name: 'logs',
        path: '/logs',
        component: () => import('../components/logs/Logs.vue'),
        meta: { requiresAuth: true },
    },
    {
        name: 'users',
        path: '/users/:clientId',
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
    let isTokenExpired = false

    const storedExpiration = localStorage.getItem('expiresTokenIn')
    if (storedExpiration) {
        const expirationDate = new Date(storedExpiration)
        isTokenExpired = new Date() > expirationDate
    }

    if (isLoggedIn && isTokenExpired) {
        SetUserLogout()
        return next({ name: 'authentication' })
    }

    if (isLoggedIn && from.fullPath !== '/auth' && to.fullPath === '/auth') {
        return next({ name: from.name?.toString() })
    }

    if (store.getters.isAdmin && to.fullPath == '/') {
        return next({ name: 'admin' })
    } else if (to.matched.some((route) => !route.name)) {
        return next({ name: 'notfound' })
    } else if (
        to.matched.some((route) => route.meta.requiresAuth) &&
        !isLoggedIn
    ) {
        return next({ name: 'authentication' })
    } else if (
        (to.matched.some((route) => route.meta.justAdmin) &&
            !store.getters.isAdmin) ||
        (to.matched.some((route) => route.meta.justClient) &&
            store.getters.isAdmin)
    ) {
        return next({ name: 'notfound' })
    }

    next()
})

export default router
