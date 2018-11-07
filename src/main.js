// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueX from 'vuex'
import axios from 'axios'
import store from './store'
import './lib/jquery-vender.js'

import routes from './config/PageRoutes'

// plugins
import VueRouter from 'vue-router'
import VueBootstrap from 'bootstrap-vue'
import VueNVD3 from 'vue-nvd3'
import VueInsProgressBar from 'vue-ins-progress-bar'
import VueEventCalendar from 'vue-event-calendar'
import VueSparkline from 'vue-sparklines'
import Vueditor from '@agametov/vueditor'
import VueHljs from 'vue-hljs'
import VueSweetalert2 from 'vue-sweetalert2'
import VueNotification from 'vue-notification'
import VuePanel from './lib/panel/'
import VueDateTimePicker from 'vue-bootstrap-datetimepicker'
import VueSelect from 'vue-select'
import VueDatepicker from 'vuejs-datepicker/dist/vuejs-datepicker.esm.js'
import VueMaskedInput from 'vue-maskedinput'
import VueInputTag from 'vue-input-tag'
import VueSlider from 'vue-slider-component'
import VueGoodTable from 'vue-good-table'
import VueFullCalendar from 'vue-full-calendar'
import VueCountdown from '@xkeshi/vue-countdown'
import VueColorpicker from 'vue-pop-colorpicker'
import mavonEditor from 'mavon-editor'

// plugins css
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'nvd3/build/nv.d3.min.css'
import 'vue-event-calendar/dist/style.css'
import 'vue-hljs/dist/vue-hljs.min.css'
import '@agametov/vueditor/dist/style/vueditor.min.css'
import 'pc-bootstrap4-datetimepicker/build/css/bootstrap-datetimepicker.css'
import 'simple-line-icons/css/simple-line-icons.css'
import 'flag-icon-css/css/flag-icon.min.css'
import 'bootstrap-social/bootstrap-social.css'
import 'ionicons/dist/css/ionicons.min.css'
import 'vue-good-table/dist/vue-good-table.css'
import 'fullcalendar/dist/fullcalendar.css'
import 'mavon-editor/dist/css/index.css'

// color admin css
import './assets/css/default/style.min.css'
import './assets/css/default/style-responsive.min.css'
import './assets/css/default/theme/default.css'
import './assets/css/style.css'

import App from './App'
// use mavon-editor
Vue.use(VueX)
Vue.use(VueRouter)
Vue.use(VueBootstrap)
Vue.use(VueNVD3)
Vue.use(VueEventCalendar, { locale: 'en' })
Vue.use(VueSparkline)
Vue.use(Vueditor)
Vue.use(VueHljs)
Vue.use(VueSweetalert2)
Vue.use(VueNotification)
Vue.use(VuePanel)
Vue.use(VueDateTimePicker)
Vue.use(VueGoodTable)
Vue.use(VueFullCalendar)
Vue.use(VueColorpicker)
Vue.use(VueInsProgressBar, {
  position: 'fixed',
  show: true,
  height: '3px'
})
Vue.component('v-select', VueSelect)
Vue.component('datepicker', VueDatepicker)
Vue.component('masked-input', VueMaskedInput)
Vue.component('input-tag', VueInputTag)
Vue.component('vue-slider', VueSlider)
Vue.component(VueCountdown.name, VueCountdown)
Vue.use(mavonEditor)

const router = new VueRouter({
  mode: 'history',
  scrollBehavior: () => ({y: 0}),
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

const instance = axios.create(axiosConfig)
// Add a request interceptor
instance.interceptors.request.use(
  function(config) {
    // Do something before request is sent
    $('.btn').addClass('disabled')
    let token = common.getStoreData('token')
    if (typeof token === 'string') {
      config.headers['Authorization'] = token
    }
    return config
  },
  function(error) {
    // Do something with request error
    return Promise.reject(error)
  }
)

// Add a response interceptor
instance.interceptors.response.use(
  function(response) {
    // Do something with response data
    $('.btn').removeClass('disabled')
    return response
  },
  function(error) {
    // Do something with response error
    $('.btn').removeClass('disabled')
    return Promise.reject(error)
  }
)
Vue.prototype.$http = instance

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
