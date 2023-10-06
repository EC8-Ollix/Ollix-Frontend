import { createStore} from 'vuex'

// Define o estado
interface State {
    count: number;
}

const state: State = {
    count: 0
}

const store = createStore({
    state,
    mutations: {
        increment(state: State) {
            state.count++;
            console.log("Contador: " + state.count);
        }
    },
    actions: {
        incrementAction(context) {
            context.commit('increment');
        }
    },
    getters: {
        count: (state: State) => state.count
    }
})

export default store;