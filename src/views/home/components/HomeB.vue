<template>
    <div class="homeB">
        <loading :show="loadingShow"></loading>
        <div class="left-menu">
            <div class="user">
                <div class="logo" @click="toPage()"><img src="@/assets/image/logo.png" alt="" /></div>
                <div class="connected" v-if="!Accounts" @click="login()">Connected</div>
                <div class="connected connected-close" v-else @click="logout()">{{ Username(4) }}</div>
            </div>
            <div class="span"></div>
            <div class="menu-list">
                <div class="item" :class="[{ 'item-active': IsActive(item.name, title) }]" v-for="(item, index) in marketplace_list" :key="index" @click="selectMenuItem(item.name)">
                    <img :src="IsActive(item.name, title) ? item.icon_active : item.icon" alt="" />
                </div>
                <div class="span-sm"></div>
                <div class="item" :class="[{ 'item-active': IsActive(item.name, title) }]" v-for="(item, index) in prediction_list" :key="index" @click="selectMenuItem(item.name)">
                    <img :src="IsActive(item.name, title) ? item.icon_active : item.icon" alt="" />
                </div>
                <div class="span-sm"></div>
                <div class="item" :class="[{ 'item-active': IsActive(item.name, title) }]" v-for="(item, index) in other_list" :key="index" @click="selectMenuItem(item.name)">
                    <img :src="IsActive(item.name, title) ? item.icon_active : item.icon" alt="" />
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
        <div class="right-content">
            <div class="title">{{ title }} {{ loadingShow }}</div>
            <div class="switch">
                <div class="switch-item" :class="[{ 'switch-item-active': IsActive(item, state) }]" v-for="(item, index) in state_list" :key="index" @click="selectState(item)">{{ item }}</div>
            </div>
            <div style="margin-top: 30px"></div>
            <div style="color: rgba(255, 255, 255, 0.7); padding: 10px 20px" @click="web3.getNFTs">getNFTs</div>
            <div style="color: rgba(255, 255, 255, 0.7); padding: 10px 20px" @click="web3.getNFTOwners('0x46700948aC4B23EdbeCb49513946af519d5602Fa')">getNFTOwners</div>
            <div style="color: rgba(255, 255, 255, 0.7); padding: 10px 20px" @click="web3.getAllTokenIds('0x46700948aC4B23EdbeCb49513946af519d5602Fa')">getAllTokenIds</div>
            <div style="color: rgba(255, 255, 255, 0.7); padding: 10px 20px" @click="web3.transfer()">transfer</div>
            <div style="margin-top: 30px"></div>
            <div style="color: rgba(255, 255, 255, 0.7); padding: 10px 20px" @click="web3.getContract('GameItems')">getContract</div>
            <div style="color: rgba(255, 255, 255, 0.7); padding: 10px 20px" @click="web3.setApprovalForAll('GameItems', '0x1be539C65482A6DC6B8422544171cc7EE6b22fD1')">setApprovalForAll</div>
            <div style="color: rgba(255, 255, 255, 0.7); padding: 10px 20px" @click="web3.getBalance()">getBalance</div>
            <div style="color: rgba(255, 255, 255, 0.7); padding: 10px 20px" @click="web3.getAccounts()">getAccounts</div>
            <div style="color: rgba(255, 255, 255, 0.7); padding: 10px 20px" @click="web3.call()">call</div>
            <div style="color: rgba(255, 255, 255, 0.7); padding: 10px 20px" @click="web3.send()">send</div>
            <div style="color: rgba(255, 255, 255, 0.7); padding: 10px 20px" @click="web3.addListing()">addListing</div>
            <div style="color: rgba(255, 255, 255, 0.7); padding: 10px 20px" @click="web3.purchase()">purchase</div>
            <div style="margin-top: 30px"></div>
        </div>
    </div>
</template>
<script setup lang="ts">
import loading from '@/components/loading/loading.vue'
import web3 from '@/tools/moralis'

// 引入公共变量
import { loadingShow, marketplace_list, prediction_list, other_list, title, selectMenuItem, isShow } from '../js/left'
import { state_list, state, class_list, _class, rarity_list, rarity } from '../js/right'

// 引入公共方法
import { setLoading, toPage, login, logout, setTitle, changeShow } from '../js/left'
import { selectState, selectClass, selectRarity } from '../js/right'

// 引入公共计算属性
import { IsActive, Accounts, Username } from '../js/left'
login(false)
</script>

<style lang="less" scoped>
.homeB {
    position: relative;
    background-image: url('@/assets/image/bg_blurEffect.png');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    padding: 20px;
    height: 100%;
    display: flex;
    .left-menu {
        height: 100%;
        width: 80px;
        max-width: 240px;
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
            max-width: 180px;
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
                    cursor: pointer;
                }
            }
            .connected {
                height: 16px;
                max-height: 44px;
                width: 60px;
                max-width: 200px;
                padding: 12px 20px;
                border-radius: 14px;
                background-color: #7092c0;
                color: rgba(255, 255, 255, 0.8);
                font-size: 1.5vw;
                cursor: pointer;
                text-align: center;
                overflow: hidden;
                transition: all 230ms ease-out;
                display: flex;
                align-items: center;
                justify-content: center;
                &:hover {
                    transition: all 230ms ease-out;
                    background-color: #2d5791;
                    color: rgba(255, 255, 255, 1);
                }
            }
            .connected-close {
                background-color: #2d5791;
                &:hover {
                    background-color: #9e300f;
                    color: rgba(255, 255, 255, 1);
                }
            }
        }
        .menu-list {
            width: 100%;
            flex: 1;
            height: 0;
            padding: 0 20px;
            display: flex;
            flex-direction: column;
            align-items: center;
            overflow-x: visible;
            overflow-y: auto;

            .item {
                position: relative;
                padding: 10px 20px;
                display: flex;
                justify-content: center;
                align-items: center;
                min-width: 48px;
                width: 40px;
                max-width: 100px;
                opacity: 0.5;
                transition: all 230ms ease-out;
                cursor: pointer;
                img {
                    width: 100%;
                }
                &:hover {
                    transform: scale(1.1);
                    opacity: 1;
                }
            }
            .item-active {
                opacity: 1;
            }
            .span-sm {
                margin: 10px 0;
                width: 10%;
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
            padding: 10px 0;
            .row {
                display: flex;
                align-items: center;
                justify-content: center;
                height: 20px;
                max-height: 50px;
                width: 100%;
                .item {
                    padding: 0 10px;
                    cursor: pointer;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    font-size: 1.5vmin;
                    opacity: 0.5;
                    transition: all 230ms ease-out;
                    color: rgba(255, 255, 255, 1);
                    img {
                        min-width: 20px;
                        width: 80%;
                        max-width: 30px;
                    }
                    &:hover {
                        opacity: 1;
                    }
                }
                .item-active {
                    opacity: 1;
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
            width: 2px; /*对垂直流动条有效*/
            max-width: 2px;
            height: 0; /*对水平流动条有效*/
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
    .right-content {
        flex: 1;
        margin-left: 20px;
        height: 100%;
        background-color: rgba(36, 39, 54, 1);
        border-radius: 12px;
        box-shadow: 0 0 20px rgba(0, 0, 0, 0.3);
        padding: 10px;
        .title {
            font-size: 40px;
            height: 30px;
            max-height: 80px;
            padding: 10px;
            display: flex;
            align-items: center;
            color: rgba(255, 255, 255, 0.5);
        }
        .switch {
            display: flex;
            align-items: center;
            justify-content: space-between;
            background-color: #7092c0;
            margin: 10px;
            border-radius: 20px;
            padding: 10px 0;
            width: 100px;
            .switch-item {
                color: rgba(255, 255, 255, 0.5);
                margin: 0 10px;
                border-radius: 20px;
                padding: 10px;
                font-size: 1.4vw;
                flex: 1;
                display: flex;
                align-items: center;
                justify-content: center;
                cursor: pointer;
                transition: all 230ms ease-out;
                &:hover {
                    color: rgba(255, 255, 255, 1);
                    background-color: #2d5791;
                }
            }
            .switch-item-active {
                background-color: #2d5791;
                color: rgba(255, 255, 255, 1);
            }
        }
    }
}
</style>
