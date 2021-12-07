<template>
    <div style="padding: 20px; background-image: linear-gradient(to bottom, royalblue, rgb(2, 2, 1)); display: flex; justify-content: center; flex-direction: column; align-items: center">
        <div class="card">
            <div class="card-title">合约配置</div>
            <div class="card-row" v-for="(item, index) in contracts" :key="index">
                <div class="card-row-title">{{ item.name }}：{{ item.address }}</div>
            </div>
        </div>
        <div class="card">
            <div class="card-title">登录</div>
            <div class="card-row">
                <div class="card-row-title">{{ Accounts ? Accounts : '未登录' }}</div>
            </div>
            <div class="card-btn" @click="login()">登录</div>
        </div>
        <div class="card">
            <div class="card-title">查询合约(查询某个合约的基本配置)</div>
            <div class="card-row">
                <div class="card-row-title">合约名称</div>
                <input type="text" placeholder="test" v-model="input" />
            </div>
            <div class="card-btn" @click="web3.getContract(input)">确认</div>
        </div>
        <div class="card">
            <div class="card-title">货币授权（允许其他合约调用我的某种货币）</div>
            <div class="card-row">
                <div class="card-row-title">货币名称</div>
                <input type="text" placeholder="test" v-model="input_a_1" />
            </div>
            <div class="card-row">
                <div class="card-row-title">授权地址</div>
                <input type="text" placeholder="0x9a4244c1d438810F09F468DfC2Ea4cf40Ad93c10" v-model="input_a_2" />
            </div>
            <div class="card-row">
                <div class="card-row-title">货币数量</div>
                <input type="text" placeholder="0x9a4244c1d438810F09F468DfC2Ea4cf40Ad93c10" v-model="input_a_3" />
            </div>
            <div class="card-btn" @click="web3.approve(input_a_1, input_a_2, input_a_3)">确认</div>
        </div>
        <div class="card">
            <div class="card-title">设置某个人的领取状态（管理员可调用）</div>
            <div class="card-row">
                <div class="card-row-title">用户地址</div>
                <input type="text" placeholder="test" v-model="input_b_1" />
            </div>
            <div class="card-row">
                <div class="card-row-title">领取状态</div>
                <input type="text" placeholder="0x9a4244c1d438810F09F468DfC2Ea4cf40Ad93c10" v-model="input_b_2" />
            </div>
            <div class="card-btn" @click="web3.setAirdrop(input_b_1, input_b_2)">确认</div>
        </div>
        <div class="card">
            <div class="card-title">领取货币（调用某个合约直接领取货币10个）</div>
            <div class="card-row">
                <div class="card-row-title">合约名称</div>
                <input type="text" placeholder="test" v-model="input_b_1" />
            </div>
            <div class="card-row">
                <div class="card-row-title">货币地址</div>
                <input type="text" placeholder="0x9a4244c1d438810F09F468DfC2Ea4cf40Ad93c10" v-model="input_b_2" />
            </div>
            <div class="card-row">
                <div class="card-row-title">是否可领</div>
                <input type="text" disabled placeholder="0x9a4244c1d438810F09F468DfC2Ea4cf40Ad93c10" v-model="eligible" />
            </div>
            <div class="card-btn" @click="web3.distribute(input_c_1, input_c_2)">确认</div>
        </div>
    </div>
</template>
<script setup lang="ts">
import moralis from '@/tools/moralis'
import web3 from '@/tools/web3'
import contracts from '@/tools/contracts'

// 引入公共方法
import { login, logout } from '../home/js/left'

// 引入公共计算属性
import { Accounts } from '../home/js/left'
import { ref } from 'vue'
import store from '@/store'
const input = ref('')

const input_a_1 = ref('')
const input_a_2 = ref('')
const input_a_3 = ref('')

input_a_1.value = contracts.money.name
input_a_2.value = contracts.airdrop.address
input_a_3.value = '100'

const input_b_1 = ref('')
const input_b_2 = ref(true)

input_b_1.value = store.state.moralis?.user.accounts[0] || ''

const input_c_1 = ref('')
const input_c_2 = ref('')
const eligible = ref(false)

input_c_1.value = contracts.airdrop.name
input_c_2.value = contracts.money.address

// 查询是否可领取
web3.eligible().then((res) => {
    console.log(`---------->日志输出:res`, res)
    // 已存在就不可领取
    eligible.value = !res
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
