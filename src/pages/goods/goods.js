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
Vue.prototype.$ajax = axios;


let app = new Vue({
  el: '#app',
  data: {

  },
  created() {
    this.id = this.getQueryVariable('id') || ''
    this.keyword = this.getQueryVariable('keyword') || ''
    this.getSearchList()
  },

  methods: {
    getSearchList(){
      this.loading = true
      this.$ajax({
        method: 'get',
        url: url.searchList+`?id=${this.id}&keyword=${this.keyword}`,
      }).then(res => {
        let curLists = res.data.list
        if (this.list){
          if (this.pageNum >5){
            return this.allLoaded = true
          }
          this.pageNum += 1
          this.list = this.list.concat(curLists)
        }else {
          this.list = curLists
        }
        this.loading = false
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

  components: {//组件加载`

  }
})


app.$mount()
