import request from '@/utils/request'

// 查询教学和科研获得荣誉评价标准列表
export function listM39(query) {
  return request({
    url: '/evaluation/M39/list',
    method: 'get',
    params: query
  })
}

// 查询教学和科研获得荣誉评价标准详细
export function getM39(id) {
  return request({
    url: '/evaluation/M39/' + id,
    method: 'get'
  })
}

// 新增教学和科研获得荣誉评价标准
export function addM39(data) {
  return request({
    url: '/evaluation/M39',
    method: 'post',
    data: data
  })
}

// 修改教学和科研获得荣誉评价标准
export function updateM39(data) {
  return request({
    url: '/evaluation/M39',
    method: 'put',
    data: data
  })
}

// 删除教学和科研获得荣誉评价标准
export function delM39(id) {
  return request({
    url: '/evaluation/M39/' + id,
    method: 'delete'
  })
}
