import request from '@/utils/request'

// 查询社会服务和科技成果转化评价标准列表
export function listM37(query) {
  return request({
    url: '/evaluation/M37/list',
    method: 'get',
    params: query
  })
}

// 查询社会服务和科技成果转化评价标准详细
export function getM37(id) {
  return request({
    url: '/evaluation/M37/' + id,
    method: 'get'
  })
}

// 新增社会服务和科技成果转化评价标准
export function addM37(data) {
  return request({
    url: '/evaluation/M37',
    method: 'post',
    data: data
  })
}

// 修改社会服务和科技成果转化评价标准
export function updateM37(data) {
  return request({
    url: '/evaluation/M37',
    method: 'put',
    data: data
  })
}

// 删除社会服务和科技成果转化评价标准
export function delM37(id) {
  return request({
    url: '/evaluation/M37/' + id,
    method: 'delete'
  })
}
