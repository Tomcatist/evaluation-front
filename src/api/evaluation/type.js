import request from '@/utils/request'

// 查询评价类型列表
export function listType(query) {
  return request({
    url: '/evaluation/type/list',
    method: 'get',
    params: query
  })
}

// 查询评价类型详细
export function getType(id) {
  return request({
    url: '/evaluation/type/' + id,
    method: 'get'
  })
}

// 新增评价类型
export function addType(data) {
  return request({
    url: '/evaluation/type',
    method: 'post',
    data: data
  })
}

// 修改评价类型
export function updateType(data) {
  return request({
    url: '/evaluation/type',
    method: 'put',
    data: data
  })
}

// 删除评价类型
export function delType(id) {
  return request({
    url: '/evaluation/type/' + id,
    method: 'delete'
  })
}
