import request from '@/utils/request'

// 获取员工列表
export const getEmployeesList = (params) => {
  return request({
    url: '/sys/user',
    method: 'get',
    params
  })
}
