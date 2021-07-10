import request from '@/utils/request'

// 获取员工简单列表
export const getEmployeeSimple = () => {
  return ({
    url: '/sys/user/simple',
    method: 'get'
  })
}

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

// 新增员工
export const addEmployee = (data) => {
  return request({
    url: '/sys/user',
    method: 'post',
    data
  })
}

// 保存员工的基本信息
export const saveUserDetail = (data) => {
  return request({
    url: `/sys/user/${data.id}`,
    method: 'put',
    data
  })
}

// 读取用户详情的基础信息
export const getPersonalDetail = (id) => {
  return request({
    url: `/employees/${id}/personalInfo`,
    method: 'get'
  })
}

// 更新用户详情的基础信息
export const updatePersonal = (data) => {
  return request({
    url: `/employees/${data.userId}/personalInfo`,
    method: 'put',
    data
  })
}

// 获取用户的岗位信息
export const getJobDetail = (id) => {
  return request({
    url: `/employees/${id}/jobs`,
    method: 'get'
  })
}

// 保存岗位信息
export const updateJob = (data) => {
  return request({
    url: `/employees/${data.userId}/jobs`,
    method: 'put',
    data
  })
}

// 给员工分配角色
export const assignRoles = (data) => {
  return request({
    url: '/sys/user/assignRoles',
    method: 'put',
    data
  })
}
