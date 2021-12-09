import store from '@/store'
import contracts from '@/tools/contracts'
import moralis from '@/tools/moralis'
import web3 from '@/tools/web3'
import { computed, readonly, ref, provide } from 'vue'
import { title, setTitle } from '../js/left'

// 加载
const loadingShow2 = ref(false) // 加载状态
const setLoading = (value: boolean) => {
    loadingShow2.value = value
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
const _list = [
    { metadata: '{\r\n    "image": "https://pryun.vip/image/tackle/a.png",\r\n    "description": "Ordinary cabin",\r\n    "name": "Cabin",\r\n    "external_url": "https://hbeasts.com"\r\n}' },
    { metadata: '{\r\n    "image": "https://pryun.vip/image/tackle/b.png",\r\n    "description": "Ordinary cabin",\r\n    "name": "Cabin",\r\n    "external_url": "https://hbeasts.com"\r\n}' },
    { metadata: '{\r\n    "image": "https://pryun.vip/image/tackle/c.png",\r\n    "description": "Ordinary cabin",\r\n    "name": "Cabin",\r\n    "external_url": "https://hbeasts.com"\r\n}' },
    { metadata: '{\r\n    "image": "https://pryun.vip/image/tackle/d.png",\r\n    "description": "Ordinary cabin",\r\n    "name": "Cabin",\r\n    "external_url": "https://hbeasts.com"\r\n}' },
    { metadata: '{\r\n    "image": "https://pryun.vip/image/tackle/e.png",\r\n    "description": "Ordinary cabin",\r\n    "name": "Cabin",\r\n    "external_url": "https://hbeasts.com"\r\n}' },
    { metadata: '{\r\n    "image": "https://pryun.vip/image/tackle/f.png",\r\n    "description": "Ordinary cabin",\r\n    "name": "Cabin",\r\n    "external_url": "https://hbeasts.com"\r\n}' },
    { metadata: '{\r\n    "image": "https://pryun.vip/image/tackle/g.png",\r\n    "description": "Ordinary cabin",\r\n    "name": "Cabin",\r\n    "external_url": "https://hbeasts.com"\r\n}' },
    { metadata: '{\r\n    "image": "https://pryun.vip/image/tackle/h.png",\r\n    "description": "Ordinary cabin",\r\n    "name": "Cabin",\r\n    "external_url": "https://hbeasts.com"\r\n}' },
    { metadata: '{\r\n    "image": "https://pryun.vip/image/tackle/i.png",\r\n    "description": "Ordinary cabin",\r\n    "name": "Cabin",\r\n    "external_url": "https://hbeasts.com"\r\n}' },
    { metadata: '{\r\n    "image": "https://pryun.vip/image/tackle/j.png",\r\n    "description": "Ordinary cabin",\r\n    "name": "Cabin",\r\n    "external_url": "https://hbeasts.com"\r\n}' },
    { metadata: '{\r\n    "image": "https://pryun.vip/image/tackle/k.png",\r\n    "description": "Ordinary cabin",\r\n    "name": "Cabin",\r\n    "external_url": "https://hbeasts.com"\r\n}' },
    { metadata: '{\r\n    "image": "https://pryun.vip/image/tackle/l.png",\r\n    "description": "Ordinary cabin",\r\n    "name": "Cabin",\r\n    "external_url": "https://hbeasts.com"\r\n}' },
    { metadata: '{\r\n    "image": "https://pryun.vip/image/tackle/m.png",\r\n    "description": "Ordinary cabin",\r\n    "name": "Cabin",\r\n    "external_url": "https://hbeasts.com"\r\n}' },
]
// 数据列表
const list: any = ref([])
// 获取数据
const getData = async (type: string = title.value) => {
    loadingShow2.value = true
    switch (type) {
        // 超市数据
        case 'Market':
            {
                // const res = await moralis.getNFTOwners(contracts.gameItems.address)
                const res = await moralis.getNFTsForContrac('0xF55c6Be2F9390301bFc66Dd9f7f52495B56301dC', contracts.gameItems.address)
                for (const item of res.result) {
                    item.metadata = await moralis.getMetadata(item.token_uri)
                }
                console.log(`---------->日志输出:res`, res)
                // getMetadata
                list.value = res.result
                // list.value = _list
            }
            break
        case 'My Items':
            {
                let user = store.state.moralis?.user.account as string
                const res = await moralis.getNFTsForContrac(user, contracts.gameItems.address)
                console.log(`---------->日志输出:res`, res)
                list.value = res.result || []
            }
            break
        case 'Sell':
            {
                await new Promise((resolve: any) => {
                    setTimeout(() => {
                        list.value = []
                        for (let i = 0; i <= 6; i++) {
                            list.value.push(_list[i])
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
                            // list.value.push({
                            //     metadata: '{\r\n    "image": "https://tse4-mm.cn.bing.net/th/id/OIP-C.np2Uw9jFr4MQLzQiKaIoDgHaEo?w=250&h=180&c=7&r=0&o=5&pid=1.7",\r\n    "description": "Ordinary cabin",\r\n    "name": "B&B",\r\n    "external_url": "https://hbeasts.com"\r\n}',
                            // })
                            // list.value.push({
                            //     metadata: '{\r\n    "image": "https://tse1-mm.cn.bing.net/th/id/OIP-C.tuhUwdgN8BLkrmI0oCgbTgHaEK?w=285&h=180&c=7&r=0&o=5&pid=1.7",\r\n    "description": "Ordinary cabin",\r\n    "name": "B&B",\r\n    "external_url": "https://hbeasts.com"\r\n}',
                            // })
                            // list.value.push({
                            //     metadata: '{\r\n    "image": "https://tse2-mm.cn.bing.net/th/id/OIP-C.kPwlUKUdZRn9mNa7PHbm3QHaEK?w=326&h=183&c=7&r=0&o=5&pid=1.7",\r\n    "description": "Ordinary cabin",\r\n    "name": "B&B",\r\n    "external_url": "https://hbeasts.com"\r\n}',
                            // })
                        }
                        resolve()
                    }, 1000)
                })
            }
            break
    }
    // console.log(`---------->日志输出:list.value`, list.value)
    loadingShow2.value = false
}

// Metadata
const Metadata = computed(() => {
    return async function (token_uri: string, key: string) {
        let metadata = await moralis.getMetadata(token_uri)
        console.log(`---------->日志输出:metadata`, metadata)
        return metadata[key] || ''
    }
})

// 导出公共变量
export { state_list, state, class_list, _class, rarity_list, rarity, list, loadingShow2 }

// 导出公共方法
export { selectState, selectClass, selectRarity, getData }

// 导出公共计算属性
export { Metadata }
