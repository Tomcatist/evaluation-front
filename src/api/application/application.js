import request from '@/utils/request'

// 查询申请列表
export function listApplication(query) {
  return request({
    url: '/application/application/list',
    method: 'get',
    params: query
  })
}

// 查询部门列表
export function getDeptName() {
  return request({
    url: '/application/application/dept',
    method: 'get'
  })
}

// 查询类型列表
export function getType() {
  return request({
    url: '/application/application/type',
    method: 'get'
  })
}

// 查询申请详细
export function getApplication(id) {
  return request({
    url: '/application/application/' + id,
    method: 'get'
  })
}

// 新增申请
export function addApplication(data) {
  return request({
    url: '/application/application',
    method: 'post',
    data: data
  })
}

// 修改申请
export function updateApplication(data) {
  return request({
    url: '/application/application',
    method: 'put',
    data: data
  })
}

// 删除申请
export function delApplication(id) {
  return request({
    url: '/application/application/' + id,
    method: 'delete'
  })
}
