<template>
  <div class="container " style="min-height: 597px;">
    <div class="section section-first">
      <div class="block form js-form">
        <input class="js-id" name="id" type="hidden" value="69150287">
        <div class="block-item" style="border-top:0;">
          <label>收货人</label>
          <input type="text" placeholder="请输入姓名" name="user_name" v-model="name" maxlength="20">
        </div>
        <div class="block-item">
          <label>联系电话</label>
          <input type="tel" placeholder="联系电话" name="tel" v-model="tel" maxlength="11">
        </div>
        <div class="block-item">
          <label>选择地区</label>
          <div class="select-group">
            <select class="js-province-selector" v-model="provinceValue">
              <option value="">选择省份</option>
              <option v-for="p in addressData.list" :value="p.value">{{p.label}}</option>
            </select>
            <select class="js-city-selector" v-model="cityValue">
              <option value="">选择城市</option>
              <option v-for="p in cityList" :value="p.value">{{p.label}}</option>

            </select>
            <select class="js-county-selector" name="area_code" data-code="440402" v-model="districtValue">
              <option value="">选择地区</option>
              <option v-for="p in districtList" :value="p.value">{{p.label}}</option>
            </select>
          </div>
        </div>
        <div class="block-item">
          <label>详细地址</label>
          <input type="text" placeholder="街道门牌信息" name="address_detail" v-model="address" maxlength="100">
        </div>
      </div>
    </div>
    <div class="block section js-save block-control-btn" @click="add()">
      <div class="block-item c-blue center">保存</div>
    </div>
    <div v-show="type=='edit'" class="block section js-delete block-control-btn">
      <div class="block-item c-red center" @click="remove()">删除</div>
    </div>
    <div v-show="type=='edit'" class="block stick-bottom-row center js-save-default">
      <button class="btn btn-standard js-save-default-btn" @click="setDefault()">设为默认收货地址</button>
    </div>
  </div>
</template>

<script>
  import Address from 'js/addressService'

  export default {
    data() {
      return {
        name: '',
        tel: '',
        provinceValue: '',//省编码
        cityValue: '',//市编码
        districtValue: '',//区编码
        address: '',
        id: '',
        type: '',
        instance: null,
        addressData: require('js/address'),
        cityList: null,//区列表
        districtList: null,//城市列表
      }
    },
    watch: {
      provinceValue(val) {
        if (!val) {
          this.cityValue = ''
          this.districtValue = ''
        } else {
          let list = this.addressData.list
          let index = list.findIndex(item => {
            return item.value === val
          })
          this.cityList = list[index].children
          this.cityValue = ''
          this.districtValue = ''
          if (this.type === 'edit') {
            this.cityValue = parseInt(this.instance.cityValue)
          }
        }
      },
      cityValue(val) {
        if (!val) {
          this.districtValue = ''
        } else {
          let list = this.cityList
          let index = list.findIndex(item => {
            return item.value === val
          })
          this.districtList = list[index].children
          this.districtValue = ''
          if (this.type === 'edit') {
            this.districtValue = parseInt(this.instance.districtValue)
          }
        }
      }
    },
    created() {
      let query = this.$route.query
      this.type = query.type
      if (this.type === 'edit') {
        this.instance = JSON.parse(query.instance)
        this.name = this.instance.name
        this.tel = this.instance.tel
        this.address = this.instance.address
        this.id = this.instance.id
        this.provinceValue = parseInt(this.instance.provinceValue)
      }
    },
    methods: {
      add() {
        //需要对合法性校验
        let {name, tel, provinceValue, cityValue, districtValue, address} = this
        let data = {name, tel, provinceValue, cityValue, districtValue, address}
        if (this.type === 'add') {
          Address.add(data).then(res => {
            this.$router.go(-1)
          })
        } else if (this.type === 'edit') {
          data.id = this.id
          Address.add(data).then(res => {
            this.$router.go(-1)
          })
        }
      },
      remove() {
        if (window.confirm('确认删除')) {
          Address.remove(this.id).then(res => {
            this.$router.go(-1)
          })
        }
      },
      setDefault() {
        Address.setDefault(this.id).then(res => {
          this.$router.go(-1)
        })
      }
    },
  }
</script>
