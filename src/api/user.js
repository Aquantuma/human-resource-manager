import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/sys/login',
    method: 'post',
    data
  })
}

// 获取用户资料的接口
export function getUserInfo() {
  return request({
    url: '/sys/profile',
    method: 'post'
  })
}

// 获取员工基本信息
export function getUserDetail(id) {
  return request({
    url: `/sys/user/${id}`,
    method: 'get'
  })
}
