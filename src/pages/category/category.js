import 'css/common.css'
import './category.css'
import Vue from 'vue'
import axios from 'axios'
import url from 'js/api'
import footBar from 'components/Foot.vue'
import {InfiniteScroll} from 'mint-ui'

Vue.use(InfiniteScroll)
Vue.prototype.$ajax = axios;


let app = new Vue({
  el: '#app',
  data: {
    topList: null,//一级分类列表
    topListId: null,//一级分类选中id
    topListIndex: 0,
    rankList:null,//综合分类
    subList: null,//二级分类

  },
  created() {
    this.getTopList()
  },
  methods: {
    getTopList(){
      this.$ajax({
        method: 'get',
        url: url.topList,
      }).then(res => {
        this.topList = res.data.list
        if (this.topList){
          this.topListId = this.topList[0].id
          this.getSubListIndex()
        }
      }).catch(err => {
        console.log(err, 'err')
      })
    },
    getSubListIndex(){
      this.$ajax({
        method: 'get',
        url: url.rank,
      }).then(res => {
        this.rankList = res.data
      }).catch(err => {
        console.log(err, 'err')
      })
    },
    getSubList(e){
      this.$ajax({
        method: 'get',
        url: url.subList+`?id=${e}`,
      }).then(res => {
        this.subList = res.data.list
      }).catch(err => {
        console.log(err, 'err')
      })
    },
    activeTopList(e,index){//切换一级分类
      this.topListId = e
      this.topListIndex = index
      if (this.topListIndex===0){
        this.getSubListIndex()
      }else {
        this.getSubList(this.topListId)
      }
    }
  },
  components:{
    footBar,
  }
})


app.$mount()
