import { login } from '@/api/user'
const state = {
  token: null
}
const mutations = {
  setToken(state, data) {
    state.token = data
  },
  removeToken(state) {
    state.token = null
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

