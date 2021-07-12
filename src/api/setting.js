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

// 根据id删除角色
export const delRoleItem = (id) => {
  return request({
    url: `/sys/role/${id}`,
    method: 'delete'
  })
}

// 根据id获取角色详情
export const getRoleDetail = (id) => {
  return request({
    url: `sys/role/${id}`,
    method: 'get'
  })
}

// 根据id更新角色数据
export const updateRoleData = (data) => {
  return request({
    url: `/sys/role/${data.id}`,
    method: 'put',
    data
  })
}

// 新增角色数据
export const addNewRole = (data) => {
  return request({
    url: '/sys/role',
    method: 'post',
    data
  })
}

// 给角色分配权限
export const assignPermission = (data) => {
  return request({
    url: '/sys/role/assignPrem',
    method: 'put',
    data
  })
}
