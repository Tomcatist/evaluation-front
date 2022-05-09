import request from '@/utils/request'

// 查询发教研科研论文评价标准列表
export function listM33(query) {
  return request({
    url: '/evaluation/M33/list',
    method: 'get',
    params: query
  })
}

// 查询发教研科研论文评价标准详细
export function getM33(id) {
  return request({
    url: '/evaluation/M33/' + id,
    method: 'get'
  })
}

// 新增发教研科研论文评价标准
export function addM33(data) {
  return request({
    url: '/evaluation/M33',
    method: 'post',
    data: data
  })
}

// 修改发教研科研论文评价标准
export function updateM33(data) {
  return request({
    url: '/evaluation/M33',
    method: 'put',
    data: data
  })
}

// 删除发教研科研论文评价标准
export function delM33(id) {
  return request({
    url: '/evaluation/M33/' + id,
    method: 'delete'
  })
}
