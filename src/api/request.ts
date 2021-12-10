import axios from 'axios'
// 创建http实例
const http = axios.create({
    timeout: 5000,
})
// 添加请求拦截器
http.interceptors.request.use(
    function (config) {
        // 在发送请求之前做些什么
        // console.log(`---------->日志输出:config`, config)
        return config
    },
    function (error) {
        // 对请求错误做些什么
        return Promise.reject(error)
    }
)

// 添加响应拦截器
http.interceptors.response.use(
    function (response) {
        // 对响应数据做点什么
        const { status = 0, data } = response
        if (status === 200) return data
        console.log(`---------->请求错误:`, response)
        return Promise.reject(response)
    },
    function (error) {
        // 对响应错误做点什么
        console.log(`---------->请求失败:`, error)
        return Promise.reject(error)
    }
)

export default http
