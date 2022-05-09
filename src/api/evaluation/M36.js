import request from '@/utils/request'

// 查询获国内外博览会奖项和申请专利获得授权评价标准列表
export function listM36(query) {
  return request({
    url: '/evaluation/M36/list',
    method: 'get',
    params: query
  })
}

// 查询获国内外博览会奖项和申请专利获得授权评价标准详细
export function getM36(id) {
  return request({
    url: '/evaluation/M36/' + id,
    method: 'get'
  })
}

// 新增获国内外博览会奖项和申请专利获得授权评价标准
export function addM36(data) {
  return request({
    url: '/evaluation/M36',
    method: 'post',
    data: data
  })
}

// 修改获国内外博览会奖项和申请专利获得授权评价标准
export function updateM36(data) {
  return request({
    url: '/evaluation/M36',
    method: 'put',
    data: data
  })
}

// 删除获国内外博览会奖项和申请专利获得授权评价标准
export function delM36(id) {
  return request({
    url: '/evaluation/M36/' + id,
    method: 'delete'
  })
}
