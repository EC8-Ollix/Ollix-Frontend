import { createStore } from 'vuex'
import { UserloginResponse, User } from '../types/types'
import { setAuthToken, removeAuthToken } from '../api/api'

interface State {
    isLoggedIn: boolean
    user?: User
    token?: string
}

const initialState: State = {
    isLoggedIn: !!localStorage.getItem('authToken'),
    token: localStorage.getItem('authToken') || '',
    user: localStorage.getItem('authUser')
        ? JSON.parse(localStorage.getItem('authUser') as string)
        : undefined,
}

const state: State = initialState

export function SetUserLoggedIn(userloginResponse: UserloginResponse) {
    SetUserLogout()
    store.dispatch('loginUser', userloginResponse)

    const expiresTime = new Date(new Date().getTime() + 4 * 60 * 60 * 1000)
    localStorage.setItem('authToken', userloginResponse.token)
    localStorage.setItem('expiresTokenIn', expiresTime.toISOString())
    localStorage.setItem('authUser', JSON.stringify(userloginResponse.user))

    setAuthToken(userloginResponse.token)
}

export function SetUserLogout() {
    store.dispatch('logOutUser')

    localStorage.removeItem('authToken')
    localStorage.removeItem('expiresTokenIn')
    localStorage.removeItem('authUser')

    removeAuthToken()
}

const store = createStore({
    state,
    mutations: {
        setUser(state: State, userloginResponse: UserloginResponse) {
            state.user = userloginResponse.user
            state.token = userloginResponse.token
            state.isLoggedIn = true
        },
        removeUser(state: State) {
            state.user = undefined
            state.token = ''
            state.isLoggedIn = false
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
    },
})

export default store
