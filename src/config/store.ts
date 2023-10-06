import { createStore} from 'vuex'

// Define o estado
interface State {
    count: number;
    user: {
        name: string,
        email: string 
    }
}

const state: State = {
    count: 0,
    user: {
        name: 'Daniel Santos',
        email: 'daniel@gmail.com' 
    }
}

const store = createStore({
    state,
    mutations: {
        increment(state: State) {
            state.count++;
        }
    },
    actions: {
        incrementAction(context) {
            context.commit('increment');
        }
    },
    getters: {
        count: (state: State) => state.count,
        user: (state: State) => state.user,
    }
})

export default store;