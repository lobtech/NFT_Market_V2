<template>
    <!-- 通过innerWidth来动态判断显示不同屏幕的dom 统一调用父级js 节省内存开销 -->
    <homeA v-if="innerWidth < 640"></homeA>
    <!-- <homeB v-else-if="innerWidth < 1080"></homeB> -->
    <homeC v-else></homeC>
</template>
<script setup lang="ts">
import homeA from './components/HomeA.vue'
import homeB from './components/HomeB.vue'
import homeC from './components/HomeC.vue'

import { computed, readonly, ref, provide } from 'vue'
import store from '@/store'
// @ts-ignore 忽略检测
import Moralis from 'moralis/dist/moralis.min.js'

const innerWidth = computed(() => store.state.sys?.innerWidth || 0) // 监听屏幕宽度

// 首屏加载
const loadingShow = ref(false) // 加载状态
const setLoading = (value: boolean) => {
    loadingShow.value = value
}
provide('setLoading', setLoading) // 传递修改loading的方法

// 标题
const title = ref('Houses') // 选择菜单子项
provide('title', readonly(title)) // 传递到子组件 只读
const setTitle = (value: string) => {
    title.value = value
}
provide('setTitle', setTitle) // 传递修改title的方法

// 加载Moralis
const serverUrl = store.state.moralis?.serverUrl
const appId = store.state.moralis?.appId
Moralis.start({ serverUrl, appId }) // 连接到服务器

// 跳转
const toPage = (): void => {
    // window.location.href = 'http://test.pryun.vip'
    getTokenBalances()
}
provide('toPage', toPage) // 传递修改title的方法

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
}
// 选择菜单
const selectMenuItem: any = async (index: string) => {
    if (index === 'My Items' && !store.state.moralis?.user.accounts) {
        await login()
    }
    setTitle(index)
}
provide('toPage', toPage)

// 菜单展开收起
const isShow = ref('0') // 默认0展开
const changeShow = (index: string): void => {
    isShow.value = index
}
provide('changeShow', changeShow)

const getPath = (path: string) => {
    return import.meta.globEager('../../assets/image/market.png')['../../assets/image/market.png'].default
}
// marketplace菜单项
const marketplace_list = [
    { name: 'Market', icon: getPath('../../assets/image/market.png'), icon_active: getPath('../../assets/image/market_active.png') },
    { name: 'My Items', icon: getPath('../../assets/image/my_items.png'), icon_active: getPath('../../assets/image/my_items_active.png') },
    { name: 'Sell', icon: getPath('../../assets/image/sell.png'), icon_active: getPath('../../assets/image/sell_active.png') },
]
provide('marketplace_list', marketplace_list)

// prediction菜单项菜单项
const prediction_list = [
    { name: 'Eggs', icon: getPath('../../assets/image/my_items.png'), icon_active: getPath('../../assets/image/my_items_active.png') },
    { name: 'Houses', icon: getPath('../../assets/image/market.png'), icon_active: getPath('../../assets/image/market_active.png') },
]
provide('prediction_list', prediction_list)

// other菜单项
const other_list = [
    { name: 'Wiki', icon: getPath('../../assets/image/my_items.png'), icon_active: getPath('../../assets/image/my_items_active.png') },
    { name: 'About', icon: getPath('../../assets/image/market.png'), icon_active: getPath('../../assets/image/market_active.png') },
    { name: 'Call us', icon: getPath('../../assets/image/sell.png'), icon_active: getPath('../../assets/image/sell_active.png') },
]
provide('other_list', other_list)

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
provide('login', login)

// 登出
const logout = async () => {
    setLoading(true)
    await Moralis.User.logOut()
    store.dispatch('moralis/logout', true)
    setLoading(false)
}
provide('logout', logout)

// 是否已激活
const IsActive = computed(() => {
    return function (index: string) {
        return index === isShow.value
    }
})
provide('IsActive', IsActive)
</script>

<style scoped></style>
