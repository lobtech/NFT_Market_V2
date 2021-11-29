<template>
    <div class="relative home">
        <div class="left-menu">
            <div class="user" v-if="!accounts">
                <div class="logo" @click="toPage()"><img src="@/assets/image/logo.png" alt="" /></div>
                <div class="connected">
                    <div class="truncate connected-btn" @click="login"></div>
                </div>
            </div>
            <div v-else class="wallet">
                <div class="wallet-content">
                    <div class="title">
                        <img src="@/assets/image/logo.png" alt="" />
                        <div class="truncate username">{{ username }}</div>
                        <div>,Welcome to us !</div>
                    </div>
                    <div class="row">
                        <div>通用币：</div>
                        <div>20 BNB</div>
                    </div>
                    <div class="row">
                        <div>商城币：</div>
                        <div>2684 LBTT</div>
                    </div>
                    <div class="disconnect">
                        <div class="disconnect-btn" @click="logout">Disconnect</div>
                    </div>
                </div>
            </div>
            <div class="span"></div>
            <div class="content">
                <div class="item" v-for="(item, index) in marketplace_list" :key="index">
                    <img :src="item.icon" alt="" />
                </div>
                <div class="span-sm"></div>
                <div class="item" v-for="(item, index) in prediction_list" :key="index">
                    <img :src="item.icon" alt="" />
                </div>
                <div class="span-sm"></div>
                <div class="item" v-for="(item, index) in other_list" :key="index">
                    <img :src="item.icon" alt="" />
                </div>
            </div>
            <div class="span"></div>
            <div class="other">
                <div class="row">
                    <div class="item item-active">EN</div>
                    <div class="item">繁</div>
                </div>
                <div class="row">
                    <div class="item">User.A</div>
                    <div class="item">FAQ</div>
                </div>
                <div class="row">
                    <div class="item">
                        <img src="../../../assets/image/twitter.png" alt="" />
                    </div>
                    <div class="item">
                        <img src="../../../assets/image/telegram.png" alt="" />
                    </div>
                    <div class="item">
                        <img src="../../../assets/image/discord.png" alt="" />
                    </div>
                    <div class="item">
                        <img src="../../../assets/image/facebook.png" alt="" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { computed, readonly, ref, provide, inject } from 'vue'
import store from '@/store'

const menuItemValue: any = inject('title') // 菜单标题
const setTitle: any = inject('setTitle') // 设置菜单
const setLoading: any = inject('setLoading') // 设置loading
const login: any = inject('login') // 登录
const logout: any = inject('logout') // 注销
const toPage: any = inject('toPage') // 跳转到新页面
const IsActive: any = inject('IsActive') // 是否激活
const changeShow: any = inject('changeShow') // 是否显示
const selectMenuItem: any = inject('selectMenuItem') // 设置子菜单
const marketplace_list: any = inject('marketplace_list') // 菜单列表
const prediction_list: any = inject('prediction_list') // 菜单列表
const other_list: any = inject('other_list') // 菜单列表

const accounts = computed(() => store.state.moralis?.user.accounts)
const username = computed(() => store.state.moralis?.user.username)
</script>

<style lang="less" scoped>
.home {
    background-image: url('@/assets/image/bg_blurEffect.png');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    padding: 20px;
    overflow: auto;
    height: 100%;
    display: flex;
    .left-menu {
        height: 100%;
        width: 160px;
        max-width: 160px;
        padding: 10px;
        background-color: rgba(0, 0, 0, 0.6);
        border-radius: 12px;
        box-shadow: 0 0 20px rgba(0, 0, 0, 0.3);
        display: flex;
        flex-direction: column;
        align-items: center;
        transition: all 230ms ease-out;
        .user {
            width: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
            .logo {
                padding: 30px;
                display: flex;
                justify-content: center;
                align-items: center;

                img {
                    width: 100%;
                    max-width: 110px;
                    cursor: pointer;
                }
            }
            .connected {
                display: flex;
                align-items: center;
                justify-content: center;
                padding: 0 10px;
                .connected-btn {
                    padding: 10px 16px;
                    border-radius: 14px;
                    background-color: #7092c0;
                    color: rgba(255, 255, 255, 0.8);
                    font-size: 14px;
                    cursor: pointer;
                    text-align: center;
                    overflow: hidden;
                    transition: all 230ms ease-out;
                    &:before {
                        content: 'Connected';
                    }
                    &:hover {
                        transition: all 230ms ease-out;
                        background-color: #2d5791;
                        color: rgba(255, 255, 255, 1);
                    }
                }
                .connected-btn-close {
                    background-color: #2d5791;
                    &:hover {
                        background-color: #7092c0;
                        color: rgba(255, 255, 255, 1);
                    }
                }
            }
        }

        .wallet {
            padding: 10px;
            overflow: hidden;
            .wallet-content {
                display: flex;
                flex-direction: column;
                justify-content: center;
                .title {
                    padding: 10px;
                    height: 80px;
                    display: flex;
                    align-items: center;
                    color: rgba(255, 255, 255, 0.5);
                    img {
                        width: 40px;
                        margin-right: 10px;
                    }
                    .username {
                        width: 60px;
                    }
                }
                .row {
                    padding-left: 60px;
                    height: 40px;
                    display: flex;
                    align-items: center;
                    color: rgba(255, 255, 255, 0.5);
                }
                .disconnect {
                    width: 100%;
                    height: 60px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 14px;
                    .disconnect-btn {
                        width: 120px;
                        height: 30px;
                        border-radius: 20px;
                        background-color: rgba(173, 0, 0, 0.5);
                        color: rgba(255, 255, 255, 0.5);
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        cursor: pointer;
                        transition: all 230ms ease-out;
                        &:hover {
                            background-color: rgba(173, 0, 0, 1);
                            color: rgba(255, 255, 255, 0.5);
                        }
                    }
                }
            }
        }

        .content {
            width: 100%;
            flex: 1;
            height: 0;
            padding: 0 20px;
            display: flex;
            flex-direction: column;
            align-items: center;
            overflow: auto;
            .item {
                padding: 5px 20px;
                display: flex;
                justify-content: center;
                align-items: center;
                width: 100%;
                img {
                    max-height: 60px;
                }
            }
            .span-sm {
                margin: 10px 0;
                width: 20%;
                height: 1px;
                min-height: 1px;
                background-color: rgba(255, 255, 255, 0.1);
            }
        }
        .other {
            color: rgba(255, 255, 255, 0.5);
            font-size: 14px;
            width: 100%;
            overflow: hidden;
            .row {
                display: flex;
                align-items: center;
                justify-content: center;
                height: 20px;
                max-height: 40px;
                width: 100%;

                .item {
                    width: 100%;
                    padding: 0 10px;
                    cursor: pointer;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    &:hover {
                        color: rgba(255, 255, 255, 1);
                        img {
                            opacity: 1;
                        }
                    }
                    img {
                        width: 100%;
                        max-width: 80px;
                        opacity: 0.5;
                        transition: all 230ms ease-out;
                    }
                }
                .item-active {
                    color: rgba(255, 255, 255, 1);
                }
            }
        }
        .span {
            margin: 20px 0;
            width: 20%;
            height: 1px;
            background-color: rgba(255, 255, 255, 0.1);
        }

        /* 滚动槽（轨道）宽高 */
        ::-webkit-scrollbar {
            width: 0; /*对垂直流动条有效*/
            height: 20px; /*对水平流动条有效*/
        }
        /* 滚动槽（轨道）样式 */
        ::-webkit-scrollbar-track {
            background-color: rgba(0, 0, 0, 0.1);
            border-radius: 8px;
        }

        /*定义滑块颜色、内阴影及圆角*/
        ::-webkit-scrollbar-thumb {
            border-radius: 5px;
            background-color: #7092c0;
        }
    }
}
</style>
