import router from '@/router/index'
import store from '@/store/index'

// 添加导航守卫
router.beforeEach((to, from, next) => {
  const token = store.getters.token
  if (token) {
    if (to.path === '/login') {
      //   有token打开登录页，跳转到首页
      next('/')
    } else {
      // 有token打开其它页面，则放行
      next()
    }
  } else {
    // 创建白名单
    const whiteList = ['/login', '/404']
    if (whiteList.indexOf(to.path) !== -1) {
      // 没有token时打开白名单页面，则放行
      next()
    } else {
      // 没有token时打开非白名单页面，跳转到登录页
      next('/login')
    }
  }
})
