import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/sys/login',
    method: 'post',
    data
  })
}

// 获取用户资料的接口
export function getUserInfo(data) {
  return request({
    url: '/sys/profile',
    method: 'post',
    data
  })
}
