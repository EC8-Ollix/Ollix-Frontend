import { createRouter, createWebHashHistory } from 'vue-router'
import store from './store'
import { useRouter } from 'vue-router'
import { SetUserLogout } from '../config/store'

const routes = [
    {
        name: 'authentication',
        path: '/Ollix-Frontend/auth',
        component: () =>
            import('../components/authentication/Authentication.vue'),
        mode: 'hash',
    },
    {
        name: 'dashboard',
        path: '/Ollix-Frontend/',
        component: () => import('../components/dashboard/Dashboard.vue'),
        mode: 'hash',
        meta: { requiresAuth: true },
    },
    {
        name: 'helices',
        path: '/Ollix-Frontend/helices',
        component: () => import('../components/helices/Helices.vue'),
        mode: 'hash',
        meta: { requiresAuth: true },
    },
    {
        name: 'logs',
        path: '/Ollix-Frontend/logs',
        component: () => import('../components/logs/Logs.vue'),
        mode: 'hash',
        meta: { requiresAuth: true },
    },
    {
        name: 'users',
        path: '/Ollix-Frontend/users',
        component: () => import('../components/users/Users.vue'),
        mode: 'hash',
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
    }

    let matched = to.matched
    let formtMacthed = from

    if (!matched.some((route) => route.name)) {
        next({ name: 'notfound' })
        console.log('Não encontrado: ', formtMacthed)
    } else if (
        to.matched.some((route) => route.meta.requiresAuth) &&
        !isLoggedIn
    ) {
        console.log('Para Auth: ', formtMacthed)
        next({ name: 'authentication' })
    } else {
        console.log('Seguiu: ', formtMacthed)
        next()
    }
})

export default router
