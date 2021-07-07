import request from '@/utils/request'

// 获取员工列表
export const getEmployeesList = (params) => {
  return request({
    url: '/sys/user',
    method: 'get',
    params
  })
}

// 批量导入员工
export const importEmployees = (data) => {
  return request({
    url: '/sys/user/batch',
    method: 'post',
    data
  })
}

// 删除员工数据
export const deleteEmployee = (id) => {
  return request({
    url: `/sys/user/${id}`,
    method: 'delete'
  })
}
