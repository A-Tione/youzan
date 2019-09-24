<template>
  <div class="container " style="min-height: 597px;">
    <div v-if="list&&list.length" class="block-list address-list section section-first js-no-webview-block">
      <a v-for="(item,index) in list"
         :key="item.id"
         :class="{'address-item-default': item.isDefault}"
         class="block-item js-address-item address-item" @click="toEdit(item)">
        <div class="address-title">{{item.name}} {{item.tel}}</div>
        <p>{{item.provinceName}}{{item.cityName}}{{item.districtName}}{{item.aaddress}}</p>
      </a>
    </div>
    <div v-if="list&&!list.length">
      没有地址，请添加
    </div>
    <div class="block stick-bottom-row center">
      <router-link class="btn btn-blue js-no-webview-block js-add-address-btn"
                   :to="{name:'form', query:{type:'add'}}">
        新增地址
      </router-link>
    </div>
  </div>
</template>

<script>
  import Address from 'js/addressService'
  export default {
    name: "all",
    data(){
      return{
        list: null,
      }
    },
    created(){
      Address.list().then(res=>{
        this.list = res.data.list
      })

    },
    methods: {
      toEdit(item){
        // this.$router.push({path:'form'})
        this.$router.push({name:'form',query:{type:'edit',instance:JSON.stringify(item)}})
      }
    }

  }
</script>

<style scoped>

</style>
