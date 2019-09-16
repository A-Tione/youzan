import 'css/common.css'
import './search.css'
import Vue from 'vue'
import axios from 'axios'
import url from 'js/api'

Vue.prototype.$ajax = axios;


let app = new Vue({
  el: '#app',
  data: {
    name: ''//搜索名称
  },
  mounted() {
    this.name = this.getQueryVariable('keyword') || ''
  },

  methods: {
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
