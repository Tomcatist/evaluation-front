import request from '@/utils/request'

// 查询一级分类
export function getFirstLevel() {
  return request({
    url: '/evaluation/M36/firstLevel',
    method: 'get'
  })
}

// 提交申请
export function apply(data) {
  return request({
    url: '/application/application/apply',
    method: 'post',
    data: data
  })
}
