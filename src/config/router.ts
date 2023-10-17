import { createRouter, createWebHistory } from 'vue-router'
import store from './store'
import { useRouter } from 'vue-router'

const routes = [
    {
        name: 'authentication',
        path: '/Ollix-Frontend/auth',
        component: () =>
            import('../components/authentication/Authentication.vue'),
        // mode: 'hash',
    },
    {
        name: 'dashboard',
        path: '/Ollix-Frontend/',
        component: () => import('../components/dashboard/Dashboard.vue'),
        // mode: 'hash',
        meta: { requiresAuth: true },
    },
    {
        name: 'helices',
        path: '/Ollix-Frontend/helices',
        component: () => import('../components/helices/Helices.vue'),
        // mode: 'hash',
        meta: { requiresAuth: true },
    },
    {
        name: 'logs',
        path: '/Ollix-Frontend/logs',
        component: () => import('../components/logs/Logs.vue'),
        // mode: 'hash',
        meta: { requiresAuth: true },
    },
    {
        name: 'users',
        path: '/Ollix-Frontend/users',
        component: () => import('../components/users/Users.vue'),
        // mode: 'hash',
        meta: { requiresAuth: true },
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'notfound',
        component: () => import('../components/template/NotExistPage.vue'),
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

router.beforeEach((to, from, next) => {
    const isLoggedIn =
        store.getters.isLoggedIn || localStorage.getItem('authToken')

    const router = useRouter()

    const goAuth = () => {
        router.push('/Ollix-Frontend/auth')
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
        goAuth()
    } else {
        console.log('Seguiu: ', formtMacthed)
        next()
    }
})

export default router
