import axios from 'axios'

// 添加请求拦截器
axios.interceptors.request.use(
    function (config) {
        // 在发送请求之前做些什么
        console.log(`---------->日志输出:config`,config);
        return config
    },
    function (error) {
        // 对请求错误做些什么
        return Promise.reject(error)
    }
)

// 添加响应拦截器
axios.interceptors.response.use(
    function (response) {
        // 对响应数据做点什么
        console.log(`---------->日志输出:response`, response)
        return response
    },
    function (error) {
        // 对响应错误做点什么
        return Promise.reject(error)
    }
)
const http = axios.create({
    timeout: 5000,
})
export default http
