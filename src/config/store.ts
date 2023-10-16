import { createStore } from 'vuex'

interface State {
    isLoggedIn: boolean
    token?: string
    user?: {
        id?: string
        firstName?: string
        lastName?: string
        userEmail: string
        userType?: number
        clientApp?: {
            id?: string
            companyName?: string
            bussinessName?: string
            cnpj?: {
                value: string
            }
            active?: true
        }
    }
}

const state: State = {
    isLoggedIn: false,
    token: '',
    user: {
        firstName: 'daniel',
        userEmail: 'a',
    },
}

const store = createStore({
    state,
    mutations: {},
    actions: {},
    getters: {
        isLoggedIn: (state: State) => state.isLoggedIn,
        user: (state: State) => state.user,
    },
})

export default store
