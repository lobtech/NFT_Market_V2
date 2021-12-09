import store from '@/store'
import moralis from '@/tools/moralis'
import web3 from '@/tools/web3'
import { computed, readonly, ref } from 'vue'
import { getData } from '../js/right'

// 首屏加载
const loadingShow = ref(false) // 加载状态
const setLoading = (value: boolean) => {
    loadingShow.value = value
}

// 跳转
const toPage = (): void => {
    window.location.href = 'http://test.pryun.vip'
}

const balances = ref(0.0) // 余额
const tokens_balances = ref(0.0) // 代币余额
// 登录
const login = async (show: boolean = true) => {
    const ethereum = (window as any).ethereum

    // 首次判断matemask网络是否正确
    const { chainId, networkVersion } = store.state.moralis as any

    // 首次进入网络不正确自动注销
    if (ethereum.chainId !== chainId || ethereum.networkVersion !== networkVersion) {
        return console.log(`---------->日志输出:网络不正确`, ethereum)
    }

    let user = await moralis.currentAsync() // 获取已登录的用户信息
    // 静默登录
    if (show) {
        setLoading(true)
        user = await moralis.authenticate()
        setLoading(false)
    }
    if (user) {
        console.log(`---------->日志输出:user`, user)
        await store.dispatch('moralis/init', user.attributes.accounts[0])
        await store.dispatch('moralis/get_info')
    }
}

// 登出
const logout = async () => {
    setLoading(true)
    // console.log(`---------->未登录:user`, user)
    await moralis.logOut()
    store.dispatch('moralis/logout', true)
    setLoading(false)
}

// marketplace菜单项
const marketplace_list = [
    {
        name: 'Market',
        icon: import.meta.globEager('../../../assets/image/market.png')['../../../assets/image/market.png'].default,
        icon_active: import.meta.globEager('../../../assets/image/market_active.png')['../../../assets/image/market_active.png'].default,
    },
    {
        name: 'My Items',
        icon: import.meta.globEager('../../../assets/image/my_items.png')['../../../assets/image/my_items.png'].default,
        icon_active: import.meta.globEager('../../../assets/image/my_items_active.png')['../../../assets/image/my_items_active.png'].default,
    },
    {
        name: 'Sell',
        icon: import.meta.globEager('../../../assets/image/sell.png')['../../../assets/image/sell.png'].default,
        icon_active: import.meta.globEager('../../../assets/image/sell_active.png')['../../../assets/image/sell_active.png'].default,
    },
]

// prediction菜单项菜单项
const prediction_list = [
    {
        name: 'Eggs',
        icon: import.meta.globEager('../../../assets/image/market.png')['../../../assets/image/market.png'].default,
        icon_active: import.meta.globEager('../../../assets/image/market_active.png')['../../../assets/image/market_active.png'].default,
    },
    {
        name: 'Houses',
        icon: import.meta.globEager('../../../assets/image/my_items.png')['../../../assets/image/my_items.png'].default,
        icon_active: import.meta.globEager('../../../assets/image/my_items_active.png')['../../../assets/image/my_items_active.png'].default,
    },
]

// other菜单项
const other_list = [
    {
        name: 'Wiki',
        icon: import.meta.globEager('../../../assets/image/market.png')['../../../assets/image/market.png'].default,
        icon_active: import.meta.globEager('../../../assets/image/market_active.png')['../../../assets/image/market_active.png'].default,
    },
    {
        name: 'About',
        icon: import.meta.globEager('../../../assets/image/my_items.png')['../../../assets/image/my_items.png'].default,
        icon_active: import.meta.globEager('../../../assets/image/my_items_active.png')['../../../assets/image/my_items_active.png'].default,
    },
    {
        name: 'Call us',
        icon: import.meta.globEager('../../../assets/image/sell.png')['../../../assets/image/sell.png'].default,
        icon_active: import.meta.globEager('../../../assets/image/sell_active.png')['../../../assets/image/sell_active.png'].default,
    },
]

// 标题
const title = ref('Market') // 选择菜单子项
const setTitle = (value: string) => {
    title.value = value
}

// 选择菜单
const selectMenuItem: any = async (index: string) => {
    console.log(index, '7788');
    
    // console.log(`---------->日志输出:index`, index)
    if (index === 'My Items' && !store.state.moralis?.user.account) {
        await login()
    }
    await getData(index)
    setTitle(index)
}

// 菜单展开收起
const isShow = ref('0') // 默认0展开
const changeShow = (index: string): void => {
    isShow.value = index
}

// 是否已激活
const IsActive = computed(() => {
    return function (index: string, value: string) {
        return index === value
    }
})

// 用户唯一标识
const Accounts = computed(() => store.state.moralis?.user.account)

// 余额
const NativeBalance = computed(() => store.state.moralis?.user.nativeBalance)

// 令牌余额
const TokenBalances = computed(() => store.state.moralis?.user.tokenBalances)

// 显示的用户名
const Username = computed(() => {
    return function (length: number = 4) {
        let username = store.state.moralis?.user.account as string
        return `${username.slice(0, length)}****${username.slice(-length)}`
    }
})

// 导出公共变量
export { loadingShow, marketplace_list, prediction_list, other_list, title, selectMenuItem, isShow }

// 导出公共方法
export { setLoading, toPage, login, logout, setTitle, changeShow }

// 导出公共计算属性
export { IsActive, Accounts, NativeBalance, TokenBalances, Username }
