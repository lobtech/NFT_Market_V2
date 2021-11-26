import { InjectionKey } from 'vue'
import { createStore, Store } from 'vuex'
import user_module, { typeof_user_module } from './modules/user_module'
import moralis, { typeof_moralis_module } from './modules/moralis_module'

// 创建一个InjectionKey
export const key: InjectionKey<Store<State>> = Symbol()

export type State = {
    counter: number
    moralis?: typeof_moralis_module
    user_module?: typeof_user_module
}

const store = createStore({
    state: {
        counter: 0,
    },
    mutations: {
        add(state) {
            state.counter++
        },
    },
    actions: {},
    modules: {
        moralis,
        user_module,
    },
})
export default store
