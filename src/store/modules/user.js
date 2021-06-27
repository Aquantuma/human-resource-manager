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
    const token = (await login(data)).data.data
    store.commit('setToken', token)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

