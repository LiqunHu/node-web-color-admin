import { ACCESS_LOGIN, ACCESS_LOGOUT } from '@/store/mutations-type'
const common = require('@/lib/common')

const state = {
  userInfo: common.getStoreData('userinfo') || {}
}

const mutations = {
  [ACCESS_LOGIN](state, { userInfo }) {
    state.userInfo = userInfo
    common.clearStoreData()
    common.setStoreData('token', userInfo.Authorization)
    common.setStoreData('userinfo', userInfo)
  },
  [ACCESS_LOGOUT]: state => {
    state.userInfo = {}
    common.clearStoreData()
  }
}

const actions = {
  async login({ state, commit }, { userInfo }) {
    commit(ACCESS_LOGIN, {
      userInfo: userInfo
    })
  },
  async logout({ state, commit }) {
    commit(ACCESS_LOGOUT)
  }
}

export default {
  state,
  mutations,
  actions
}
