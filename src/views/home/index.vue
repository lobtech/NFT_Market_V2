<template>
    <!-- 通过innerWidth来动态判断显示不同屏幕的dom 统一调用父级js 节省内存开销 -->
    <homeA v-if="innerWidth < 750"></homeA>
    <homeB v-else-if="innerWidth < 1200"></homeB>
    <homeC v-else></homeC>
</template>
<script setup lang="ts">
import homeA from './components/HomeA.vue'
import homeB from './components/HomeB.vue'
import homeC from './components/HomeC.vue'

import { computed } from 'vue'
import store from '@/store'
import { getData } from './js/right'

setTimeout(() => {
    getData('Market')
}, 0)

const innerWidth = computed(() => store.state.sys?.innerWidth || 0) // 监听屏幕宽度
</script>

<style scoped></style>
