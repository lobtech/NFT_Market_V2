<template>
    <div class="relative home">
        <loading :show="_loading_show_2"></loading>
        <div class="tip" v-if="!Accounts" @click="login()">connect to wallek</div>
        <!-- 头部 -->
        <div class="title">
            <div class="title-logo" @click="hasMenu()">
                <img src="../../../assets/image/fix.png" alt="" />
            </div>
            <div class="title-text">{{ 'MARKET' || _title }}</div>
            <div class="title-right">
                <img src="../../../assets/image/logo.png" alt="" />
                <!-- <svg class="z-icon" aria-hidden="true">
                    <use xlink:href="#z-icon-screen"></use>
                </svg>
                <svg class="z-icon" aria-hidden="true">
                    <use xlink:href="#z-icon-other"></use>
                </svg> -->
            </div>
        </div>
        <!-- 分割线 -->
        <div class="menu-list" v-if="menu_show">
            <div class="select" :class="[{ 'select-active': IsActive('0', _is_show) }]">
                <div class="title" @click="changeShow('0')">
                    <div>NFT Marketplace</div>
                    <img src="@/assets/image/top.png" alt="" />
                </div>
                <div class="list">
                    <div class="item" :class="[{ 'item-active': IsActive(item['name'], _title) }]" v-for="(item, index) in _marketplace_list" :key="index">
                        <div class="item-content" @click="selectMenuItem(item['name'])">
                            <img :src="IsActive(item['name'], _title) ? item['icon_active'] : item['icon']" alt="" />
                            <div>{{ item['name'] }}</div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="select" :class="[{ 'select-active': IsActive('1', _is_show) }]">
                <div class="title" @click="changeShow('1')">
                    <div>Prediction</div>
                    <img src="@/assets/image/top.png" alt="" />
                </div>
                <div class="list">
                    <div class="item" :class="[{ 'item-active': IsActive(item['name'], _title) }]" v-for="(item, index) in _prediction_list" :key="index">
                        <div class="item-content" @click="selectMenuItem(item['name'])">
                            <img :src="IsActive(item['name'], _title) ? item['icon_active'] : item['icon']" alt="" />
                            <div>{{ item['name'] }}</div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="select" :class="[{ 'select-active': IsActive('2', _is_show) }]">
                <div class="title" @click="changeShow('2')">
                    <div>Other</div>
                    <img src="@/assets/image/top.png" alt="" />
                </div>
                <div class="list">
                    <div class="item" :class="[{ 'item-active': IsActive(item['name'], _title) }]" v-for="(item, index) in _other_list" :key="index">
                        <div class="item-content" @click="selectMenuItem(item['name'])">
                            <img :src="IsActive(item['name'], _title) ? item['icon_active'] : item['icon']" alt="" />
                            <div>{{ item['name'] }}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="line"></div>
        <!-- 筛选商品 -->
        <div class="fillter">
            <div class="buttons">
                <div class="switch">
                    <div class="switch-item" :class="[{ 'switch-item-active': IsActive(item, _state) }]" v-for="(item, index) in _state_list" :key="index" @click="selectState(item)">{{ item }}</div>
                </div>
                <div class="odds">
                    <div class="odds-row">
                        <div class="row-title">Class：</div>
                        <div class="row-item" :class="[{ 'row-item-active': IsActive(item, _class) }]" v-for="(item, index) in _class_list" :key="index" @click="selectClass(item)">{{ item }}</div>
                    </div>
                    <div class="odds-row">
                        <div class="row-title">Rarity：</div>
                        <div class="row-item" :class="[{ 'row-item-active': IsActive(item, _rarity) }]" v-for="(item, index) in _rarity_list" :key="index" @click="selectRarity(item)">{{ item }}</div>
                    </div>
                </div>
            </div>
        </div>
        <!-- 商品 -->
        <div class="list">
            <div class="list-none" v-if="_list.length === 0">IS NULL</div>
            <div class="list-item" v-for="(item, index) in _list" :key="index">
                <div class="list-item-card">
                    <div class="img" :style="[{ 'background-image': `url( ${Metadata(item.metadata, 'image')} )` }]"></div>
                    <div class="content">
                        <div class="row">
                            <div>{{ Metadata(item.metadata, 'name') }}.V10</div>
                            <div style="color: rgba(255, 255, 255, 1); font-size: 16px">0.8800TNT</div>
                        </div>
                        <div class="row" style="color: rgba(255, 255, 255, 0.3)">{{ Metadata(item.metadata, 'description') }}</div>
                        <div class="row" style="color: #7092c0">
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
</template>
<script setup lang="ts">
import loading from '@/components/loading/loading.vue'
// 引入公共变量
import { _loading_show, _marketplace_list, _prediction_list, _other_list, _title, _is_show } from '../js/left'
import { _state_list, _state, _class_list, _class, _rarity_list, _rarity, _list, _loading_show_2 } from '../js/right'

// 引入公共方法
import { setLoading, toPage, login, logout, setTitle, changeShow, selectMenuItem } from '../js/left'
import { selectState, selectClass, selectRarity } from '../js/right'

// 引入公共计算属性
import { Metadata } from '../js/right'
import { IsActive, Accounts, Username } from '../js/left'

//引入移动端独有的变量
import { menu_show } from '../js/moble'

//引入移动端独有的方法
import { hasMenu } from '../js/moble'
</script>

<style lang="less" scoped>
@keyframes springtimeAniamtScale2 {
    0% {
        transform: translateX(-100%);
    }
    50% {
        transform: translateX(-20%);
    }
    100% {
        transform: translateX(0%);
    }
}
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
        position: fixed;
        left: 0;
        top: 0;
        z-index: 99;
        background-color: #242736;
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
        background-color: #242736;
        backdrop-filter: blur(20px);
        color: #fff;
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
            font-size: 22px;
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
            opacity: 0.8;
        }
        .title-right {
            img {
                height: 32px;
                max-height: 35px;
            }
            .z-icon {
                font-size: 28px;
                padding: 4px;
                opacity: 0.5;
            }
        }
    }
    .menu-list {
        position: fixed;
        left: 0;
        top: calc(12.8vw + 2.5vw);
        width: 40%;
        flex: 1;
        display: flex;
        flex-direction: column;
        color: #242736;
        background-color: #242736;
        z-index: 11;
        animation: springtimeAniamtScale2 0.5s linear;
        .select {
            & > .title {
                font-size: 12px;
                height: 35px;
                max-height: 60px;
                display: flex;
                align-items: center;
                justify-content: space-between;
                cursor: pointer;
                transition: all 230ms ease-out;
                color: rgba(255, 255, 255, 1);
                opacity: 0.5;
                background-color: #242736;
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
                    height: 40px;
                    max-height: 40px;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    // padding: 4px 0;
                    // padding: 5px 0;
                    .item-content {
                        font-size: 12px;
                        height: 100%;
                        display: flex;
                        align-items: center;
                        padding: 5px 10px;
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
    .line {
        background: #7092c0;
        height: 2.5vw;
        position: fixed;
        left: 0;
        width: 100%;
    }
    .fillter {
        padding: 25px 16px 15px 16px;
        border-bottom: 2px solid #7092c0;
        color: #fff;
        font-size: 12px;
        position: fixed;
        left: 0;
        top: 14vw;
        width: 100%;
        background-color: rgba(36, 39, 54, 1);
        .buttons {
            .switch {
                display: flex;
                align-items: center;
                justify-content: space-between;
                background-color: #7092c0;
                margin: 0 0 5px 0;
                border-radius: 10px;
                padding: 6px 0;
                max-width: 140px;
                .switch-item {
                    color: rgba(255, 255, 255, 0.5);
                    margin: 0 3px;
                    border-radius: 20px;
                    padding: 2px 2px;
                    font-size: 12px;
                    flex: 1;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                    transition: all 230ms ease-out;
                    border: 1px solid rgba(255, 255, 255, 0);
                }
                .switch-item-active {
                    background-color: #2d5791;
                    color: rgba(255, 255, 255, 1);
                }
            }
        }
        .odds {
            padding: 0 10px;
            color: rgba(255, 255, 255, 0.5);
            .odds-row {
                margin-top: 10px;
                display: flex;
                align-items: center;
                .row-title {
                    font-size: 16px;
                    line-height: 1;
                }
                .row-item {
                    font-size: 12px;
                    padding: 2px 4px;
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
    }
    & > .list {
        margin: 10px 0;
        flex: 1;
        padding: 10px 0;
        display: flex;
        flex-wrap: wrap;
        justify-content: flex-start;
        align-content: flex-start;
        overflow-y: auto;
        margin-top: 39vw;
        min-height: calc(100vh - 39vw - 12.8vw);
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
            width: 50%;
            height: 22vw;
            min-height: 210px;
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
                        font-size: 12px;
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
}
</style>
