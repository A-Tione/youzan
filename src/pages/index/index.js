import 'css/common.css'
import './index.css'
import Vue from 'vue'
import axios from 'axios'
import url from 'js/api'

Vue.prototype.$ajax = axios;

let app = new Vue({
  el: '#app',
  data: {
    list: null
  },
  created() {
    this.getHotList()
  },
  methods:{
    getHotList(){
      this.$ajax({
        method:'get',
        url:url.hotLists,
        // data:{pageNum: 1, pageSize: 6,}
      }).then(res => {
        console.log(res, 'res')
        this.list = res.data.list
        console.log(this.data.list,'11111111111111')
      }).catch(err=>{
        console.log(err,'err')
      })
    }
  }
})


app.$mount('#app')
