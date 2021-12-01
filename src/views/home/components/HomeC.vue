<template>
    <div class="relative homeC">
        <div class="left-menu">
            <div class="user" v-if="!accounts">
                <div class="logo" @click="toPage()"><img src="@/assets/image/logo.png" alt="" /></div>
                <div class="connected">
                    <div class="truncate connected-btn" @click="login()">Connected to BSC个</div>
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
                <div class="select" :class="[{ 'select-active': IsActive('0', isShow) }]">
                    <div class="title" @click="changeShow('0')">
                        <div>NFT Marketplace</div>
                        <img src="@/assets/image/top.png" alt="" />
                    </div>
                    <div class="list">
                        <div class="item" :class="[{ 'item-active': IsActive(item['name'], title) }]" v-for="(item, index) in marketplace_list" :key="index">
                            <div class="item-content" @click="selectMenuItem(item['name'])">
                                <img :src="IsActive(item['name'], title) ? item['icon_active'] : item['icon']" alt="" />
                                <div>{{ item['name'] }}</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="select" :class="[{ 'select-active': IsActive('1', isShow) }]">
                    <div class="title" @click="changeShow('1')">
                        <div>Prediction</div>
                        <img src="@/assets/image/top.png" alt="" />
                    </div>
                    <div class="list">
                        <div class="item" :class="[{ 'item-active': IsActive(item['name'], title) }]" v-for="(item, index) in prediction_list" :key="index">
                            <div class="item-content" @click="selectMenuItem(item['name'])">
                                <img :src="IsActive(item['name'], title) ? item['icon_active'] : item['icon']" alt="" />
                                <div>{{ item['name'] }}</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="select" :class="[{ 'select-active': IsActive('2', isShow) }]">
                    <div class="title" @click="changeShow('2')">
                        <div>Other</div>
                        <img src="@/assets/image/top.png" alt="" />
                    </div>
                    <div class="list">
                        <div class="item" :class="[{ 'item-active': IsActive(item['name'], title) }]" v-for="(item, index) in other_list" :key="index">
                            <div class="item-content" @click="selectMenuItem(item['name'])">
                                <img :src="IsActive(item['name'], title) ? item['icon_active'] : item['icon']" alt="" />
                                <div>{{ item['name'] }}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="span"></div>
            <div class="other">
                <div class="row">
                    <div class="item item-active">English</div>
                    <div class="item">繁体中文</div>
                </div>
                <div class="row">
                    <div class="item">User Agreement</div>
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
        <div class="right-content"></div>
    </div>
</template>
<script setup lang="ts">
import store from '@/store'
import { computed, ref } from 'vue'
import { loadingShow, setLoading, toPage, login, logout, marketplace_list, prediction_list, other_list, title, setTitle, selectMenuItem, IsActive, isShow, changeShow } from '../js/left'
const accounts = computed(() => store.state.moralis?.user.accounts)
const username = computed(() => store.state.moralis?.user.username)
</script>

<style lang="less" scoped>
.homeC {
    background-image: url('@/assets/image/bg_blurEffect.png');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    padding: 20px;
    min-height: 600px;
    overflow: auto;
    height: 100%;
    display: flex;
    .left-menu {
        height: 100%;
        width: 80px;
        min-width: 240px;
        max-width: 300px;
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
            display: flex;
            flex-direction: column;
            align-items: center;
            .logo {
                width: 100%;
                padding: 30px;
                display: flex;
                justify-content: center;
                align-items: center;

                img {
                    width: 100%;
                    max-width: 140px;
                    cursor: pointer;
                }
            }
            .connected {
                display: flex;
                align-items: center;
                justify-content: center;
                .connected-btn {
                    height: 16px;
                    max-height: 44px;
                    width: 60px;
                    max-width: 200px;
                    padding: 12px 20px;
                    border-radius: 14px;
                    background-color: #7092c0;
                    color: rgba(255, 255, 255, 0.8);
                    font-size: 16px;
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
            padding: 10px 20px;
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
            padding: 0 30px;
            display: flex;
            flex-direction: column;
            overflow-y: auto;
            color: rgba(255, 255, 255, 0.8);

            .select {
                // background-color: red;
                & > .title {
                    font-size: 18px;
                    height: 60px;
                    max-height: 60px;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    cursor: pointer;
                    transition: all 230ms ease-out;
                    color: rgba(255, 255, 255, 1);
                    opacity: 0.5;
                    img {
                        height: 20%;
                        transition: all 230ms ease-out;
                    }
                    .z-icon {
                        font-size: 20px;
                        font-weight: bolder;
                    }
                    &:hover {
                        opacity: 1;
                    }
                }
                .list {
                    max-height: 0px;
                    overflow: hidden;
                    transition: all 230ms ease-out;
                    .item {
                        height: 80px;
                        max-height: 80px;
                        display: flex;
                        flex-direction: column;
                        justify-content: center;
                        padding: 4px 0;
                        // padding: 5px 0;
                        .item-content {
                            font-size: 18px;
                            height: 100%;
                            display: flex;
                            align-items: center;
                            padding: 10px 10px;
                            cursor: pointer;
                            transition: all 230ms ease-out;
                            color: rgba(255, 255, 255, 1);
                            opacity: 0.5;
                            border-radius: 34px 0 0 34px;
                            img {
                                height: 100%;
                                margin-right: 10px;
                            }
                            &:hover {
                                opacity: 1;
                                background: linear-gradient(to right, #7092c0, rgba(0, 0, 0, 0));
                            }
                        }
                    }
                    .item-active > .item-content {
                        opacity: 1;
                        background: linear-gradient(to right, #7092c0, rgba(0, 0, 0, 0));
                    }
                }
            }
            .select-active {
                .title {
                    opacity: 1;
                    img {
                        transform: rotate(180deg);
                    }
                }
                .list {
                    max-height: 300px;
                }
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
                margin: auto;
                max-width: 240px;
                .item {
                    padding: 0 10px;
                    cursor: pointer;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    font-size: 14px;
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
    .right-content {
        flex: 1;
        margin-left: 20px;
        height: 100%;
        background-color: rgba(36, 39, 54, 1);
        border-radius: 12px;
        box-shadow: 0 0 20px rgba(0, 0, 0, 0.3);
    }
}
</style>
