import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/en' // lang i18n

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'

import '@/icons' // icon
import '@/permission' // permission control

/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online ! ! !
 */
/* if (process.env.NODE_ENV === 'production') {
  const { mockXHR } = require('../mock')
  mockXHR()
} */

// set ElementUI lang to EN
Vue.use(ElementUI, { locale })
// 如果想要中文版 element-ui，按如下方式声明
// Vue.use(ElementUI)

// 引入自定义指令的独立封装
import * as directives from '@/directives'
Object.keys(directives).forEach(key => {
  // console.log(key, directives[key])
  Vue.directive(key, directives[key])
})

// 注册全局组件 使用component方法注册
// import PageTools from '@/components/PageTools/index'
// Vue.component('PageTools', PageTools)

// 注册全局组件 使用Vue.use方法
import MyComponents from '@/components'
// Vue.use调用了传入对象中的install方法，等效
// Vue.use = (obj) => {
//   obj.install(Vue)
// }
Vue.use(MyComponents)

// 注册全局过滤器
// Vue.filter('formatDate', (val) => val.split('T')[0])

// 注册预设好的过滤器
import * as filters from '@/filters'
Object.keys(filters).forEach(item => {
  Vue.filter(item, filters[item])
})

// 全局混合类型的引入
import { checkPermission } from '@/mixin'
Vue.mixin(checkPermission)

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
