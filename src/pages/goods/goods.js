import 'css/common.css'
import './goods.css'
import './goods_theme.css'
import './goods_sku.css'
import './goods_mars.css'
import './goods_custom.css'
import './goods_common.css'
import './goods_base.css'
import Vue from 'vue'
import axios from 'axios'
import url from 'js/api'
import Swiper from 'components/Swiper.vue'
import mixin from 'js/mixin'

Vue.prototype.$ajax = axios;


let app = new Vue({
  el: '#app',
  data: {
    id:null,
    detail: null,
    dealList:null,//交易列表
    detailTab:['商品详情','本店成交'],
    tabIndex:0,
    skuType: 1,//sku规格选择
    showSku: false,
    skuNum:1,//sku数量
    isAddCart: false,
    showAddMessage: false,
  },
  created() {
    this.id = this.getQueryVariable('id') || ''
    this.details()
  },
  watch:{
    showSku(val,oldVal){
      document.body.style.overflow = val?'hidden':'auto'
      document.querySelector('html').style.overflow = val?'hidden':'auto'
      // document.body.style.height = val?'100%':'auto'
      // document.querySelector('html').style.height = val?'100%':'auto'
    }
  },

  methods: {
    details(){
      this.$ajax({
        method: 'get',
        url: url.goodsDetails+`?id=${this.id}`,
      }).then(res => {
        this.detail = res.data.data
      }).catch(err => {
        console.log(err, 'err')
      })
    },
    deals(){
      this.$ajax({
        method: 'get',
        url: url.goodsDeal+`?id=${this.id}`,
      }).then(res => {
        this.dealList = res.data.list
      }).catch(err => {
        console.log(err, 'err')
      })
    },
    changeTable(index){
      this.tabIndex = index
      if (index===1){
        this.deals()
      }
    },
    chooseSku(type){
      this.skuType = type
      this.showSku = true
    },
    minNum(e){//修改商品数量
      if (e<0 && this.skuNum ===1){return}
      this.skuNum += e
    },
    addCart(){//加入购物车
      this.$ajax.post(url.cartAdd,{
        id:this.id,
        number: this.skuNum
      }).then(res=>{
        if (res.data.code===1){
          this.showSku = false
          this.isAddCart = true
          this.showAddMessage = true

          setTimeout(()=>{
            this.showAddMessage = false
          },1000)
        }
      })
    },

    getQueryVariable(variable) {//取url参数
      let query = decodeURIComponent(window.location.search.substring(1).split('&')).split(',')
      for (let i=0; i<query.length; i++){
        let arr = query[i].split('=')
        if (arr[0] === variable.toString()){
          return arr[1]
        }
      }
      return false
    },
  },

  mixins: [mixin],//混合
  components: {//组件加载`
    Swiper,
  }
})


app.$mount()
