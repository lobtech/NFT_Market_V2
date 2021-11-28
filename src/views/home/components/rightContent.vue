<template>
    <div class="right-content">
        <!-- <loading :show="loadingShow"></loading> -->
        <!-- <div class="visible md:invisible fixed left-0 top-0 opacity-100 md:opacity-0 transition-all flex items-center justify-center w-full backdrop-blur-lg backdrop-filter h-16 title">
            <div class="absolute left-4 w-10">
                <img src="../../../assets/image/logo.png" alt="" />
            </div>
            <div class="text-xl font-medium">{{ title }}</div>
            <div class="absolute right-4 flex items-center">
                <svg class="mx-1 cursor-pointer text-3xl transition-all opacity-80 hover:opacity-100 visible md:opacity-0 md:invisible z-icon" aria-hidden="true">
                    <use xlink:href="#z-icon-screen"></use>
                </svg>
                <svg class="mx-1 cursor-pointer text-3xl transition-all opacity-80 hover:opacity-100 visible md:opacity-0 md:invisible z-icon" aria-hidden="true">
                    <use xlink:href="#z-icon-other"></use>
                </svg>
            </div>
        </div> -->
        <!-- <div class="invisible md:visible opacity-0 md:opacity-100 h-0 md:h-auto text-4xl xl:text-6xl transition-all px-5 py-3 flex items-center justify-between">{{ title }}</div>
        <div class="">
            <div class="rounded-xl flex items-center justify-between state">
                <div class="m-0 md:m-1 xl:m-2 px-1 md:px-2 xl:px-4 text-md md:text-md xl:text-2xl rounded-lg transition-all cursor-pointer item" :class="[{ 'item-active': IsActive(item, state) }]" v-for="(item, index) in state_list" :key="index" @click="selectState(item)">{{ item }}</div>
            </div>
        </div>
        <div class="px-5 flex items-center justify-between select">
            <div class="flex-1 text-base xl:text-xl">
                <div class="py-1 xl:py-2 flex items-center">
                    <div class="transition-all w-16 md:w-20">Class :</div>
                    <div class="overflow-x-auto w-0 flex-1 flex items-center flex-nowrap">
                        <div class="mr-2 xl:mr-3 px-2 xl:px-3 transition-all cursor-pointer rounded-xl select-item" :class="[{ 'select-item-active ': IsActive(item, _class) }]" v-for="(item, index) in class_list" :key="index" @click="selectClass(item)">{{ item }}</div>
                    </div>
                </div>
                <div class="py-1 xl:py-2 flex items-center">
                    <div class="transition-all w-16 md:w-20">Rarity :</div>
                    <div class="overflow-x-auto w-0 flex-1 flex items-center flex-nowrap">
                        <div class="mr-2 xl:mr-3 px-2 xl:px-3 transition-all cursor-pointer rounded-xl select-item" :class="[{ 'select-item-active ': IsActive(item, rarity) }]" v-for="(item, index) in rarity_list" :key="index" @click="selectRarity(item)">{{ item }}</div>
                    </div>
                </div>
            </div>
            <div class="flex-shrink-0 h-0 w-0 invisible md:w-auto md:h-auto md:visible">
                <div class="flex items-center justify-end py-2">
                    <div class="w-5 flex items-center justify-center">
                        <img src="../../../assets/image/px.png" alt="" />
                    </div>
                    <div class="px-2">
                        Sort By : <span style="color: #2d5791">{{ 'Time' }}</span>
                    </div>
                    <div class="w-5 flex items-center justify-center">
                        <img class="w-4" src="../../../assets/image/bottom.png" alt="" />
                    </div>
                </div>
                <div class="flex items-center justify-end py-2 ml-5">
                    <div class="w-5 flex items-center justify-center">
                        <img class="w-4.5" src="../../../assets/image/left.png" alt="" />
                    </div>
                    <div class="px-2">
                        Page <span style="color: #2d5791">{{ '1' }}</span> of {{ '120' }}
                    </div>
                    <div class="w-5 flex items-center justify-center">
                        <img class="w-4.5" src="../../../assets/image/right.png" alt="" />
                    </div>
                </div>
            </div>
        </div>
        <div class="md:flex-1 md:overflow-y-auto p-2 flex flex-wrap">
            <div class="overflow-hidden transition-all w-1/2 h-56 p-2 md:w-52 md:h-72 xl:w-60 xl:h-96" v-for="(item, index) in list" :key="index">
                <div class="rounded-md overflow-hidden card">
                    <div class="transition-all h-3/5 overflow-hidden img">
                        <img :src="Metadata(item.metadata, 'image')" alt="" />
                    </div>
                    <div class="h-2/5 px-2 text-xs card-bottom">
                        <div class="max-h-11 flex items-center">
                            <div>
                                <span class="primary-color">{{ Metadata(item.metadata, 'name') }}</span> / <span class="secondary-color">LV:10</span>
                            </div>
                            <div class="primary-color">0.8800ELBT</div>
                        </div>
                        <div class="row">
                            <div>{{ Metadata(item.metadata, 'description') }}</div>
                        </div>
                        <div class="row">
                            <div class="secondary-color">Feng shuil <span class="primary-color">200</span> / Magic 188</div>
                        </div>
                    </div>
                </div>
            </div>
        </div> -->
    </div>
</template>
<script setup lang="ts">
import { computed, inject, ref, watch } from 'vue'
// import loading from '@/components/loading/loading.vue'
// @ts-ignore 忽略检测
import Moralis from 'moralis/dist/moralis.min.js'
import store from '../../../store'
import { relative, resolve } from 'path/posix'

const title = inject('title') as any // 父级菜单标题
// 监听title来请求新的数据
watch(title, async (a: string, b: string) => getData(a))

const loadingShow = ref(false) // 加载状态

// 选择state
const state_list = ['On sale', 'Completed']
const state = ref('On sale')
const selectState = (index: string): void => {
    // title.value = '1234'
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
// type ass = ['All', 'Bless', 'Unity', 'Location', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '']
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
                const res = await Moralis.Web3API.token.getNFTOwners({ chain, address })
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
                const res = await Moralis.Web3API.account.getNFTs(options)
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
// 是否已激活
const IsActive = computed(() => {
    return function (index: string, key: string) {
        return index === key
    }
})
</script>
<style scoped>
.right-content {
    background-color: rgba(36, 39, 54, 1);
    color: rgba(255, 255, 255, 0.7);
}
.title {
    background-color: rgba(0, 0, 0, 0.5);
}

.title > .z-icon {
    color: rgba(255, 255, 255, 1);
}
.state {
    color: rgba(255, 255, 255, 0.5);
    background-color: #7092c0;
}
.state > .item:hover {
    color: rgba(255, 255, 255, 1);
}
.state > .item-active {
    color: rgba(255, 255, 255, 1);
    background-color: #2d5791;
}
.select {
    color: rgba(255, 255, 255, 0.5);
}
.select ::-webkit-scrollbar {
    width: 0; /*对垂直流动条有效*/
    height: 0; /*对水平流动条有效*/
}
.select-item {
    border: 1px solid rgba(255, 255, 255, 0.5);
}
.select-item:hover {
    color: rgba(255, 255, 255, 1);
    border: 1px solid rgba(255, 255, 255, 1);
}

.select-item-active {
    background-color: #7092c0;
    border: 1px solid #7092c0;
}
.card {
    width: 100%;
    height: 100%;
    background-color: #282b3a;
    border: 1px solid rgba(255, 255, 255, 0.1);
    box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.1);
}
.card-bottom {
    background-color: #3a4050;
    overflow: hidden;
    color: rgba(255, 255, 255, 0.3);
}
.card-bottom > .row {
    font-size: 14px;
    height: 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.primary-color {
    color: rgba(255, 255, 255, 1);
}
.secondary-color {
    color: #7092c0;
}
/* 滚动槽（轨道）宽高 */
::-webkit-scrollbar {
    width: 10px; /*对垂直流动条有效*/
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
</style>
