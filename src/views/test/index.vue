<template>
    <div style="padding: 20px; background-color: royalblue; display: flex; justify-content: center; flex-direction: column; align-items: center">
        <div class="btn" @click="web3.setApprovalForAll('bbb', contracts.bbb.address, '0x9a4244c1d438810F09F468DfC2Ea4cf40Ad93c10')">setApprovalForAll</div>
        <div class="btn" @click="web3.getContract('aaa')">getContract</div>
        <div class="btn" @click="web3.call">call</div>
        <div class="btn" @click="web3.send">send</div>
        <div class="btn" @click="moralis.authenticate">authenticate</div>
        <div class="btn" @click="moralis.logOut">logOut</div>
        <div class="btn" @click="moralis.callCloud">callCloud</div>
        <div class="btn" @click="moralis.getAllTokenIds('0xE81C077d2258A08869622f984733B0aF8843fD2c')">getAllTokenIds</div>
        <div class="btn" @click="moralis.getNativeBalance('0xF55c6Be2F9390301bFc66Dd9f7f52495B56301dC')">getNativeBalance</div>
        <div class="btn" @click="moralis.transfer">transfer</div>
        <div class="btn" @click="moralis.getTokenAllowance(contracts.aaa.address, '0xF55c6Be2F9390301bFc66Dd9f7f52495B56301dC', '0xF55c6Be2F9390301bFc66Dd9f7f52495B56301dC')">getTokenAllowance</div>
        <div class="btn" @click="moralis.searchNFTs('Pancake', 'name')">searchNFTs</div>
    </div>
</template>
<script setup lang="ts">
import moralis from '@/tools/moralis'
import web3 from '@/tools/web3'
import contracts from '@/tools/contracts'
</script>

<style>
.btn {
    height: 30px;
    min-width: 120px;
    min-height: 30px;
    max-height: 40px;
    width: 100px;
    display: flex;
    justify-content: center;
    border-radius: 4px;
    align-items: center;
    background-color: saddlebrown;
    color: white;
    margin: 10px 0;
}
</style>
