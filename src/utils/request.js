import axios from 'axios'
import store from '@/store/index'
import router from '@/router/index'
import { getTimeStamp } from '@/utils/auth'

import { Message } from 'element-ui'

// 创建token有效期的检验函数
const checkTimeOut = () => {
  const now = new Date().getTime()
  // 设置token有效期为2小时
  const timeOut = 1000 * 3600 * 2
  return (now - getTimeStamp()) > timeOut
}

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
      if (checkTimeOut()) {
        // console.log('token已失效')
        // 调用actions中的退出登录方法
        store.dispatch('user/logout')
        // 跳转到登录页
        router.push('/login')
        // 停止掉当前的请求
        return Promise.reject(new Error('登录有效期已过，请重新登录'))
      }
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
    // console.log('这是网络层面的成功')
    // console.log(res)
    const { success, message, data } = res.data
    if (success) {
      // 1.1 数据成功 -> 返回数据
      // console.log('数据请求成功')
      // 这里不直接返回res
      // 而是从res.data中解构处data （res.data.data）
      return data
    } else {
      // 1.2 数据失败 -> 提示错误+停止请求
      // console.log('数据请求失败')
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
    // 后端token失效的被动处理
    // 断网、服务器崩溃也是这里处理的
    // 条件需写得详细，防止err里面没有response的情况报错
    if (err.response && err.response.data && err.response.data.code === 10002) {
      store.dispatch('user/logout')
      router.push('/login')
    }
    // 弹出窗告诉用户
    Message.error(err.message)
    // 接着需要放行（报错）
    // return 123 这种普通数据的相应会返回到.then
    // 这里应该用Promise.reject 直接停止当前的请求过程
    return Promise.reject(new Error(err.message))
  }
)

export default service
