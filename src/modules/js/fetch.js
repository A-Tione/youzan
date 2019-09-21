import axios from 'axios'
import url from 'js/api'

function fetch(url,data){
  return new Promise((resolve,reject)=>{
    axios.post(url,data).then(res=>{
      let status = res.data.code
      if (status === 1) {
        resolve(res)
      }
      if ( status === 300){
        location.href = 'login.html'
        resolve(res)
      }else {
        resolve(res)
      }
    }).catch(err=>{
      resolve(err)
    })
  })
}

export default fetch
