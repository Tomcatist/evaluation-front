import request from '@/utils/request'

// 查询出版论著、教材评价标准列表
export function listM34(query) {
  return request({
    url: '/evaluation/M34/list',
    method: 'get',
    params: query
  })
}

// 查询出版论著、教材评价标准详细
export function getM34(id) {
  return request({
    url: '/evaluation/M34/' + id,
    method: 'get'
  })
}

// 新增出版论著、教材评价标准
export function addM34(data) {
  return request({
    url: '/evaluation/M34',
    method: 'post',
    data: data
  })
}

// 修改出版论著、教材评价标准
export function updateM34(data) {
  return request({
    url: '/evaluation/M34',
    method: 'put',
    data: data
  })
}

// 删除出版论著、教材评价标准
export function delM34(id) {
  return request({
    url: '/evaluation/M34/' + id,
    method: 'delete'
  })
}
