import 'css/common.css'
import './member.css'
import './member_base.css'
import Vue from 'vue'
import axios from 'axios'
import url from 'js/api'
import footBar from 'components/Foot.vue'

Vue.prototype.$ajax = axios;


let app = new Vue({
  el: '#app',
  data: {

  },
  created() {

  },

  components:{//组件加载`
    footBar,
  }
})


app.$mount()
