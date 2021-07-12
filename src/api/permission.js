import request from '@/utils/request'

// 获取所有权限点
export const getPermissionList = () => {
  return request({
    url: '/sys/permission',
    method: 'get'
  })
}

// 根据id获取权限点详情
export const getPermissionDetail = (id) => {
  return request({
    url: `/sys/permission/${id}`,
    method: 'get'
  })
}

// 添加权限点
export const addPermission = (data) => {
  return request({
    url: '/sys/permission',
    method: 'post',
    data
  })
}

// 根据id删除权限点
export const deletePermission = (id) => {
  return request({
    url: `/sys/permission/${id}`,
    method: 'delete'
  })
}

// 根据id更新权限点详情
export const updatePermission = (data) => {
  return request({
    url: `/sys/permission/${data.id}`,
    method: 'put',
    data
  })
}
