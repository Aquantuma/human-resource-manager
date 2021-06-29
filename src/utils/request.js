import axios from 'axios'
import store from '@/store/index'

import { Message } from 'element-ui'

// 创建axios实例
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000 // request timeout
})

// 请求拦截器
service.interceptors.request.use(
  config => {
    const token = store.getters.token
    if (token) {
      // 给请求头添加token验证
      config.headers.Authorization = `Bearer ${token}`
    }
    // 必须返回配置
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// 相应拦截器 相应有三种情况
service.interceptors.response.use(
  res => {
    // 1. 请求成功
    console.log('这是网络层面的成功')
    console.log(res)
    const { success, message, data } = res.data
    if (success) {
      // 1.1 数据成功 -> 返回数据
      console.log('数据请求成功')
      // 这里不直接返回res
      // 而是从res.data中解构处data （res.data.data）
      return data
    } else {
      // 1.2 数据失败 -> 提示错误+停止请求
      console.log('数据请求失败')
      // 弹窗提示错误
      Message.error(message)
      // 拒绝掉当前的请求
      return Promise.reject(new Error(message))
    }
  },
  err => {
    // 2. 请求失败 -> 提示错误+停止请求
    console.log('这是网络层面的失败')
    console.dir(err)
    // 弹出窗告诉用户
    Message.error(err.message)
    // 接着需要放行（报错）
    // return 123 这种普通数据的相应会返回到.then
    // 这里应该用Promise.reject 直接停止当前的请求过程
    return Promise.reject(new Error(err.message))
  }
)

export default service
