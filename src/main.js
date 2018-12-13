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
import vuescroll from 'vuescroll'
import VuePanel from './lib/panel/'
import * as common from './lib/common.js'

// plugins css
import 'bootstrap/dist/css/bootstrap.css'
import 'simple-line-icons/css/simple-line-icons.css'
import 'flag-icon-css/css/flag-icon.min.css'
import 'bootstrap-social/bootstrap-social.css'
import 'ionicons/dist/css/ionicons.min.css'
import 'iview/dist/styles/iview.css'
import 'vuescroll/dist/vuescroll.css'

// color admin css
import './assets/css/default/style.min.css'
import './assets/css/default/style-responsive.min.css'
import './assets/css/default/theme/default.css'
import './assets/css/style.css'
import './assets/css/ui.css'

import App from './App'
// use mavon-editor
Vue.use(VueX)
Vue.use(VueRouter)
Vue.use(vuescroll)
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
Vue.prototype.$commonact = {
  info: message => {
    vueInstance.$Modal.info({
      title: '提示',
      content: '<p>' + message + '</p>'
    })
  },
  success: message => {
    vueInstance.$Modal.success({
      title: '成功',
      content: '<p>' + message + '</p>'
    })
  },
  warning: message => {
    vueInstance.$Modal.warning({
      title: '警告',
      content: '<p>' + message + '</p>'
    })
  },
  error: message => {
    vueInstance.$Modal.error({
      title: '错误',
      content: '<p>' + message + '</p>'
    })
  },
  confirm: (message, cb) => {
    vueInstance.$Modal.confirm({
      title: '确认',
      content: '<p>' + message + '</p>',
      onOk: cb
    })
  },
  fault: error => {
    let response = error.response
    if (response) {
      if (response.status > 699 && response.status < 800) {
        vueInstance.$Modal.error({
          title: '错误',
          content: '<p>' + response.data.msg + '</p>'
        })
      } else if (response.status === 404) {
        vueInstance.$router.push({
          path: '/error404'
        })
      } else if (response.status === 401) {
        if (response.data.errno === -2) {
          vueInstance.$router.push({ path: '/error', query: { httpcode: response.status, error: response.data.errno, message: '从其他地方登录' } })
        } else {
          vueInstance.$router.push({
            path: '/error',
            query: { httpcode: response.status, error: response.data.errno, message: '未经授权：访问由于凭据无效被拒绝' }
          })
        }
      } else {
        vueInstance.$router.push({ path: '/error', query: { httpcode: response.status, error: response.data.errno, message: response.data.msg } })
      }
    }
  }
}

vueInstance = new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
