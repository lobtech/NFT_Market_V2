<template>
    <div class="home">
        <!-- <div class="relative p-0 transition-all md:p-4 home"> -->
        <loading :show="loadingShow" :index="9999"></loading>
        <!-- <titleView></titleView> -->
        <!-- <leftmMenuView></leftmMenuView> -->
        <rightContentView></rightContentView>
        <!-- <div class="fixed top-0 left-0" style="height: 1200px; width: 100px; background-color: rebeccapurple"></div> -->
        <div style="height: 1200px; width: 200px; background-color: rgb(51, 153, 114)"></div>
    </div>
</template>
<script setup lang="ts">
import { readonly, ref } from 'vue'
import loading from '@/components/loading/loading.vue'
import titleView from './components/title.vue'
import leftmMenuView from './components/leftMenu.vue'
import rightContentView from './components/rightContent.vue'
import { provide } from 'vue'

const loadingShow = ref(false) // 加载状态
const setLoading = (value: boolean) => {
    loadingShow.value = value
}
provide('setLoading', setLoading) // 传递修改loading的方法

// 标题是公用的
const title = ref('Houses') // 选择菜单子项
provide('title', readonly(title)) // 传递到子组件 只读
const setTitle = (value: string) => {
    title.value = value
}

provide('setTitle', setTitle) // 传递修改title的方法
</script>

<style lang="scss" scoped>
.home {
    // background-color: rgba(36, 39, 54, 1);
}
</style>
