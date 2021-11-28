import { Module } from 'vuex'
import { State } from '..'

// 定义state类型
const states = {
    innerWidth: window.innerWidth as number, // 当前屏幕宽度
    innerHeight: window.innerHeight as number, // 当前屏幕高度
}
export type typeof_sys = typeof states
export default {
    namespaced: true,
    state: states,
    mutations: {
        // 获取屏幕宽高
        get_screen_size(state) {
            state.innerWidth = window.innerWidth
            state.innerHeight = window.innerHeight
        },
    },
    actions: {
        get_screen_size({ commit }) {
            commit('get_screen_size')
        },
    },
} as Module<typeof_sys, State>
