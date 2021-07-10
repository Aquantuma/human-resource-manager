import request from '@/utils/request'

export const getPermissionList = () => {
  return request({
    url: '/sys/permission',
    method: 'get'
  })
}
