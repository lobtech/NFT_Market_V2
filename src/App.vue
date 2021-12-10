<template>
    <router-view v-slot="{ Component }">
        <keep-alive>
            <component :is="Component" :key="$route.path" v-if="$route.meta.keepAlive" />
        </keep-alive>
        <component :is="Component" :key="$route.path" v-if="!$route.meta.keepAlive" />
    </router-view>
</template>
<script setup lang="ts">
import { onMounted } from 'vue'
import store from './store'
// 引入公共方法
import { login, logout } from './views/home/js/left'
import web3 from '@/tools/moralis'
web3.start() // 连接服务器
// 监听屏幕尺寸
onMounted(() => {
    window.onresize = () => store.dispatch('sys/get_screen_size') // 监听屏幕尺寸
    login(false) // 登录
    try {
        const ethereum = (window as any).ethereum

        // 首次判断matemask网络是否正确
        const { chainId, networkVersion } = store.state.web3 as any
        // 首次进入网络不正确自动注销
        if (ethereum.chainId !== chainId || ethereum.networkVersion !== networkVersion) logout() // 注销

        // 切换账号自动注销
        ethereum.on('accountsChanged', logout)

        // 切换网络自动注销
        ethereum.on('networkChanged', logout)
    } catch (error) {
        console.log(`---------->ethereum警告:`, error)
    }
})
</script>
<style></style>
