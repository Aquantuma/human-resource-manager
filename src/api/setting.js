import request from '@/utils/request'

// 获取公司信息
export const getCompanyInfo = (id) => {
  return request({
    url: `/company/${id}`,
    method: 'get'
  })
}

// 获取所有角色列表
export const getRolesList = (params) => {
  return request({
    url: '/sys/role',
    method: 'get',
    params
  })
}
