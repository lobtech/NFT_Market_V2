import store from '@/store'
import web3 from '@/tools/moralis'
import { computed, readonly, ref, provide } from 'vue'
import { title, setTitle } from '../js/left'

// 首屏加载
const loadingShow = ref(false) // 加载状态
const setLoading = (value: boolean) => {
    loadingShow.value = value
}

// 选择state
const state_list = ['On sale', 'Completed']
const state = ref('On sale')
const selectState = (index: string): void => {
    state.value = index
    getData()
}
// 选择state
const class_list = ['All', 'Eggs', 'Houses', 'FengShui']
const _class = ref('All')
const selectClass = (index: string): void => {
    _class.value = index
    getData()
}
// 选择rarity
const rarity_list = ['All', 'Bless', 'Unity', 'Location']
const rarity = ref('All')
const selectRarity = (index: string): void => {
    rarity.value = index
    getData()
}
// 数据列表
const list: any = ref([])
// 获取数据
const getData = async (type: string = title.value) => {
    // console.log(`---------->日志输出:type`, type)
    const chain = store.state.moralis?.chain
    const address = store.state.moralis?.address
    loadingShow.value = true
    switch (type) {
        // 超市数据
        case 'Market':
            {
                const res = await web3.Moralis.Web3API.token.getNFTOwners({ chain, address })
                list.value = res.result
            }
            break
        case 'My Items':
            {
                const address = store.state.moralis?.user.accounts
                const options = {
                    chain: 'ropsten', // 区块链名（可选）
                    address, // 指定合约地址（可选）
                }
                const res = await web3.Moralis.Web3API.account.getNFTs(options)
                list.value = res.result
            }
            break
        case 'Sell':
            {
                await new Promise((resolve: any) => {
                    setTimeout(() => {
                        list.value = []
                        for (let i = 0; i <= 10; i++) {
                            list.value.push({ metadata: '{\r\n    "image": "https://av6uwrkea2v6.usemoralis.com/Cabin.jpg",\r\n    "description": "Ordinary cabin",\r\n    "name": "Cabin",\r\n    "external_url": "https://hbeasts.com"\r\n}' })
                        }
                        resolve()
                    }, 500)
                })
            }
            break
        default:
            {
                await new Promise((resolve: any) => {
                    setTimeout(() => {
                        list.value = []
                        for (let i = 0; i <= Math.floor(Math.random() * 10); i++) {
                            list.value.push({
                                metadata: '{\r\n    "image": "https://tse4-mm.cn.bing.net/th/id/OIP-C.np2Uw9jFr4MQLzQiKaIoDgHaEo?w=250&h=180&c=7&r=0&o=5&pid=1.7",\r\n    "description": "Ordinary cabin",\r\n    "name": "B&B",\r\n    "external_url": "https://hbeasts.com"\r\n}',
                            })
                            list.value.push({
                                metadata: '{\r\n    "image": "https://tse1-mm.cn.bing.net/th/id/OIP-C.tuhUwdgN8BLkrmI0oCgbTgHaEK?w=285&h=180&c=7&r=0&o=5&pid=1.7",\r\n    "description": "Ordinary cabin",\r\n    "name": "B&B",\r\n    "external_url": "https://hbeasts.com"\r\n}',
                            })
                            list.value.push({
                                metadata: '{\r\n    "image": "https://tse2-mm.cn.bing.net/th/id/OIP-C.kPwlUKUdZRn9mNa7PHbm3QHaEK?w=326&h=183&c=7&r=0&o=5&pid=1.7",\r\n    "description": "Ordinary cabin",\r\n    "name": "B&B",\r\n    "external_url": "https://hbeasts.com"\r\n}',
                            })
                        }
                        resolve()
                    }, 1000)
                })
            }
            break
    }
    // console.log(`---------->日志输出:list.value`, list.value)
    loadingShow.value = false
}
setTimeout(() => {
    getData('Houses')
}, 0)

// Metadata
const Metadata = computed(() => {
    return function (item: string, key: string) {
        if (!item) return ''
        let obj = JSON.parse(item)
        // console.log(`---------->日志输出:obj`, obj)
        return obj[key]
    }
})
const test = () => setTitle('23456')
export { test, loadingShow, setLoading, title, setTitle, web3 }
