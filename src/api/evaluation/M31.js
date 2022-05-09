import request from '@/utils/request'

// 查询教学竞赛评价标准列表
export function listM31(query) {
  return request({
    url: '/evaluation/M31/list',
    method: 'get',
    params: query
  })
}

// 查询教学竞赛评价标准详细
export function getM31(id) {
  return request({
    url: '/evaluation/M31/' + id,
    method: 'get'
  })
}

// 新增教学竞赛评价标准
export function addM31(data) {
  return request({
    url: '/evaluation/M31',
    method: 'post',
    data: data
  })
}

// 修改教学竞赛评价标准
export function updateM31(data) {
  return request({
    url: '/evaluation/M31',
    method: 'put',
    data: data
  })
}

// 删除教学竞赛评价标准
export function delM31(id) {
  return request({
    url: '/evaluation/M31/' + id,
    method: 'delete'
  })
}
