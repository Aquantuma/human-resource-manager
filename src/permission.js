import router from '@/router/index'
import store from '@/store/index'

// 添加导航守卫 方法一
/* router.beforeEach((to, from, next) => {
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
}) */

// 添加导航守卫 方法二
router.beforeEach(async(to, from, next) => {
  const token = store.getters.token
  //   创建白名单
  const whiteList = ['/login', '/404']
  //   有token + 打开登录页 => 跳转到主页
  if (token && to.path === '/login') {
    next('/')
  }

  //   有token + 打开其它页面 => 放行
  if (token && to.path !== '/login') {
    // 只有在已登录且访问其它页面时才进行用户信息的获取
    // 且用户信息保存在state状态后就不再重复获取了
    if (!store.getters.userId) {
      await store.dispatch('user/handleUserInfo')
      // 拿到数据，在页面跳转前，进行路由权限的筛选
      const res = await store.dispatch('permission/filterRoutes', store.state.user.userInfo.roles.menus)
      console.log(res)
      router.addRoutes([
        ...res,
        { path: '*', redirect: '/404', hidden: true }
      ])
      // 追加路由后需要重新匹配跳转路径
      next(to.path)
    } else {
      next()
    }
  }

  //   无token + 打开白名单页面 => 放行
  if (!token && whiteList.includes(to.path)) {
    next()
  }

  //   无token + 打开非白名单页面 => 跳转到登录页
  if (!token && !whiteList.includes(to.path)) {
    next('/login')
  }
})
