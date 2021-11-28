<template>
    <div class="relative home">
        <div class="title">
            <div class="title-logo">
                <img src="../../../assets/image/logo.png" alt="" />
            </div>
            <div class="title-text">{{ title }}</div>
            <div class="title-right">
                <svg class="z-icon" aria-hidden="true">
                    <use xlink:href="#z-icon-screen"></use>
                </svg>
                <svg class="z-icon" aria-hidden="true">
                    <use xlink:href="#z-icon-other"></use>
                </svg>
            </div>
        </div>
        <div style="background-color: aqua; height: 600px; width: 50%"></div>
        <div style="background-color: rgb(55, 65, 65); height: 600px; width: 50%"></div>
        <div style="background-color: rgb(175, 138, 58); height: 600px; width: 50%"></div>
    </div>
</template>
<script setup lang="ts">
import { computed, readonly, ref, provide, inject } from 'vue'

// import Moralis from 'moralis/dist/moralis.min.js'
const title = inject('title') as string // 菜单标题
</script>

<style scoped>
.home {
    overflow: auto;
    background-color: rgba(36, 39, 54, 1);
}
.title {
    position: fixed;
    left: 0;
    top: 0;
    height: 48px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 16px;
    padding: 0 10px;
    transition: all 230ms ease-out;
    opacity: 1;
    background-color: rgba(0, 0, 0, 0.4);
    backdrop-filter: blur(20px);
    color: rgba(255, 255, 255, 1);
}
.title-logo {
    height: 44px;
    width: 44px;
    display: flex;
    align-items: center;
}
.title-logo > img {
    width: 100%;
}
.title-text {
    position: absolute;
    height: 44px;
    width: 50vw;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
    z-index: -1;
    display: flex;
    align-items: center;
    justify-content: center;
}
.title-right > .z-icon {
    font-size: 24px;
    padding: 6px;
}
</style>
