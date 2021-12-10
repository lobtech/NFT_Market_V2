import web3 from '@/tools/web3'
import { Module } from 'vuex'
import { State } from '..'

// 用户的信息
const states = {
    account: '' as string, // 用户地址
    nativeBalance: '' as string, // 本地余额
    tokenBalances: '' as string, // 令牌余额
}

export type typeof_user = typeof states
export default {
    namespaced: true,
    state: states,
    mutations: {
        // 初始化Moralis
        init(state, account: any) {
            state.account = account || '' // 保存用户信息
        },
        // 用户信息
        get_info(state) {
            let user = state.account
            web3.getBalance(user).then((res) => {
                state.nativeBalance = String(res.substring(0, res.length - 14) / 10000)
            })
            web3.getTokensBalance(user).then((res) => {
                state.tokenBalances = String(res.substring(0, res.length - 14) / 10000)
            })
        },
        // logout
        logout(state, paylaod: boolean) {
            state['account'] = ''
            state['nativeBalance'] = ''
            state['tokenBalances'] = ''
        },
    },
    actions: {
        // login
        init({ commit }, paylaod: boolean) {
            commit('init', paylaod)
        },
        // 用户信息
        get_info({ commit }, paylaod: boolean) {
            commit('get_info', paylaod)
        },
        // 注销
        logout({ commit }, paylaod: boolean) {
            commit('logout', paylaod)
        },
    },
} as Module<typeof_user, State>
