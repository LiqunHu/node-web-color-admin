import Vue from 'vue'
import Vuex from 'vuex'

import access from './modules/access'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    access: {
      namespaced: true,
      ...access
    }
  }
})

export default store
