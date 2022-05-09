import request from '@/utils/request'

// 查询艺术类作品的及其评价标准列表
export function listM38(query) {
  return request({
    url: '/evaluation/M38/list',
    method: 'get',
    params: query
  })
}

// 查询艺术类作品的及其评价标准详细
export function getM38(id) {
  return request({
    url: '/evaluation/M38/' + id,
    method: 'get'
  })
}

// 新增艺术类作品的及其评价标准
export function addM38(data) {
  return request({
    url: '/evaluation/M38',
    method: 'post',
    data: data
  })
}

// 修改艺术类作品的及其评价标准
export function updateM38(data) {
  return request({
    url: '/evaluation/M38',
    method: 'put',
    data: data
  })
}

// 删除艺术类作品的及其评价标准
export function delM38(id) {
  return request({
    url: '/evaluation/M38/' + id,
    method: 'delete'
  })
}
