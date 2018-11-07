<template>
	<!-- begin login -->
	<div class="login bg-black animated fadeInDown">
		<!-- begin brand -->
		<div class="login-header">
			<div class="brand">
				<span class="logo"></span> <b>Color</b> Admin
				<small>responsive bootstrap 3 admin template</small>
			</div>
			<div class="icon">
				<i class="fa fa-lock"></i>
			</div>
		</div>
		<!-- end brand -->
		<!-- begin login-content -->
		<div class="login-content">
			<form v-on:submit="checkForm" method="POST" class="margin-bottom-0">
				<div class="alert alert-danger" v-show="isA">{{ errorMessage }}</div>
				<div class="form-group m-b-20">
					<input v-model="username" type="text" class="form-control form-control-lg inverse-mode" placeholder="User Name" required />
				</div>
				<div class="form-group m-b-20">
					<input v-model="password" type="password" class="form-control form-control-lg inverse-mode" placeholder="Password" required />
				</div>
				<!-- <div class="checkbox checkbox-css m-b-20">
					<input type="checkbox" id="remember_checkbox" />
					<label for="remember_checkbox">
						Remember Me
					</label>
				</div> -->
				<div class="login-buttons">
					<button type="submit" class="btn btn-success btn-block btn-lg">Sign me in</button>
				</div>
			</form>
		</div>
		<!-- end login-content -->
	</div>
	<!-- end login -->
</template>

<script>
import PageOptions from '../config/PageOptions.vue'
const common = require('@/lib/common')

export default {
  name: 'login',
  data: function() {
    return {
      username: '',
      password: '',
      errorMessage: '',
      isA: false
    }
  },
  created() {
    PageOptions.pageEmpty = true
  },
  beforeRouteLeave(to, from, next) {
    PageOptions.pageEmpty = false
    next()
  },
  methods: {
    checkForm: function(e) {
      e.preventDefault()
      let _self = this
      let encInfo = common.aesEncryptModeCFB(this.username, this.password)
      _self.$http
        .post('/v1/api/auth', {
          username: this.username,
          identifyCode: encInfo[1],
          magicNo: encInfo[0],
          loginType: 'WEB'
        })
        .then(function(response) {
          let token = response.headers.authorization
          if (token) {
            let userinfo = response.data.info
            if (!userinfo.avatar) {
              userinfo.avatar = '/static/images/base/head.jpg'
            }
            common.clearStoreData()
            common.setStoreData('token', token)
            common.setStoreData('userinfo', userinfo)
            _self.$router.push({ path: '/dashboard/home' })
          } else {
            _self.errorMessage = '系统错误'
            _self.isA = true
            common.clearStoreData()
          }
        })
        .catch(function(error) {
          _self.errorMessage = '用户名或者密码错误'
          _self.isA = true
          common.clearStoreData()
        })
    }
  }
}
</script>