<template>
    <div style="padding: 20px; background-color: royalblue; display: flex; justify-content: center; flex-direction: column; align-items: center">
        <div class="btn" @click="web3.getContract('test2')">getContract</div>
        <div class="btn" @click="web3.logOut">logOut</div>
        <div class="btn" @click="web3.authenticate">authenticate</div>
        <div class="btn" @click="web3.getAllTokenIds('0xE81C077d2258A08869622f984733B0aF8843fD2c')">getAllTokenIds</div>
        <div class="btn" @click="web3.call">call</div>
        <div class="btn" @click="web3.transfer">transfer</div>
    </div>
</template>
<script setup lang="ts">
import web3 from '@/tools/moralis'
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
