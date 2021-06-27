import { login } from '@/api/user'
import { setToken, getToken } from '@/utils/auth'
const state = {
  token: getToken()
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
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

