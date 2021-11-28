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
// 监听屏幕尺寸
onMounted(() => {
    window.onresize = () => store.dispatch('sys/get_screen_size') // 监听屏幕尺寸
})
</script>
<style></style>
