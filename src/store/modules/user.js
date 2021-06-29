import { login, getUserInfo, getUserDetail } from '@/api/user'
import { setToken, getToken } from '@/utils/auth'
const state = {
  token: getToken(),
  userInfo: {}
}
const mutations = {
  setToken(state, data) {
    state.token = data
    // 同时存储token
    setToken(data)
  },
  removeToken(state) {
    state.token = null
    setToken(null)
  },
  // 设置用户信息
  setUserInfo(state, data) {
    // 使用浅拷贝的方式进行赋值
    state.userInfo = { ...data }
  },
  // 删除用户信息
  removeUserInfo(state) {
    state.userInfo = {}
  }
}
const actions = {
  async handleLogin(store, data) {
    // 由于在拦截器中解构了 res.data.data
    // 所以后面我们使用的所有res其实就是真正的数据
    // 不用再 res.data.data
    const res = await login(data)
    console.log(res)
    store.commit('setToken', res)
  },
  async handleUserInfo(store) {
    const res = await getUserInfo()
    const resDetail = await getUserDetail(res.userId)
    // 将用户和所登录员工的信息合并
    const data = { ...res, ...resDetail }
    // 将合并后的数据传递给state
    store.commit('setUserInfo', data)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

