import store from '@/store'
import web3 from '@/tools/moralis'
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

// 登录
const login = async (show: boolean = true) => {
    let user = await web3.currentAsync()
    if (show) {
        setLoading(true)
        // console.log(`---------->未登录:user`, user)
        user = await web3.authenticate()
        setLoading(false)
    }
    // console.log(`---------->日志输出:user`, user)
    if (user) {
        store.dispatch('moralis/init', user.attributes)
    }
}

// 登出
const logout = async () => {
    setLoading(true)
    // console.log(`---------->未登录:user`, user)
    await web3.logOut()
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
    console.log(`---------->日志输出:index`, index)
    if (index === 'My Items' && !store.state.moralis?.user.accounts) {
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
const Accounts = computed(() => store.state.moralis?.user.accounts)

// 显示的用户名
const Username = computed(() => {
    return function (length: number = 4) {
        let username = store.state.moralis?.user.username as string
        return `${username.slice(0, length)}****${username.slice(-length)}`
    }
})

// 导出公共变量
export { loadingShow, marketplace_list, prediction_list, other_list, title, selectMenuItem, isShow }

// 导出公共方法
export { setLoading, toPage, login, logout, setTitle, changeShow }

// 导出公共计算属性
export { IsActive, Accounts, Username }
