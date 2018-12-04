// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueX from 'vuex'
import axios from 'axios'
import store from './store'

import routes from './config/PageRoutes'

// plugins
import VueRouter from 'vue-router'
import VueInsProgressBar from 'vue-ins-progress-bar'
import iView from 'iview'
import VuePanel from './lib/panel/'
import * as common from './lib/common.js'

// plugins css
import 'bootstrap/dist/css/bootstrap.css'
import 'simple-line-icons/css/simple-line-icons.css'
import 'flag-icon-css/css/flag-icon.min.css'
import 'bootstrap-social/bootstrap-social.css'
import 'ionicons/dist/css/ionicons.min.css'
import 'iview/dist/styles/iview.css'

// color admin css
import './assets/css/default/style.min.css'
import './assets/css/default/style-responsive.min.css'
import './assets/css/default/theme/default.css'
import './assets/css/style.css'

import App from './App'
// use mavon-editor
Vue.use(VueX)
Vue.use(VueRouter)
Vue.use(iView)
Vue.use(VuePanel)
Vue.use(VueInsProgressBar, {
  position: 'fixed',
  show: true,
  height: '3px'
})

const router = new VueRouter({
  mode: 'history',
  scrollBehavior: () => ({ y: 0 }),
  routes
})

Vue.config.productionTip = false

// axios
let axiosConfig = {
  timeout: 5000 // request timeout
}

// if (process.env.NODE_ENV !== 'production') {
//   axiosConfig.baseURL = process.env.BASE_API
// }
let vueInstance
const instance = axios.create(axiosConfig)
// Add a request interceptor
instance.interceptors.request.use(
  function(config) {
    // Do something before request is sent
    vueInstance.$Spin.show()
    let token = common.getStoreData('token')
    if (typeof token === 'string') {
      config.headers['Authorization'] = token
    }
    return config
  },
  function(error) {
    // Do something with request error
    vueInstance.$Spin.hide()
    return Promise.reject(error)
  }
)

// Add a response interceptor
instance.interceptors.response.use(
  function(response) {
    // Do something with response data
    vueInstance.$Spin.hide()
    return response
  },
  function(error) {
    // Do something with response error
    vueInstance.$Spin.hide()
    return Promise.reject(error)
  }
)
Vue.prototype.$http = instance

vueInstance = new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
