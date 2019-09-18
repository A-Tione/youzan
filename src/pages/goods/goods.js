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
    detail: {
      identification:null,
      imgs:null,
    },
    imgList: null,

  },
  created() {
    this.id = this.getQueryVariable('id') || ''
    this.details()
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
