import request from '@/utils/request'

// 查询申报教研课题、科研项目立项、验收和成果评价标准列表
export function listM35(query) {
  return request({
    url: '/evaluation/M35/list',
    method: 'get',
    params: query
  })
}

// 查询申报教研课题、科研项目立项、验收和成果评价标准详细
export function getM35(id) {
  return request({
    url: '/evaluation/M35/' + id,
    method: 'get'
  })
}

// 新增申报教研课题、科研项目立项、验收和成果评价标准
export function addM35(data) {
  return request({
    url: '/evaluation/M35',
    method: 'post',
    data: data
  })
}

// 修改申报教研课题、科研项目立项、验收和成果评价标准
export function updateM35(data) {
  return request({
    url: '/evaluation/M35',
    method: 'put',
    data: data
  })
}

// 删除申报教研课题、科研项目立项、验收和成果评价标准
export function delM35(id) {
  return request({
    url: '/evaluation/M35/' + id,
    method: 'delete'
  })
}
