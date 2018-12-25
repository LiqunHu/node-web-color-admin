<template>
  <ul class="nav">
    <li class="nav-profile">
      <a href="javascript:;" v-on:click="expand()">
        <div class="cover with-shadow"></div>
        <!-- <div class="image image-icon bg-black text-grey-darker">
          <i class="fa fa-user"></i>
        </div>-->
        <div class="image">
          <img :src="userInfo.avatar" alt>
        </div>
        <div class="info">
          <b class="caret pull-right"></b>
          {{userInfo.name}}
          <small>Front end developer</small>
        </div>
      </a>
    </li>
    <li>
      <ul class="nav nav-profile" v-bind:class="{ 'd-block': this.stat == 'expand', 'd-none': this.stat == 'collapse' }">
        <li>
          <router-link to="/common/system/UserProfile" tag="a">
            <i class="fa fa-cog"></i> Edit Profile
          </router-link>
        </li>
      </ul>
    </li>
  </ul>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'SidebarNavProfile',
  computed: {
    ...mapState('access', {
      userInfo: state => state.userInfo
    })
  },
  data() {
    return {
      stat: ''
    }
  },
  methods: {
    expand: function() {
      this.stat = this.stat === 'expand' ? 'collapse' : 'expand'
    }
  }
}
</script>
