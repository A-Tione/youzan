// 先使用vuex插件
import Vue from 'vue'
import Vuex from 'vuex'
import Address from 'js/addressService'

Vue.use(Vuex)

// 创建store实例

const store = new Vuex.Store({
  //状态，状态中的数据是不允许修改的，必须通过事件才能修改
  state: {
    list: null
  },
  //对数据进行同步管理，更改状态的唯一方法
  mutations: {
    init(state, list) {
      state.list = list
    },
    add(state, instance) {
      state.list.push(instance)
    },
    remove(state, id) {
      let list = state.list
      let index = list.findIndex(item => {
        return item.id == id
      })
      list.splice(index, 1)
    },
    update(state, instance) {
      let list = JSON.parse(JSON.stringify(state.list))
      let index = list.findIndex(item => {
        return item.id == instance.id
      })
      list[index] = instance
      state.list = list
    },
    setDefault(state, id) {
      let list = state.list
      list.forEach(item => {
        item.isDefault = item.id == id ? true : false
      })
    }
  },
  //对数据进行异步管理，异步逻辑都应该封装在actions里面
  actions: {
    getList({commit}) {
      Address.list().then(res => {
        // this.list = res.data.list
        commit('init', res.data.list)
      })
    },
    addAction({commit}, instance) {
      Address.add(instance).then(res => {
        // 模拟添加id，最佳实践：后台返回
        instance.id = parseInt(Math.random() * 10000)
        commit('add', instance)
      })
    },
    removeActions({commit}, id) {
      Address.remove(id).then(res => {
        commit('remove', id)
      })
    },
    updateAction({commit}, instance) {
      Address.update(instance).then(res => {
        commit('update', instance)
      })
    },
    setDefaultAction({commit}, id) {
      Address.setDefault(id).then(res => {
        commit('setDefault', id)
      })
    }
  }
})

export default store
