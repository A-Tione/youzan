import 'css/common.css'
import './search.css'
import Vue from 'vue'
import axios from 'axios'
import url from 'js/api'
import mixin from 'js/mixin'
import Velocity from 'velocity-animate'
import {InfiniteScroll} from 'mint-ui'
Vue.use(InfiniteScroll)
Vue.prototype.$ajax = axios;


let app = new Vue({
  el: '#app',
  data: {
    id: null,//id
    keyword: '',//搜索名称
    list:null,
    pageNum: 1,
    pageSize: 6,
    loading: false,//false可以加载，true不能加载，默认为false
    allLoaded: false,//是否完全加载完成页面
    isShow:true
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

    move() {
      console.log(document.body.scrollTop)
      // if (document.body.scrollTop > 100) {
      //   this.isShow = true
      // }else {
      //   this.isShow = false
      // }
    },
    toTop(){
      Velocity(document.body,'scroll',{duration:1000})
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

  }
})


app.$mount()
