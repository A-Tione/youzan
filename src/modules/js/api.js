let url = {
  hotLists: '/index/hotLists',//商品列表
  banner: '/index/banner',//首页banner
  topList: '/category/topList',//商品分类一级分类
  rank: '/category/rank',//综合分类,
  subList: '/category/subList',//商品分类二级分类
  searchList: '/search/list',//商品列表
  goodsDetails: '/goods/details',//获取商品详情
  goodsDeal: '/goods/deal',//商品的交易列表
  cartAdd: '/cart/add',//加入购物车
  cartList: '/cart/list',//购物车列表
  cartReduce: '/cart/reduce',//购物车移除商品
  cartRemove: '/cart/remove',//删除购物车单个商品
  cartMremove: '/cart/mremove',//删除购物车多个商品
  addressLists: '/address/list',//地址列表
  addressAdd:'/cart/add',//地址添加
  addressRemove:'/cart/remove',//地址删除
  addressUpdate:'/address/update',//地址编辑
  addressSetDefault:'/cart/remove',//默认地址
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
