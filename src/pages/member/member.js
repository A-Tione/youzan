import 'css/common.css'
import Vue from 'vue'
import router from './router'
import store from './vuex'

const app = new Vue({
  router,
  store
}).$mount('#app')
