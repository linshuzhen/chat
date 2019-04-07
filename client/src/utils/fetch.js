import axios from 'axios'
import ElementUI from 'element-ui'

// 创建axios实例
const fetch = axios.create({
  baseURL: 'http://10.0.0.105:3000'// api的base_url
  // timeout: 5000     // 请求超时时间
})

// 这段必须有，否则一刷新，token 就没了
// if (token) {
//   fetch.defaults.headers.common['Authorization'] = `Bearer ${token}`
// }
// fetch.interceptors.request.use(
//   config => {
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`
//     }
//     return config
//   },
//   err => {
//     return Promise.reject(err)
//   }
// )
fetch.interceptors.response.use(
  response => {
    const res = response.data
    if (res.code === 401) {
      // 401状态码为过期
      ElementUI.Message({
        message: 'token过期, 请重新登陆',
        type: 'error',
        duration: 5 * 1000
      })
    } else if (res.code === 403) {
      // 403状态码， token验证错误
      ElementUI.Message({
        message: 'token验证错误',
        type: 'error',
        duration: 5 * 1000
      })
    } else if (res.code === 444) {
      // 444 状态码， 坐席数超过上限
      ElementUI.Message({
        message: '坐席数超过套餐上限',
        type: 'error',
        duration: 5 * 1000
      })
    } else {
      return response
    }
  }
)
export default fetch
