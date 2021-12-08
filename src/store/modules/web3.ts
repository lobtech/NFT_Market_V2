import web3 from '@/tools/web3'
import { Module } from 'vuex'
import { State } from '..'
import contracts from '@/tools/contracts'

// 定义state类型
const states = {
    chainId: '0xa869', // 网络id
    networkVersion: '1', // 网络版本
    user: {
        account: '' as string, // 用户地址
        nativeBalance: '' as string, // 本地余额
        tokenBalances: '' as string, // 令牌余额
    },
    contracts, // 合约配置
    money_npc_address: '', // 商人npc(控制货币发行、货币空投、装备生成、商品出售)
}

export type typeof_moralis = typeof states
export default {
    namespaced: true,
    state: states,
    mutations: {
        // 初始化Moralis
        async init(state, account: any) {
            state.user.account = account || '' // 保存用户信息
        },
        // 用户信息
        async get_info(state) {
            let user = state.user.account
            web3.getBalance(user).then((res) => {
                state.user.nativeBalance = String(res.substring(0, res.length - 14) / 10000)
            })
            web3.getTokensBalance(user).then((res) => {
                state.user.tokenBalances = String(res.substring(0, res.length - 14) / 10000)
            })
        },
        // logout
        async logout(state, paylaod: boolean) {
            state.user = { account: '', nativeBalance: '', tokenBalances: '' }
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
} as Module<typeof_moralis, State>
