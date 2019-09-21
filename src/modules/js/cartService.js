import fetch from 'js/fetch'
import url from 'js/api'

class Cart{
  static add(id){
    return fetch(url.cartAdd,{
      id,
      number:1
    })
  }
  static reduce(id){
    return fetch(url.cartReduce,{
      id,
      number:1
    })
  }
}

export default Cart
