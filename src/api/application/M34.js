import request from '@/utils/request'

// 查询一级分类
export function getFirstLevel() {
  return request({
    url: '/evaluation/M34/firstLevel',
    method: 'get'
  })
}

// 根据一级分类查询二级分类
export function getSecondLevel(firstLevel) {
  return request({
    url: '/evaluation/M34/secondLevel/' + firstLevel,
    method: 'get'
  })
}

// 根据一级分类和二级分类查询三级分类
export function getThirdLevel(firstLevel,secondLevel) {
  return request({
    url: '/evaluation/M34/thirdLevel/' + firstLevel + "/" + secondLevel,
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
