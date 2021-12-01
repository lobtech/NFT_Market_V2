import store from '@/store'
import contracts from '@/tools/contracts'
// import Web3 from 'web3/dist/web3.min.js'
// import Moralis from 'moralis/dist/moralis.min.js'
const Moralis = (window as any).Moralis // 引用全局的Moralis
const Web3 = (window as any).Web3 // 引用全局的web3

const web3 = new Web3((window as any).ethereum) // 创建一个新的web3 对象
const chain = 'bsc testnet' as string // 区块链名
const serverUrl = 'https://iryujqeq3c0k.usemoralis.com:2053/server' as string // 服务器地址
const appId = 'pgxFvaT0RRCnC9efXnb6f6Ck9WxudIoscdigwwpU' as string // appid

// 转移资产
const transfer = async () => {
    // await Moralis.authenticate()
    const receiver = '0x9a4244c1d438810F09F468DfC2Ea4cf40Ad93c10'
    const contractAddress = '0x46700948aC4B23EdbeCb49513946af519d5602Fa'
    const options = {
        type: 'erc1155', // 货币类型['native','erc20','erc721','erc1155'] === ['通用货币','游戏代币','唯一资产','其他多数量资产']
        // amount: Moralis.Units.Token('10', '18'), // 数量（唯一资产没有数量）
        amount: 1, // 数量（唯一资产没有数量）
        receiver, // 交易对象
        contractAddress, // 交易对象所在合约地址
        tokenId: '2', // NFT资产id
    }
    let res = await Moralis.transfer(options)
    console.log(`---------->日志输出:res`, res)
}
// 获取用户资产
const getNFTs = async () => {
    let address = store.state.moralis?.user.accounts
    console.log(`---------->获取用户资产:address`, address)
    const res = await Moralis.Web3API.account.getNFTs({ chain, address })
    console.log(`---------->日志输出:res`, res)
}
//  查询合约全部资产类型
const getAllTokenIds = async (address: string) => {
    console.log(`---------->查询合约全部资产类型:address`, address)
    const res = await Moralis.Web3API.token.getAllTokenIds({ chain, address })
    console.log(`---------->日志输出:res`, res)
}
// 查询合约全部资产
const getNFTOwners = async (address: string) => {
    console.log(`---------->查询合约全部资产:address`, address)
    const res = await Moralis.Web3API.token.getNFTOwners({ chain, address })
    console.log(`---------->日志输出:res`, res)
}
// 查询令牌余额
const getTokenBalances = async () => {
    const address = store.state.moralis?.user.accounts
    console.log(`---------->查询令牌余额:address`, address)
    const res = await Moralis.Web3API.account.getTokenBalances({ chain, address })
    console.log(`---------->日志输出:res`, res)
}
// 查询本地余额
const getNativeBalance = async () => {
    const address = store.state.moralis?.user.accounts
    console.log(`---------->查询本地余额:address`, address)
    const res = await Moralis.Web3API.account.getNativeBalance({ chain, address })
    console.log(`---------->日志输出:res`, res)
}
// 请求云函数
const callCloud = async () => {
    const params = { movie: 'The Matrix' }
    const res = await Moralis.Cloud.run('test', params)
    console.log(`---------->日志输出:res`, res)
}
// 注销
const logOut = () => {
    return Moralis.User.logOut()
}
// 请求授权
const authenticate = () => {
    return Moralis.authenticate()
}
// 查询是否已授权
const currentAsync = async () => {
    return Moralis.User.currentAsync()
}
// 连接服务器
const start = async (_serverUrl: string = serverUrl, _appId: string = appId) => {
    const options = { serverUrl: _serverUrl, appId: _appId }
    Moralis.start(options) // 连接到服务器
}

// 发送一个合约函数请求
const send = () => {
    const { abi, address } = contracts['nftTreader']
    const contract = new web3.eth.Contract(abi, address) // 创建合约
    // 发送交易，使用事件获取返回结果
    contract.methods
        .addListing(222, contracts['GameItems']['address'], '1')
        // .addListing(contracts['GameItems']['address'], '1', 45)
        .send({ from: '0xF55c6Be2F9390301bFc66Dd9f7f52495B56301dC' })
        .on('transactionHash', function (hash: any) {
            console.log(`---------->日志输出:hash`, hash)
        })
        .on('receipt', function (receipt: any) {
            console.log(`---------->日志输出:receipt`, receipt)
        })
        .on('confirmation', function (confirmationNumber: any, receipt: any) {
            console.log(`---------->日志输出:confirmationNumber, receipt`, confirmationNumber, receipt)
        })
        .on('error', (err: any) => {
            console.log(`---------->日志输出:err`, err)
        })
}
// 上架
const purchase = () => {
    const { abi, address } = contracts['nftTreader']
    const contract = new web3.eth.Contract(abi, address) // 创建合约
    // 发送交易，使用事件获取返回结果
    contract.methods
        .purchase(contracts['GameItems']['address'], '2', 1)
        // .addListing(contracts['GameItems']['address'], '1', 45)
        .send({ from: '0xF55c6Be2F9390301bFc66Dd9f7f52495B56301dC' })
        .on('transactionHash', function (hash: any) {
            console.log(`---------->日志输出:hash`, hash)
        })
        .on('receipt', function (receipt: any) {
            console.log(`---------->日志输出:receipt`, receipt)
        })
        .on('confirmation', function (confirmationNumber: any, receipt: any) {
            console.log(`---------->日志输出:confirmationNumber, receipt`, confirmationNumber, receipt)
        })
        .on('error', (err: any) => {
            console.log(`---------->日志输出:err`, err)
        })
}
// 上架
const addListing = () => {
    const { abi, address } = contracts['nftTreader']
    const contract = new web3.eth.Contract(abi, address) // 创建合约
    // 发送交易，使用事件获取返回结果
    contract.methods
        .addListing(222, contracts['GameItems']['address'], '2')
        // .addListing(contracts['GameItems']['address'], '1', 45)
        .send({ from: '0xF55c6Be2F9390301bFc66Dd9f7f52495B56301dC' })
        .on('transactionHash', function (hash: any) {
            console.log(`---------->日志输出:hash`, hash)
        })
        .on('receipt', function (receipt: any) {
            console.log(`---------->日志输出:receipt`, receipt)
        })
        .on('confirmation', function (confirmationNumber: any, receipt: any) {
            console.log(`---------->日志输出:confirmationNumber, receipt`, confirmationNumber, receipt)
        })
        .on('error', (err: any) => {
            console.log(`---------->日志输出:err`, err)
        })
}
// 调用一个合约的函数
const call = async () => {
    const { abi, address } = contracts['test']
    const contract = new web3.eth.Contract(abi, address) // 创建合约
    const res = await contract.methods.test().call()
    console.log(`---------->日志输出:call_test`, res)
}
// 账户列表
const getAccounts = async () => {
    const res = await web3.eth.getAccounts()
    console.log(`---------->日志输出:getAccounts`, res)
}
// 查询余额
const getBalance = async (address: string = '0xF55c6Be2F9390301bFc66Dd9f7f52495B56301dC') => {
    const res = await web3.eth.getBalance(address)
    console.log(`---------->日志输出:getBalance`, res)
}
// 设置合约访问白名单 主合约名，新增合约地址 ，发起人
const setApprovalForAll = async (contractName: string = 'test', contractAddress: string = '', from: string = '0xF55c6Be2F9390301bFc66Dd9f7f52495B56301dC') => {
    if (!contractAddress || !from) {
        console.log(`---------->日志输出:参数异常{ contractName = 'test', contractAddress = '', from = '' }`, { contractName, contractAddress, from })
    }
    const { abi, address } = (contracts as any)[contractName]
    const contract = new web3.eth.Contract(abi, address) // 创建合约
    const res = await contract.methods.setApprovalForAll(contractAddress, true).send({ from })
    console.log(`---------->日志输出:setApprovalForAll`, res)
}
// 查询合约对象
const getContract = async (contractName: string = 'test') => {
    const { abi, address } = (contracts as any)[contractName]
    const contract = new web3.eth.Contract(abi, address) // 创建合约
    console.log(`---------->日志输出:contract`, contract)
}
export default {
    transfer,
    getNFTs,
    getAllTokenIds,
    getNFTOwners,
    getTokenBalances,
    getNativeBalance,
    callCloud,
    logOut,
    authenticate,
    currentAsync,
    start,
    Moralis,
    send,
    call,
    purchase,
    addListing,
    getAccounts,
    getBalance,
    setApprovalForAll,
    getContract,
}
