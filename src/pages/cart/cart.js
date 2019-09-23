import 'css/common.css'
import './cart.css'
import './cart_base.css'
import './cart_trade.css'
import Vue from 'vue'
import axios from 'axios'
import url from 'js/api'
import mixin from 'js/mixin'
import volecity from 'velocity-animate'
import Cart from 'js/cartService'

Vue.prototype.$ajax = axios;


let app = new Vue({
  el: '#app',
  data: {
    shopsList: null,//商品列表
    num: 1,//默认商品数量
    total: 0,
    editingShop: null,
    editingShopIndex: -1,
    removePopup: false,
    removeMsg: '',
    removeData: null,
    oldNum: null,
  },
  computed: {
    allSelected: {
      get() {
        if (this.shopsList && this.shopsList.length) {
          return this.shopsList.every(value => {
            return value.checked
          })
        }
        return true
      },
      set(newVal) {
        this.shopsList.forEach(shop => {
          shop.checked = newVal
          shop.goodsList.forEach(goods => {
            goods.checked = newVal
          })
        })
      }
    },
    allRemoveSelected: {//全部删除选择
      get() {
        if (this.editingShop) {
          return this.editingShop.removeChecked
        }
        return false
      },
      set(newVal) {
        if (this.editingShop) {
          this.editingShop.removeChecked = newVal
          this.editingShop.goodsList.forEach(goods => {
            goods.removeChecked = newVal
          })
        }
      }
    },
    numAll() {
      if (this.shopsList && this.shopsList.length) {
        let number = 0
        this.total = 0
        this.shopsList.forEach(shop => {
          shop.goodsList.forEach(goods => {
            if (goods.checked) {
              number += goods.number
              this.total += goods.number * goods.price
            }
          })
        })
        return number
      }
    },
    removeLists() {
      if (this.editingShop) {
        let arr = []
        this.editingShop.goodsList.forEach(goods => {
          if (goods.removeChecked) {
            arr.push(goods)
          }
        })
        return arr
      }
      return []
    }
  },
  watch: {},
  created() {
    this.getList()
  },
  methods: {
    getList() {//渲染购物车列表
      this.$ajax.get(url.cartList).then(res => {
        let list = res.data.shopsList
        list.forEach(shop => {
          shop.checked = true
          shop.removeChecked = false
          shop.editing = false
          shop.editingMeg = '编辑'
          shop.goodsList.forEach(goods => {
            goods.checked = true
            goods.removeChecked = false
          })
        })
        this.shopsList = list
      })
    },
    selectGood(item, e) {//选择商品
      let attr = this.editingShop ? 'removeChecked' : 'checked'
      item[attr] = !item[attr]
      e[attr] = e.goodsList.every(value => {
        return value[attr]
      })
    },
    selectShop(e) {//选择店铺
      let attr = this.editingShop ? 'removeChecked' : 'checked'
      e[attr] = !e[attr]
      e.goodsList.forEach(value => {
        value[attr] = e[attr]
      })
    },
    selectAll() {//全选
      let attr = this.editingShop ? 'allRemoveSelected' : 'allSelected'
      this[attr] = !this[attr]
    },
    edit(e, shopIndex) {
      e.editing = !e.editing
      e.editingMeg = e.editing ? '完成' : '编辑'
      this.shopsList.forEach((value, i) => {
        if (shopIndex !== i) {
          value.editing = false
          value.editingMeg = e.editing ? '' : '编辑'
        }
      })
      this.editingShop = e.editing ? e : null
      this.editingShopIndex = e.editing ? shopIndex : -1
    },
    reduce(good) {//减少商品
      if (good.number < 2) return
      Cart.reduce(good.id).then(res => {
        good.number--
      })

    },
    add(good) {//增加商品
      Cart.add(good.id).then(res => {
        good.number++
      })
      // this.$ajax.post(url.cartAdd, {
      //   id: good.id,
      //   number: 1
      // }).then(res => {
      //   good.number += 1
      // })
    },
    remove(shop, shopIndex, good, goodIndex) {//删除商品弹框
      this.removePopup = true
      this.removeData = {shop, shopIndex, good, goodIndex}
      this.removeMsg = '确定要删除该商品吗？'
    },
    removeList() {//删除多个商品
      this.removePopup = true
      this.removeMsg = `确定将所选${this.removeLists.length}个商品删除？`
    },
    removeConfirm() {//删除单个/多个商品
      if (this.removeMsg === '确定要删除该商品吗？') {
        let {shop, shopIndex, good, goodIndex} = this.removeData
        this.$ajax.delete(url.cartRemove, {
          id: good.id
        }).then(res => {
          shop.goodsList.splice(goodIndex, 1)
          if (!shop.goodsList.length) {
            this.shopsList.splice(shopIndex, 1)
            this.removeShop()
          }
          this.removePopup = false
        })
      } else {
        let ids = []
        this.removeLists.forEach(good => {
          ids.push(good.id)
        })
        this.$ajax.delete(url.cartMremove, {
          id: ids
        }).then(res => {
          let arr = []
          this.editingShop.goodsList.forEach(good => {
            let index = this.removeLists.findIndex(item => {
              return item.id == good.id
            })
            if (index === -1) {
              arr.push(good)
            }
          })
          if (arr.length) {
            this.editingShop.goodsList = arr
            this.removePopup = false
          } else {
            this.shopsList.splice(this.editingShopIndex, 1)
            this.removeShop()
            this.removePopup = false
          }
        })
      }
    },
    removeShop() {//店铺下商品都被删除时
      this.editingShop = null
      this.editingShopIndex = -1
      this.shopsList.forEach(shop => {
        shop.editing = false
        shop.editingMeg = '编辑'
      })
    },
    onStart(e, good) {//滑动开始
      good.startX = e.changedTouches[0].clientX
    },
    onEnd(e, shopIndex, good, index) {//滑动结束   X轴相减
      let endX = e.changedTouches[0].clientX
      let left = '0'
      if (good.startX - endX > 100) {
        left = '-60px'
      }
      if (endX - good.startX > 100) {
        left = '0px'
      }
      volecity(this.$refs[`goods-${shopIndex}-${index}`], {left})
    },
    onFocus(e) {
      console.log(e.number, 'onFocus')
      this.oldNum = e.number

    },
    onBlur(e) {
      console.log(e.number, 'onBlur')
      if (!e.number || e.number<1) {
        e.number = this.oldNum
      }
    },
  },

  mixins: [mixin],
  components: {//组件加载`
  },
})


app.$mount()
