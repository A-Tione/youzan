let url = {
  hotLists: '/index/hotLists',//商品列表
  banner: '/index/banner',//首页banner
  topList: '/category/topList',//商品分类一级分类
  rank: '/category/rank',//综合分类,
  subList: '/category/subList',//商品分类二级分类
}

//开发环境和正式环境的切换
// let host = '';//正式
let host = 'http://yapi.edaedu.net/mock/105';//开发

for (let key in url) {
  if (url.hasOwnProperty(key)) {//hasOwnProperty 表示对象自身属性中是否具有指定的属性
    url[key] = host + url[key]
  }
}

export default url
