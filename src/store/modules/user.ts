import { Module } from 'vuex'
import { State } from '..'
// 定义数组item的类型
type role = {
    name: string
}

// 定义state类型
const states = {
    name: 'test' as string,
    age: 0 as number,
    roles: [] as role[],
}
export type typeof_user = typeof states
export default {
    namespaced: true,
    state: states,
    mutations: {
        // 初始化用户
        init(state, paylaod: typeof_user) {
            console.log(`---------->日志输出:paylaod`, paylaod)
            // for (const key in paylaod) {
            //     state[key] = paylaod[key]
            // }
            state['name'] = paylaod['name']
            state['age'] = paylaod['age']
            state['roles'] = paylaod['roles']
        },
        // 初始化用户角色
        initRoles(state, paylaod: role[]) {
            console.log(`---------->日志输出:paylaod`, paylaod)
            state.roles = paylaod
        },
        // 添加用户角色
        addRole(state, payload: role) {
            state.roles.push(payload)
        },
    },
    actions: {
        init({ commit }, paylaod: typeof_user) {
            commit('init', paylaod)
        },
        initRoles({ commit }, paylaod: role[]) {
            commit('initRoles', paylaod)
        },
        addRole({ commit }, paylaod: role) {
            commit('addRole', paylaod)
        },
    },
} as Module<typeof_user, State>
