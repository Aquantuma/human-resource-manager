import PageTools from './PageTools/index.vue'

export default {
  install(Vue) {
    // 这个函数会在调用Vue.use的时候自动执行
    // 形参时Vue构造函数本身
    // 需要注册的组件在这里写
    Vue.component('PageTools', PageTools)
  }
}
