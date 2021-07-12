import { asyncRoutes, constantRoutes } from '@/router/index'

const state = {
  routes: []
}
const mutations = {
  // 设置修改state中routes的函数
  setRoutes(state, newRoutes) {
    state.routes = [...constantRoutes, ...newRoutes]
  }
}
const actions = {
  filterRoutes(store, menus) {
    const routes = asyncRoutes.filter(route => menus.includes(route.name))
    console.log(routes)
    // 通过mutations将过滤后的routes存入state
    store.commit('setRoutes', routes)
    return routes
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
