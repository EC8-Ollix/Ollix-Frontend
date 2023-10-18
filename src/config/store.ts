import { createStore } from 'vuex'
import { UserloginResponse, User } from '../types/types'
import { setAuthToken, removeAuthToken } from '../api/api'

interface State {
    isLoggedIn: boolean
    user?: User
    token?: string
    isAdmin: boolean
}

const initialState: State = {
    isLoggedIn: !!localStorage.getItem('authToken'),
    token: localStorage.getItem('authToken') || '',
    user: localStorage.getItem('authUser')
        ? JSON.parse(localStorage.getItem('authUser') as string)
        : undefined,
    isAdmin: localStorage.getItem('isAdmin') === 'true',
}

if (initialState.token) {
    setAuthToken(initialState.token)
}

const state: State = initialState

export function SetUserLoggedIn(userloginResponse: UserloginResponse) {
    SetUserLogout()
    store.dispatch('loginUser', userloginResponse)

    let isAdmin: boolean = (userloginResponse.user.userType ?? -1) === 0 // Assuming -1 as a default value when userType is not present

    const expiresTime = new Date(new Date().getTime() + 4 * 60 * 60 * 1000)
    localStorage.setItem('authToken', userloginResponse.token)
    localStorage.setItem('expiresTokenIn', expiresTime.toISOString())
    localStorage.setItem('authUser', JSON.stringify(userloginResponse.user))
    localStorage.setItem('isAdmin', isAdmin.toString())

    setAuthToken(userloginResponse.token)
}

export function SetUserLogout() {
    localStorage.removeItem('authToken')
    localStorage.removeItem('expiresTokenIn')
    localStorage.removeItem('authUser')
    localStorage.removeItem('isAdmin')

    removeAuthToken()
    store.dispatch('logOutUser')
}

const store = createStore({
    state,
    mutations: {
        setUser(state: State, userloginResponse: UserloginResponse) {
            state.user = userloginResponse.user
            state.token = userloginResponse.token
            state.isLoggedIn = true
            state.isAdmin = (userloginResponse.user.userType ?? -1) === 0
        },
        removeUser(state: State) {
            state.user = undefined
            state.token = ''
            state.isLoggedIn = false
            state.isAdmin = false
        },
    },
    actions: {
        loginUser(context, userloginResponse: UserloginResponse) {
            context.commit('setUser', userloginResponse)
        },
        logOutUser(context) {
            context.commit('removeUser')
        },
    },
    getters: {
        isLoggedIn: (state: State) => state.isLoggedIn,
        user: (state: State) => state.user,
        isAdmin: (state: State) => state.isAdmin,
    },
})

export default store
