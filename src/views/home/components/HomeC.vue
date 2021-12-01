<template>
    <div class="homeC">
        <loading :show="loadingShow"></loading>
        <div class="left-menu">
            <div class="user">
                <div class="logo" @click="toPage()"><img src="@/assets/image/logo.png" alt="" /></div>
                <div class="connected" v-if="!Accounts" @click="login()">Connected</div>
                <div class="connected connected-close" v-else @click="logout()">{{ Username(5) }}</div>
            </div>
            <div class="span"></div>
            <div class="menu-list">
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
        <div class="right-content">
            <loading :show="loadingShow2"></loading>
            <div class="title">{{ title }}</div>
            <div class="switch">
                <div class="switch-item" :class="[{ 'switch-item-active': IsActive(item, state) }]" v-for="(item, index) in state_list" :key="index" @click="selectState(item)">{{ item }}</div>
            </div>
            <div class="odds">
                <div class="odds-row">
                    <div class="row-title">Class：</div>
                    <div class="row-item" :class="[{ 'row-item-active': IsActive(item, _class) }]" v-for="(item, index) in class_list" :key="index" @click="selectClass(item)">{{ item }}</div>
                </div>
                <div class="odds-row">
                    <div class="row-title">Rarity：</div>
                    <div class="row-item" :class="[{ 'row-item-active': IsActive(item, rarity) }]" v-for="(item, index) in rarity_list" :key="index" @click="selectRarity(item)">{{ item }}</div>
                </div>
            </div>
            <div class="list">
                <div class="list-none" v-if="list.length === 0">IS NULL</div>
                <div class="list-item" v-for="(item, index) in list" :key="index">
                    <div class="list-item-card">
                        <div class="img" :style="[{ 'background-image': `url( ${Metadata(item.metadata, 'image')} )` }]"></div>
                        <div class="content">
                            <div class="row">
                                <div>{{ Metadata(item.metadata, 'name') }}.V10</div>
                                <div style="color: rgba(255, 255, 255, 1); font-size: 16px">0.8800TNT</div>
                            </div>
                            <div class="row" style="color: rgba(255, 255, 255, 0.3)">{{ Metadata(item.metadata, 'description') }}</div>
                            <div class="row" style="color: #7092c0; opacity: 0.7">
                                <div>Feng</div>
                                <div>shuil</div>
                                <div style="color: azure">200</div>
                                <div>|</div>
                                <div>Magic</div>
                                <div>188</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import loading from '@/components/loading/loading.vue'
import web3 from '@/tools/moralis'

// 引入公共变量
import { loadingShow, marketplace_list, prediction_list, other_list, title, selectMenuItem, isShow } from '../js/left'
import { state_list, state, class_list, _class, rarity_list, rarity, list, loadingShow2 } from '../js/right'

// 引入公共方法
import { setLoading, toPage, login, logout, setTitle, changeShow } from '../js/left'
import { selectState, selectClass, selectRarity } from '../js/right'

// 引入公共计算属性
import { IsActive, Accounts, Username } from '../js/left'
import { Metadata } from '../js/right'
login(false)
</script>

<style lang="less" scoped>
.homeC {
    position: relative;
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
                font-size: 18px;
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
            padding: 0 30px;
            display: flex;
            flex-direction: column;
            overflow-y: auto;
            color: rgba(255, 255, 255, 0.8);

            .select {
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
        position: relative;
        flex: 1;
        margin-left: 20px;
        height: 100%;
        background-color: rgba(36, 39, 54, 1);
        border-radius: 12px;
        box-shadow: 0 0 20px rgba(0, 0, 0, 0.3);
        padding: 10px;
        display: flex;
        flex-direction: column;

        .title {
            margin-top: 10px;
            font-size: 36px;
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
            margin: 10px 0 10px 10px;
            border-radius: 16px;
            padding: 6px 0;
            max-width: 240px;
            .switch-item {
                color: rgba(255, 255, 255, 0.5);
                margin: 0 10px;
                border-radius: 20px;
                padding: 10px;
                font-size: 16px;
                flex: 1;
                display: flex;
                align-items: center;
                justify-content: center;
                cursor: pointer;
                transition: all 230ms ease-out;
                border: 1px solid rgba(255, 255, 255, 0);
                &:hover {
                    color: rgba(255, 255, 255, 1);
                }
            }
            .switch-item-active {
                background-color: #2d5791;
                color: rgba(255, 255, 255, 1);
            }
        }
        .odds {
            margin-top: 20px;
            padding: 0 10px;
            color: rgba(255, 255, 255, 0.5);
            .odds-row {
                margin-top: 10px;
                display: flex;
                align-items: center;
                .row-title {
                    font-size: 20px;
                    line-height: 1;
                }
                .row-item {
                    font-size: 14px;
                    padding: 8px 16px;
                    border: 1px solid rgba(255, 255, 255, 0.5);
                    border-radius: 14px;
                    margin-left: 8px;
                    transition: all 230ms ease-in-out;
                    cursor: pointer;
                    &:hover {
                        color: rgba(255, 255, 255, 1);
                    }
                }
                .row-item-active {
                    color: rgba(255, 255, 255, 1);
                    border: 1px solid #7092c0;
                    background-color: #7092c0;
                }
            }
        }
        .list {
            margin: 10px 0;
            flex: 1;
            height: 0;
            padding: 10px 0;
            display: flex;
            flex-wrap: wrap;
            justify-content: flex-start;
            align-content: flex-start;
            overflow-y: auto;
            .list-none {
                font-size: 20px;
                color: rgba(255, 255, 255, 0.2);
                width: 100%;
                height: 100%;
                display: flex;
                justify-content: center;
                align-items: center;
            }
            .list-item {
                width: 17vw;
                height: 22vw;
                min-width: 160px;
                min-height: 210px;
                max-width: 220px;
                max-height: 280px;
                padding: 10px;
                .list-item-card {
                    height: 100%;
                    width: 100%;
                    background-color: #282b3a;
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.1);
                    cursor: pointer;
                    transition: all 230ms ease-in-out;
                    border-radius: 2px;
                    &:hover {
                        transform: scale(1.05);
                    }
                    .img {
                        height: 60%;
                        width: 100%;
                        background-size: cover;
                        background-position: center;
                        background-repeat: no-repeat;
                    }
                    .content {
                        border-top: 1px solid rgba(255, 255, 255, 0.1);
                        height: 40%;
                        padding: 10px;
                        display: flex;
                        flex-direction: column;

                        .row {
                            color: rgba(255, 255, 255, 0.5);
                            flex: 1;
                            font-size: 14px;
                            display: flex;
                            align-items: center;
                            justify-content: space-between;
                            div {
                                display: flex;
                                align-items: center;
                            }
                        }
                    }
                }
            }
        }
        /* 滚动槽（轨道）宽高 */
        ::-webkit-scrollbar {
            width: 5px; /*对垂直流动条有效*/
            max-width: 5px;
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
}
</style>
