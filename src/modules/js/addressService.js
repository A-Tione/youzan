import fetch from 'js/fetch'
import url from 'js/api'

class Address{
  static list(){
    return fetch('get',url.addressLists)
  }
  static add(data){
    return fetch('get',url.addressAdd,data)
  }
  static remove(id){
    return fetch('get',url.addressRemove,id)
  }
  static update(data){
    return fetch('get',url.addressUpdate,data)
  }
  static setDefault(id){
    return fetch('get',url.addressSetDefault,id)
  }


}

export default Address
