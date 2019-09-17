import 'css/common.css'
import './index.css'
import Vue from 'vue'
import axios from 'axios'
import url from 'js/api'
import footBar from 'components/Foot.vue'
import Swiper from 'components/Swiper.vue'
import {InfiniteScroll} from 'mint-ui'
Vue.use(InfiniteScroll)
Vue.prototype.$ajax = axios;



let app = new Vue({
  el: '#app',
  data: {
    banner: null,
    list: null,
    pageNum: 1,
    pageSize: 6,
    loading: false,//false可以加载，true不能加载，默认为false
    allLoaded: false//是否完全加载完成页面
  },
  created() {
    this.getBanner()
    this.getHotList()
  },
  methods: {
    getBanner(){
      this.$ajax({
        method: 'get',
        url: url.banner,
      }).then(res => {
        this.banner = res.data.list
        console.log(this.banner,'banner')
      }).catch(err => {
        console.log(err, 'err')
      })
    },
    getHotList() {
      this.loading = true
      this.$ajax({
        method: 'get',
        url: url.hotLists+`?pageNum=${this.pageNum}&pageSize=${this.pageSize}`,
      }).then(res => {
        let curLists = res.data.list
        if (this.list) {//下拉刷新请求页面
          if (this.pageNum >5){
            return this.allLoaded = true
          }
          this.pageNum += 1
          this.list = this.list.concat(curLists)
        } else {//第一次请求数据
          this.list = curLists
        }
        this.loading = false
      }).catch(err => {
        console.log(err, 'err')
      })
    },
    toGoods(id){
      location.href = `goods.html?id=${id}`
    }
  },
  components:{
    footBar,
    Swiper
  }
})


app.$mount()
