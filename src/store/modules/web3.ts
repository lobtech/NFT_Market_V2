import { Module } from 'vuex'
import { State } from '..'
import contracts from '@/tools/contracts' // 后期通过接口请求

// web3相关的配置 动态获取
const states = {
    chainId: '0xa869' as string, // 网络id
    networkVersion: '1' as string, // 网络版本
    contracts, // 合约配置
}

export type typeof_web3 = typeof states
export default {
    namespaced: true,
    state: states,
    mutations: {},
    actions: {},
} as Module<typeof_web3, State>
