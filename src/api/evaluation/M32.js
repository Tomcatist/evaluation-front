import request from '@/utils/request'

// 查询指导学生竞赛活动评价标准列表
export function listM32(query) {
  return request({
    url: '/evaluation/M32/list',
    method: 'get',
    params: query
  })
}

// 查询指导学生竞赛活动评价标准详细
export function getM32(id) {
  return request({
    url: '/evaluation/M32/' + id,
    method: 'get'
  })
}

// 新增指导学生竞赛活动评价标准
export function addM32(data) {
  return request({
    url: '/evaluation/M32',
    method: 'post',
    data: data
  })
}

// 修改指导学生竞赛活动评价标准
export function updateM32(data) {
  return request({
    url: '/evaluation/M32',
    method: 'put',
    data: data
  })
}

// 删除指导学生竞赛活动评价标准
export function delM32(id) {
  return request({
    url: '/evaluation/M32/' + id,
    method: 'delete'
  })
}
