import api from '@/api'
import store from '@/store'
import contracts from '@/tools/contracts'
import moralis from '@/tools/moralis'
import { computed, ref } from 'vue'
import { _title } from '../js/left'

// 加载
const _loading_show_2 = ref(false) // 加载状态
const setLoading = (value: boolean) => {
    _loading_show_2.value = value
}

// 选择_state
const _state_list = ['On sale', 'Completed']
const _state = ref('On sale')
const selectState = (index: string): void => {
    _state.value = index
    getData()
}
// 选择_state
const _class_list = ['All', 'Eggs', 'Houses', 'FengShui']
const _class = ref('All')
const selectClass = (index: string): void => {
    _class.value = index
    getData()
}
// 选择_rarity
const _rarity_list = ['All', 'Bless', 'Unity', 'Location']
const _rarity = ref('All')
const selectRarity = (index: string): void => {
    _rarity.value = index
    getData()
}
const list = [
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
const _list: any = ref([])
// 获取数据
const getData = async (type: string = _title.value) => {
    _loading_show_2.value = true
    switch (type) {
        // 超市数据
        case 'Market':
            {
                let data = { page: 1, limit: 20, cate: '', sort: '', order: '' }
                const res = await api.get_goods({ data })
                console.log(`---------->日志输出:res`, res)
                let list = res.data.list || []
                for (const item of list) {
                    item.name = item.nft.name
                    item.price = item.itemList[0].item.price
                    item.image = JSON.parse(item.nft.metadataContent).image.replace('ipfs://', '/')
                }
                _list.value = res.data.list || []
            }
            break
        // 个人数据
        case 'My Items':
            {
                _list.value = []
            }
            break
        case 'Sell':
            {
                _list.value = []
            }
            break
        default:
            {
                _list.value = []
            }
            break
    }
    // console.log(`---------->日志输出:list.value`, list.value)
    _loading_show_2.value = false
}

// Metadata
const Metadata = computed(() => {
    return async function (metadataContent: string, key: string) {
        let metadata = JSON.parse(metadataContent)
        console.log(`---------->日志输出:metadata`, metadata)
        return metadata[key] || ''
    }
})

// 导出公共变量
export { _state_list, _state, _class_list, _class, _rarity_list, _rarity, _list, _loading_show_2 }

// 导出公共方法
export { selectState, selectClass, selectRarity, getData }

// 导出公共计算属性
export { Metadata }
