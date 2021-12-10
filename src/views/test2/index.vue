<template>
    <div style="min-height: 100vh;padding: 20px; background-image: linear-gradient(to left, rgb(44, 72, 158), rgb(2, 2, 1)); display: flex; justify-content: center; flex-direction: column; align-items: center">
        <div class="card">
            <div class="card-title">合约配置</div>
            <div class="card-row" v-for="(item, index) in contracts" :key="index">
                <div class="card-row-title">{{ item.name }}：{{ item.address }}</div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import contracts from '@/tools/contracts'
import api from '@/api'
let data = {
    page: '1',
    limit: '20',
    address: '0xf55c6be2f9390301bfc66dd9f7f52495b56301dc',
}
let headers = {
    'Finger-Nft-Token':
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ0aGlzIGlzIGZpbmdlciBuZnQgdG9rZW4iLCJhdWQiOiJEQVBQQ0hBSU4iLCJhZGRyZXNzIjoiMHhmNTVjNmJlMmY5MzkwMzAxYmZjNjZkZDlmN2Y1MjQ5NWI1NjMwMWRjIiwiaXNzIjoiRmluZ2VybmZ0IiwiZXhwIjoxNjQxNzExNTA1LCJpYXQiOjE2MzkwMzMxMDV9.z0r_liMG-naG6AgMcVqgI_lRnF2bnS4LGERINvBCc6A',
}




api.test({ data, headers }).then((res) => {
    console.log(`---------->日志输出222:res`, res)
})




</script>

<style lang="less" scoped>
.card {
    min-width: 444px;
    margin-top: 20px;
    padding: 20px;
    border-radius: 4px;
    background-color: rgba(255, 255, 255, 0.5);
    .card-title {
        min-height: 28px;
        font-weight: bolder;
    }
    .card-row {
        display: flex;
        align-items: center;
        padding: 10px;
        input {
            border: none;
            width: 200px;
            max-width: 280px;
            height: 28px;
            max-height: 28px;
            border-radius: 6px;
            padding: 0 10px;
            margin: 0 10px;
        }
    }
    .card-btn {
        width: 80px;
        max-width: 80px;
        height: 30px;
        min-height: 30px;
        max-height: 34px;
        display: flex;
        justify-content: center;
        border-radius: 4px;
        align-items: center;
        background-color: saddlebrown;
        color: white;
        margin: 10px auto 0;
        cursor: pointer;
    }
}
</style>
