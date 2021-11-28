<template>
    <div class="left-menu">
        <div class="menu-xl">
            <div class="p-4 h-full overflow-hidden flex flex-col">
                <div class="wallet" v-if="store.state.moralis?.user.accounts">
                    <div class="wallet-content">
                        <div class="title">
                            <img src="@/assets/image/logo.png" alt="" />
                            <div class="truncate username">{{ store.state.moralis?.user.username }}</div>
                            <div>,Welcome to us !</div>
                        </div>
                        <div class="row" @click="callCloud">
                            <div>通用币：</div>
                            <div>20 BNB</div>
                        </div>
                        <div class="row" @click="getTokenBalances">
                            <div>商城币：</div>
                            <div>2684 LBTT</div>
                        </div>
                        <div class="disconnect">
                            <div class="disconnect-btn" @click="logout">Disconnect</div>
                        </div>
                    </div>
                </div>
                <div class="index" v-else>
                    <div class="logo" @click="toPage()"><img src="@/assets/image/logo.png" alt="" /></div>
                    <div class="connected">
                        <div class="truncate connected-btn" @click="login">Connected to BSC个</div>
                    </div>
                </div>
                <div class="span"></div>
                <div class="content">
                    <div class="scroll">
                        <div class="select" :class="[{ 'select-active': IsActive('0', isShow) }]">
                            <div class="title" @click="changeShow('0')">
                                <div>NFT Marketplace</div>
                                <img src="@/assets/image/top.png" alt="" />
                            </div>
                            <div class="list">
                                <div class="item" :class="[{ 'item-active': IsActive(item['name'], menuItemValue) }]" v-for="(item, index) in marketplace_list" :key="index">
                                    <div class="item-content" @click="selectMenuItem(item['name'])">
                                        <img :src="IsActive(item['name'], menuItemValue) ? item['icon_active'] : item['icon']" alt="" />
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
                                <div class="item" :class="[{ 'item-active': IsActive(item['name'], menuItemValue) }]" v-for="(item, index) in prediction_list" :key="index">
                                    <div class="item-content" @click="selectMenuItem(item['name'])">
                                        <img :src="IsActive(item['name'], menuItemValue) ? item['icon_active'] : item['icon']" alt="" />
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
                                <div class="item" :class="[{ 'item-active': IsActive(item['name'], menuItemValue) }]" v-for="(item, index) in other_list" :key="index">
                                    <div class="item-content" @click="selectMenuItem(item['name'])">
                                        <img :src="IsActive(item['name'], menuItemValue) ? item['icon_active'] : item['icon']" alt="" />
                                        <div>{{ item['name'] }}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="span"></div>
                <div class="other">
                    <div class="row">
                        <div class="item item-active">English</div>
                        <div class="item">繁體中文</div>
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
        </div>
    </div>
</template>
<script setup lang="ts">
import store from '../../../store'
import { computed, inject, ref } from 'vue'

// @ts-ignore 忽略检测
import Moralis from 'moralis/dist/moralis.min.js'
const serverUrl = store.state.moralis?.serverUrl
const appId = store.state.moralis?.appId
Moralis.start({ serverUrl, appId }) // 连接到服务器

const menuItemValue: any = inject('title') // 菜单标题
const setTitle: any = inject('setTitle') // 设置菜单
const setLoading: any = inject('setLoading') // 设置loading

// 跳转
const toPage = (): void => {
    // window.location.href = 'http://test.pryun.vip'
    getTokenBalances()
}
// 查询本地余额
const getNativeBalance = async () => {
    const chain = store.state.moralis?.chain
    const address = store.state.moralis?.address
    console.log(`---------->查询本地余额:address`, address)
    const res = await Moralis.Web3API.account.getNativeBalance({ chain, address })
    console.log(`---------->日志输出:res`, res)
}
// 查询令牌余额
const getTokenBalances = async () => {
    const chain = store.state.moralis?.chain
    const address = store.state.moralis?.user.accounts
    console.log(`---------->查询令牌余额:address`, address)
    const res = await Moralis.Web3API.account.getTokenBalances({ chain, address })
    console.log(`---------->日志输出:res`, res)
}
// 转移资产
const transfer = async () => {
    const address = store.state.moralis?.address
    const options = {
        type: 'native', // 货币类型['native','erc20','erc721','erc1155'] === ['通用货币','游戏代币','唯一资产','其他多数量资产']
        // amount: Moralis.Units.Token('10', '18'), // 数量（唯一资产没有数量）
        amount: 1, // 数量（唯一资产没有数量）
        receiver: '0xF55c6Be2F9390301bFc66Dd9f7f52495B56301dC', // 交易对象
        contractAddress: address, // 交易对象所在合约地址
        tokenId: '0', // NFT资产id
    }
    let res = await Moralis.transfer(options)
}
// 请求云函数
const callCloud = async () => {
    const params = { movie: 'The Matrix' }
    const res = await Moralis.Cloud.run('getAvgGas', params)
    console.log(`---------->日志输出:res`, res)
    // const options = {
    //     contractAddress: '0xe...56',
    //     functionName: 'allowance',
    //     abi: 'ABI',
    //     params: {
    //         owner: '0x2...45',
    //         spender: '0x3...49',
    //     },
    // }
    // const allowance = await Moralis.executeFunction(options)
}
// 选择菜单
const selectMenuItem: any = async (index: string) => {
    if (index === 'My Items' && !store.state.moralis?.user.accounts) {
        await login()
    }
    setTitle(index)
}

// 菜单展开收起
const isShow = ref('0') // 默认0展开
const changeShow = (index: string): void => {
    isShow.value = index
}
// marketplace菜单项
const marketplace_list = [
    { name: 'Market', icon: import.meta.globEager('../../../assets/image/market.png')['../../../assets/image/market.png'].default, icon_active: import.meta.globEager('../../../assets/image/market_active.png')['../../../assets/image/market_active.png'].default },
    { name: 'My Items', icon: import.meta.globEager('../../../assets/image/my_items.png')['../../../assets/image/my_items.png'].default, icon_active: import.meta.globEager('../../../assets/image/my_items_active.png')['../../../assets/image/my_items_active.png'].default },
    { name: 'Sell', icon: import.meta.globEager('../../../assets/image/sell.png')['../../../assets/image/sell.png'].default, icon_active: import.meta.globEager('../../../assets/image/sell_active.png')['../../../assets/image/sell_active.png'].default },
]
// prediction菜单项菜单项
const prediction_list = [
    { name: 'Eggs', icon: import.meta.globEager('../../../assets/image/my_items.png')['../../../assets/image/my_items.png'].default, icon_active: import.meta.globEager('../../../assets/image/my_items_active.png')['../../../assets/image/my_items_active.png'].default },
    { name: 'Houses', icon: import.meta.globEager('../../../assets/image/market.png')['../../../assets/image/market.png'].default, icon_active: import.meta.globEager('../../../assets/image/market_active.png')['../../../assets/image/market_active.png'].default },
]
// other菜单项
const other_list = [
    { name: 'Wiki', icon: import.meta.globEager('../../../assets/image/my_items.png')['../../../assets/image/my_items.png'].default, icon_active: import.meta.globEager('../../../assets/image/my_items_active.png')['../../../assets/image/my_items_active.png'].default },
    { name: 'About', icon: import.meta.globEager('../../../assets/image/market.png')['../../../assets/image/market.png'].default, icon_active: import.meta.globEager('../../../assets/image/market_active.png')['../../../assets/image/market_active.png'].default },
    { name: 'Call us', icon: import.meta.globEager('../../../assets/image/sell.png')['../../../assets/image/sell.png'].default, icon_active: import.meta.globEager('../../../assets/image/sell_active.png')['../../../assets/image/sell_active.png'].default },
]
// 登录
const login = async () => {
    setLoading(true)
    try {
        // let user = await Moralis.User.currentAsync()
        let user = null
        if (!user) {
            // console.log(`---------->未登录:user`, user)
            user = await Moralis.authenticate()
        }
        store.dispatch('moralis/init', user.attributes)
        // console.log(`---------->日志输出:user`, user)
    } catch (error) {}
    setLoading(false)
}
// 登出
const logout = async () => {
    setLoading(true)
    await Moralis.User.logOut()
    store.dispatch('moralis/logout', true)
    setLoading(false)
}

// 是否已激活
const IsActive = computed(() => {
    return function (index: string, key: string) {
        return index === key
    }
})
</script>
<style lang="scss" scoped>
.menu {
    height: 100%;
    background-color: red;
}
.menu-xl {
    position: absolute;
    left: 0;
    top: 0;
    background-color: rgba(0, 0, 0, 0.6);
    width: 320px;
    height: 100%;
}
.left-menu {
    background-color: rgba(0, 0, 0, 0.6);
}

.wallet {
    width: 100%;
    height: 240px;
    padding: 10px;
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
.index {
    width: 100%;
    height: 240px;
    padding: 10px;
    .logo {
        height: 180px;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        img {
            position: relative;
            width: 160px;
            cursor: pointer;
        }
    }
    .connected {
        height: 60px;
        display: flex;
        align-items: center;
        justify-content: center;
        .connected-btn {
            width: 220px;
            height: 36px;
            padding: 0 20px;
            line-height: 36px;
            border-radius: 14px;
            background-color: #7092c0;
            color: rgba(255, 255, 255, 0.8);
            font-size: 18px;
            cursor: pointer;
            transition: all 230ms ease-out;
            &:hover {
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

.content {
    width: 100%;
    flex: 1;
    height: 0;
    padding: 0 20px;
    display: flex;
    flex-direction: column;

    .scroll {
        width: 100%;
        padding: 0 20px;
        flex: 1;
        height: 0;
        color: rgba(255, 255, 255, 0.8);
        overflow-y: auto;

        .select {
            // background-color: red;
            & > .title {
                font-size: 18px;
                height: 60px;
                display: flex;
                align-items: center;
                justify-content: space-between;
                padding: 0 10px;
                cursor: pointer;
                transition: all 230ms ease-out;
                color: rgba(255, 255, 255, 1);
                opacity: 0.5;
                img {
                    height: 10px;
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
                    height: 90px;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    .item-content {
                        font-size: 18px;
                        height: 70px;
                        display: flex;
                        align-items: center;
                        padding: 0 20px;
                        cursor: pointer;
                        transition: all 230ms ease-out;
                        color: rgba(255, 255, 255, 1);
                        opacity: 0.5;
                        border-radius: 34px 0 0 34px;
                        img {
                            width: 40px;
                            height: 40px;
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
}
.other {
    height: 120px;
    color: rgba(255, 255, 255, 0.5);
    font-size: 14px;
    .row {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 36px;
        .item {
            padding: 0 10px;
            transition: all 230ms ease-out;
            cursor: pointer;
            &:hover {
                color: rgba(255, 255, 255, 1);
                img {
                    opacity: 1;
                }
            }
            img {
                width: 20px;
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
    margin: 10px 0;
    width: 50px;
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
</style>
