<template>
    <div class="relative homeB">
        <loading :show="loadingShow"></loading>
        <div class="left-menu">
            <div class="user" v-if="!accounts">
                <div class="logo" @click="toPage()"><img src="@/assets/image/logo.png" alt="" /></div>
                <div class="connected">
                    <div class="truncate connected-btn" @click="login()">Connected</div>
                </div>
            </div>
            <div v-else class="wallet">
                <div class="wallet-content">
                    <div class="item">
                        <div>20</div>
                        <div>BNB</div>
                    </div>
                    <div class="item">
                        <div>2684</div>
                        <div>LBTT</div>
                    </div>
                    <div class="disconnect" @click="logout">Disconnect</div>
                </div>
            </div>
            <div class="span"></div>
            <div class="content">
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
                <div class="switch-item"></div>
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
import { computed, readonly, ref, provide, inject, onMounted } from 'vue'
import store from '@/store'
import web3 from '@/tools/moralis'
import { loadingShow, setLoading, toPage, login, logout, marketplace_list, prediction_list, other_list, title, setTitle, selectMenuItem, IsActive, isShow, changeShow } from '../js/left'
// import { loadingShow, setLoading, title, setTitle } from '../js/right'
const accounts = computed(() => store.state.moralis?.user.accounts)
const username = computed(() => store.state.moralis?.user.username)
login(false)
</script>

<style lang="less" scoped>
.homeB {
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
        overflow: hidden;
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
                .connected-btn {
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
            width: 100%;
            overflow: hidden;
            .wallet-content {
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                .item {
                    padding: 10px 20px;
                    display: flex;
                    align-items: center;
                    flex-direction: column;
                    color: rgba(255, 255, 255, 0.5);
                    justify-content: space-between;
                    div {
                        padding: 4px;
                    }
                }
                .disconnect {
                    margin-top: 10px;
                    height: 16px;
                    max-height: 44px;
                    width: 60px;
                    max-width: 200px;
                    padding: 12px 20px;
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
            width: 100px;
            .switch-item {
            }
        }
    }
}
</style>
