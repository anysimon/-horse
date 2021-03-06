import Vue from 'vue'
import App from './App.vue'
import router from './router'
import elementUI from 'element-ui' // 引入UI
import 'element-ui/lib/theme-chalk/index.css' // 引入样式
import './styles/index.less'
import axios from 'axios'
// 引入 nprogress 样式
// 引入格式："包名/具体文件路径"
import 'nprogress/nprogress.css' // 引入axios
import JSONbig from 'json-bigint' // 引入json-bigint
Vue.prototype.$axios = axios // axios 赋值给全局属性
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0'
Vue.config.productionTip = false
Vue.use(elementUI)

// 解决id过长的报错
axios.defaults.transformResponse = [function (data) {
  // Do whatever you want to transform the data
  try {
    return JSONbig.parse(data)
  } catch (err) {
    return data
  }
}]

// 统一设置token
// 请求拦截器
axios.interceptors.request.use(function (config) {
  const token = window.localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  // Do something before request is sent
  // return config 是通行的规则
  // config 是本次请求的配置对象
  return config
}, function (error) {
  // Do something with request error
  return Promise.reject(error)
})

// 响应拦截器
// Add a response interceptor
// axios.interceptors.response.use(function (response) {
// Any status code that lie within the range of 2xx cause this function to trigger
// Do something with response data
//   return response
// }, function (error) {
// Any status codes that falls outside the range of 2xx cause this function to trigger
// Do something with response error
//   return Promise.reject(error)
// })

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
