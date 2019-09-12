let url = {
  hotLists: '/index/hotLists',//商品列表
  banner: '/index/banner',//首页banner
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
