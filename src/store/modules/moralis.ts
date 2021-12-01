import { Module } from 'vuex'
import { State } from '..'

// 定义state类型
const states = {
    user: {
        accounts: [] as string[], // 用户地址
        username: '' as string, // 用户昵称
        nativeBalance: '' as string, // 本地余额
        tokenBalances: '' as string, // 令牌余额
    },
}
export type typeof_moralis = typeof states
export default {
    namespaced: true,
    state: states,
    mutations: {
        // 初始化Moralis
        async init(state, user: any) {
            state.user.accounts = user.accounts || [] // 保存用户信息
            state.user.username = user.username || '' // 保存用户信息
        },
        // logout
        async logout(state, paylaod: boolean) {
            state.user = { accounts: [], username: '', nativeBalance: '', tokenBalances: '' }
        },
    },
    actions: {
        // login
        init({ commit }, paylaod: boolean) {
            commit('init', paylaod)
        },
        logout({ commit }, paylaod: boolean) {
            commit('logout', paylaod)
        },
    },
} as Module<typeof_moralis, State>
