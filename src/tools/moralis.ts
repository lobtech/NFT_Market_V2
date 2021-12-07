import store from '@/store'

const Moralis = (window as any).Moralis // 引用全局的Moralis 在index.html文件cdn引入<script src="https://cdn.jsdelivr.net/npm/moralis@latest/dist/moralis.min.js"></script>
const isTest = true // 测试环境
// 正式网
let chain = 'avalanche' as string // 区块链名
let serverUrl = 'https://av6uwrkea2v6.usemoralis.com:2053/server' // 服务器地址
let appId = 'KRhsgl0BHaod6RoqUz0m2aIILRYjSvmQzg1idYa9' // appid

// 测试网
if (isTest) {
    chain = 'bsc testnet' as string // 区块链名
    serverUrl = 'https://iryujqeq3c0k.usemoralis.com:2053/server' as string // 服务器地址
    appId = 'pgxFvaT0RRCnC9efXnb6f6Ck9WxudIoscdigwwpU' as string // appid
}

// 连接服务器
const start = (_serverUrl: string = serverUrl, _appId: string = appId) => {
    const options = { serverUrl: _serverUrl, appId: _appId }
    return Moralis.start(options) // 连接到服务器
}

// 查询是否已授权
const currentAsync = () => {
    return Moralis.User.currentAsync()
}

// 请求授权
const authenticate = () => {
    return Moralis.authenticate({ chain })
}

// 注销
const logOut = () => {
    return Moralis.User.logOut()
}

// 查询本地余额
const getNativeBalance = async (address: string) => {
    // console.log(`---------->查询本地余额:address`, address)
    const res = await Moralis.Web3API.account.getNativeBalance({ chain, address })
    // console.log(`---------->日志输出:res`, res)
}

// 查询令牌余额
const getTokenBalances = async (address: string) => {
    // console.log(`---------->查询令牌余额:address`, address)
    const res = await Moralis.Web3API.account.getTokenBalances({ chain, address })
    console.log(`---------->日志输出:res`, res)
}

// 获取用户资产(指定用户地址,指定区块链)
const getNFTs = async (address: string = '', _chain: string = chain) => {
    // console.log(`---------->获取用户资产:address`, address)
    return Moralis.Web3API.account.getNFTs({ chain: _chain, address })
}

// 查询合约全部资产
const getNFTOwners = async (address: string) => {
    // console.log(`---------->查询合约全部资产:address`, address)
    const res = await Moralis.Web3API.token.getNFTOwners({ chain, address })
    console.log(`---------->日志输出:res`, res)
}

//  查询合约全部资产类型
const getAllTokenIds = async (address: string) => {
    // console.log(`---------->查询合约全部资产类型:address`, address)
    const res = await Moralis.Web3API.token.getAllTokenIds({ chain, address })
    console.log(`---------->日志输出:res`, res)
}

// 转移资产
const transfer = async () => {
    await Moralis.enableWeb3() // 创建web3实例
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

// 请求云函数
const callCloud = async () => {
    let user = store.state.moralis?.user.account
    const params = { contractAddress: '0xff2b673601950a0F164B67dF6f6765366a8c1419', list: [{ beneficiary: user, amount: `${10 * Math.pow(10, 18)}` }] }
    const res = await Moralis.Cloud.run('test', params)
    console.log(`---------->日志输出:res`, res)
}

//  getTokenAllowance(合约地址，令牌所有者地址，令牌使用者地址)
const getTokenAllowance = async (address: string, owner_address: string, spender_address: string) => {
    console.log(`---------->查询合约全部资产类型:address`, address)
    const res = await Moralis.Web3API.token.getTokenAllowance({ chain, address, owner_address, spender_address })
    console.log(`---------->日志输出:res`, res)
}
//  搜索(合约地址，令牌所有者地址，令牌使用者地址)
const searchNFTs = async (q: string, filter: string, _chain: string = chain) => {
    console.log(`---------->搜索:filter`, filter)
    const res = await Moralis.Web3API.token.searchNFTs({ q, filter, chain: _chain })
    console.log(`---------->日志输出:res`, res)
}
export default {
    start,
    currentAsync,
    authenticate,
    logOut,
    getNativeBalance,
    getTokenBalances,
    getNFTs,
    getNFTOwners,
    getAllTokenIds,
    transfer,
    callCloud,
    getTokenAllowance,
    searchNFTs,
}
