<template>
    <div class="relative home">
        <div class="tip">您还未登录</div>
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
// 引入公共变量
import { loadingShow, marketplace_list, prediction_list, other_list, title, selectMenuItem, isShow } from '../js/left'
import { state_list, state, class_list, _class, rarity_list, rarity } from '../js/right'

// 引入公共方法
import { setLoading, toPage, login, logout, setTitle, changeShow } from '../js/left'
import { selectState, selectClass, selectRarity } from '../js/right'

// 引入公共计算属性
import { IsActive, Accounts, Username } from '../js/left'
</script>

<style lang="less" scoped>
.home {
    background-color: rgba(36, 39, 54, 1);
    .tip {
        width: 100%;
        height: 48px;
        max-height: 60px;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0 16px;
        color: rgba(255, 255, 255, 1);
        opacity: 0.3;
    }
    .title {
        position: sticky;
        top: 0;
        height: 48px;
        max-height: 60px;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 16px;
        background-color: rgba(0, 0, 0, 0.4);
        backdrop-filter: blur(20px);
        color: rgba(255, 255, 255, 1);
        .title-logo {
            height: 28px;
            max-height: 32px;
            display: flex;
            align-items: center;
            img {
                height: 100%;
            }
        }
        .title-text {
            position: absolute;
            height: 32px;
            max-height: 48px;
            font-size: 18px;
            width: 50%;
            left: 0;
            right: 0;
            top: 0;
            bottom: 0;
            margin: auto;
            z-index: -1;
            display: flex;
            align-items: center;
            justify-content: center;
            opacity: 0.5;
        }
        .title-right {
            .z-icon {
                font-size: 28px;
                padding: 4px;
                opacity: 0.5;
            }
        }
    }
}
</style>
