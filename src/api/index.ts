import http from './request'
import qs from 'qs'

// 测试接口示例
const test = ({ data = {}, headers = {} }) => {
    data = qs.stringify(data)
    return http({ url: 'http://pc.hbeasts.com/fingernft/user/collections', method: 'post', data, headers })
}
// 查询所有商品
const get_goods = ({ data = {}, headers = {} }) => {
    data = qs.stringify(data)
    return http({ url: '/api/fingernft/home/list', method: 'post', data, headers })
}

export default {
    test,
    get_goods,
}
