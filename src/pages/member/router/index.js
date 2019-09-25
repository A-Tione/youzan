import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)


const routes = [{
  path: '/',
  component: require('../components/member')
}, {
  path:'/address',
  component: require('../components/address'),
  children: [
    {
      path: '',
      redirect: 'all'
    },{
      path: 'all',
      name:'all',
      component: require('../components/all')
    },{
      path: 'form',
      name: 'form',
      component: require('../components/form')
    },
  ]},
]

const router = new VueRouter({
  routes
})


export default router
