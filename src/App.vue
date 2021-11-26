<template>
    <div>
        <div class="invisible md:visible h-full w-screen fixed bg-scroll bg-cover bg-origin-border bg-no-repeat bg-center bg"></div>
        <router-view v-slot="{ Component }">
            <keep-alive>
                <component :is="Component" :key="$route.path" v-if="$route.meta.keepAlive" />
            </keep-alive>
            <component :is="Component" :key="$route.path" v-if="!$route.meta.keepAlive" />
        </router-view>
    </div>
</template>
<script setup lang="ts"></script>
<style>
.bg {
    background-image: url('@/assets/image/bg_blurEffect.png');
}
</style>
