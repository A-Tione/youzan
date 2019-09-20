import 'css/common.css'
import './cart.css'
import './cart_base.css'
import './cart_trade.css'
import Vue from 'vue'
import axios from 'axios'
import url from 'js/api'
import mixin from 'js/mixin'

Vue.prototype.$ajax = axios;


let app = new Vue({
  el: '#app',
  data: {
    shopsList: null,//商品列表
    num: 1,//默认商品数量
    total:0,
    editingShop:null,
    editingShopIndex:-1,
  },
  computed: {
    allSelected: {
      get(){
        if (this.shopsList&&this.shopsList.length){
          return this.shopsList.every(value => {
            return value.checked
          })
        }
        return true
      },
      set(newVal){
        this.shopsList.forEach(shop=>{
          shop.checked = newVal
          shop.goodsList.forEach(goods=>{
            goods.checked = newVal
          })
        })
      }
    },
    numAll(){
      if (this.shopsList && this.shopsList.length) {
        let number = 0
        this.total = 0
        this.shopsList.forEach(shop => {
          shop.goodsList.forEach(goods => {
            if (goods.checked) {
              number += goods.number
              this.total += goods.number*goods.price
            }
          })
        })
        return number
      }
    }
  },
  watch: {},
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.$ajax.get(url.cartList).then(res => {
        let list = res.data.shopsList
        list.forEach(shop => {
          shop.checked = true
          shop.editing = false
          shop.editingMeg = '编辑'
          shop.goodsList.forEach(goods => {
            goods.checked = true
          })
        })
        this.shopsList = list
      })
    },
    selectGood(item, e) {//选择商品
      item.checked = !item.checked
      e.checked = e.goodsList.every(value => {
        return value.checked
      })
    },
    selectShop(e){//选择店铺
      e.checked = !e.checked
      e.goodsList.forEach(value => {
        value.checked = e.checked
      })
    },
    selectAll(){
      this.allSelected = !this.allSelected
    },
    edit(e,shopIndex){
      e.editing = !e.editing
      e.editingMeg = e.editing? '完成':'编辑'
      this.shopsList.forEach((value,i)=>{
        if (shopIndex !== i){
          value.editing = false
          value.editingMeg = e.editing?'':'编辑'
        }
      })
      this.editingShop = e.editing? e:null
      this.editingShopIndex =  e.editing ? shopIndex : -1
    }
  },

  mixins: [mixin],
  components: {//组件加载`
  },

})


app.$mount()
