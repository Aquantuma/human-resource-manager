import store from '@/store'
export const checkPermission = {
  methods: {
    checkPermission(point) {
      return store.state.user.userInfo.roles && store.state.user.userInfo.roles.points.includes(point)
    }
  }
}
