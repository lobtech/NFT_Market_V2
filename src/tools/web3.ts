import store from '@/store'
import contracts from '@/tools/contracts'
const Web3 = (window as any).Web3 // 引用全局的web3 在index.html文件cdn引入<script src="https://cdn.jsdelivr.net/npm/web3@latest/dist/web3.min.js"></script>

// 查询当前网络
const net = async () => {
    const res = await Web3.eth.net.getId()
    console.log(`---------->日志输出:res`, res)
}

// 登录钱包
const login = async () => {
    const ethereum = (window as any).ethereum // 获取小狐狸实例
    if (typeof ethereum.isMetaMask === 'undefined') {
        alert('看起来您需要一个 Dapp 浏览器才能开始使用。')
        alert('请安装 MetaMask！')
    }
    return ethereum.request({ method: 'eth_requestAccounts' })
}

// 账户列表
const getAccounts = async () => {
    const web3 = new Web3((window as any).ethereum) // 创建一个新的web3 对象
    const res = await web3.eth.getAccounts()
    console.log(`---------->日志输出:getAccounts`, res)
}

// 查询余额
const getBalance = async (address: string = '') => {
    const web3 = new Web3((window as any).ethereum) // 创建一个新的web3 对象
    const res = await web3.eth.getBalance(address)
    // console.log(`---------->日志输出:getBalance`, res)
    return res
}

// 查询代币余额
const getTokensBalance = async (userAddress: string = '') => {
    // console.log(`---------->日志输出:userAddress`, userAddress)
    const { abi, address } = contracts['money']
    const web3 = new Web3((window as any).ethereum) // 创建一个新的web3 对象
    const contract = new web3.eth.Contract(abi, address) // 创建合约
    return await contract.methods.balanceOf(userAddress).call()
}

// 查询合约对象
const getContract = async (contractName: string = 'test') => {
    const { abi, address } = (contracts as any)[contractName]
    const web3 = new Web3((window as any).ethereum) // 创建一个新的web3 对象
    const contract = new web3.eth.Contract(abi, address) // 创建合约
    console.log(`---------->日志输出:contract`, contract)
}

// 授权某个合约可使用我的货币
const approve = (contractName: string = 'test', contractAddress: string = '', num: string = '10') => {
    const { abi, address } = (contracts as any)[contractName]
    const web3 = new Web3((window as any).ethereum) // 创建一个新的web3 对象
    const contract = new web3.eth.Contract(abi, address) // 创建合约
    let user = store.state.user?.account || ''
    console.log(`---------->日志输出:user`, user)
    // console.log(`---------->日志输出:Moralis.Units.Token("0.5", "18")`, Moralis.Units.Token('0.5', '18'))
    // 发送交易，使用事件获取返回结果
    contract.methods
        .approve(contractAddress, `${num}${Math.pow(10, 18)}`)
        .send({ from: user })
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

// 设置某个人的领取状态
const setAirdrop = async (userAddress: string = '', state: boolean = false) => {
    const { abi, address } = contracts['airdrop']
    const web3 = new Web3((window as any).ethereum) // 创建一个新的web3 对象
    const contract = new web3.eth.Contract(abi, address) // 创建合约
    let user = store.state.user?.account
    // console.log(`---------->日志输出:state`, state)
    const res = await contract.methods.setUsers(userAddress, state).send({ from: user })
    // const res = await contract.methods.test('0x9a4244c1d438810f09f468dfc2ea4cf40ad93c10', '2').call()
    console.log(`---------->日志输出:call_test`, res)
}

// 查询奖池
const pool = async () => {
    const { abi, address } = contracts['money']
    const web3 = new Web3((window as any).ethereum) // 创建一个新的web3 对象
    const contract = new web3.eth.Contract(abi, address) // 创建合约
    return await contract.methods.balanceOf('0xF55c6Be2F9390301bFc66Dd9f7f52495B56301dC').call()
}

// 是否可领取(用户地址)
const eligible = async (userAddress: string = '') => {
    const { abi, address } = contracts['airdrop']
    const web3 = new Web3((window as any).ethereum) // 创建一个新的web3 对象
    const contract = new web3.eth.Contract(abi, address) // 创建合约
    return await contract.methods.contains(userAddress).call()
}

// 领取货币(什么合约，货币地址，谁)
const distribute = (contractName: string = 'test', contractAddress: string = '', from: string = '') => {
    console.log(`---------->日志输出:`, from)
    const { abi, address } = (contracts as any)[contractName]
    const web3 = new Web3((window as any).ethereum) // 创建一个新的web3 对象
    const contract = new web3.eth.Contract(abi, address) // 创建合约
    // 发送交易，使用事件获取返回结果
    return contract.methods.distribute(contractAddress).send({ from })
}

// 授权(合约，物品id，数量)
const setApprovalForAll = (contractName: string = 'test', contractAddress: string = '', state: boolean = false, from: string = '') => {
    const { abi, address } = (contracts as any)[contractName]
    const web3 = new Web3((window as any).ethereum) // 创建一个新的web3 对象
    const contract = new web3.eth.Contract(abi, address) // 创建合约
    return contract.methods.setApprovalForAll(contractAddress, state).send({ from })
}
// 查询某个人的所有装备
const balanceOfBatch = (contractName: string = 'test', users: string[] = [], ids: string[] = [], from: string = '') => {
    const { abi, address } = (contracts as any)[contractName]
    const web3 = new Web3((window as any).ethereum) // 创建一个新的web3 对象
    const contract = new web3.eth.Contract(abi, address) // 创建合约
    return contract.methods.balanceOfBatch(users, ids).call()
}

// 购买商品(物品地址，物品id，数量)
const buy = (contractAddress: string, id: string, num: string) => {
    const { abi, address } = contracts['buy']
    const web3 = new Web3((window as any).ethereum) // 创建一个新的web3 对象
    const contract = new web3.eth.Contract(abi, address) // 创建合约
    let user = store.state.user?.account
    // 价格写死了 一件1块钱
    let value = Number(num) * Math.pow(10, 18)
    contract.methods
        .buy(contractAddress, id, num)
        .send({ from: user, value })
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
    const web3 = new Web3((window as any).ethereum) // 创建一个新的web3 对象
    const contract = new web3.eth.Contract(abi, address) // 创建合约
    const res = await contract.methods.get().call()
    // const res = await contract.methods.test('0x9a4244c1d438810f09f468dfc2ea4cf40ad93c10', '2').call()
    console.log(`---------->日志输出:call_test`, res)
}

// 发送一个合约函数请求
const send = () => {
    const { abi, address } = contracts['airdrop']
    const web3 = new Web3((window as any).ethereum) // 创建一个新的web3 对象
    const contract = new web3.eth.Contract(abi, address) // 创建合约
    let user = store.state.user?.account
    console.log(`---------->日志输出:user`, user)
    // console.log(`---------->日志输出:Moralis.Units.Token("0.5", "18")`, Moralis.Units.Token('0.5', '18'))
    // 发送交易，使用事件获取返回结果
    contract.methods
        .distribute('0x9d027E7fDFF8d5E194449CfC1B9275584F7624CE', [{ beneficiary: user, amount: `${7 * Math.pow(10, 18)}` }])
        // .addListing(contracts['GameItems']['address'], '1', 45)
        .send({ from: user })
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

export default {
    net,
    login,
    getAccounts,
    getBalance,
    getTokensBalance,
    getContract,
    approve,
    setAirdrop,
    pool,
    eligible,
    distribute,
    buy,
    setApprovalForAll,
    balanceOfBatch,
    call,
    send,
}
