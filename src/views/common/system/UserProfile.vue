<template>
  <div>
    <!-- begin profile -->
    <div class="profile">
      <div class="profile-header">
        <!-- BEGIN profile-header-cover -->
        <div class="profile-header-cover"></div>
        <!-- END profile-header-cover -->
        <!-- BEGIN profile-header-content -->
        <div class="profile-header-content">
          <!-- BEGIN profile-header-img -->
          <div class="profile-header-img">
            <img :src="userInfo.avatar" alt>
          </div>
          <!-- END profile-header-img -->
          <!-- BEGIN profile-header-info -->
          <div class="profile-header-info">
            <h4 class="m-t-10 m-b-5">{{userInfo.name}}</h4>
            <p class="m-b-10">UXUI + Frontend Developer</p>
            <a href="#" class="btn btn-xs btn-yellow">Edit Profile</a>
          </div>
          <!-- END profile-header-info -->
        </div>
        <!-- END profile-header-content -->
        <!-- BEGIN profile-header-tab -->
        <ul class="profile-header-tab nav nav-tabs">
          <li class="nav-item">
            <a href="javascript:;" v-on:click="show('about')" v-bind:class="{ 'active': tab.about }" class="nav-link" data-toggle="tab">设置</a>
          </li>
          <li class="nav-item">
            <a href="javascript:;" v-on:click="show('password')" v-bind:class="{ 'active': tab.password }" class="nav-link" data-toggle="tab">密码</a>
          </li>
        </ul>
        <!-- END profile-header-tab -->
      </div>
    </div>
    <!-- end profile -->
    <!-- begin profile-content -->
    <div class="profile-content">
      <!-- begin tab-content -->
      <div class="tab-content p-0">
        <!-- begin #profile-about tab -->
        <div class="tab-pane fade" v-bind:class="{ 'show active': tab.about }">
          <!-- begin table -->
          <div class="table-responsive">
            <table class="table table-profile">
              <thead>
                <tr>
                  <th></th>
                  <th>
                    <h4>
                      {{userInfo.name}}
                      <small>Lorraine Stokes</small>
                    </h4>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr class="highlight">
                  <td class="field">Mobile</td>
                  <td>
                    <i class="fa fa-mobile fa-lg m-r-5"></i> +1-(847)- 367-8924
                    <a href="javascript:;" class="m-l-5">Edit</a>
                  </td>
                </tr>
                <tr>
                  <td class="field">Home</td>
                  <td>
                    <a href="javascript:;">Add Number</a>
                  </td>
                </tr>
                <tr>
                  <td class="field">Office</td>
                  <td>
                    <a href="javascript:;">Add Number</a>
                  </td>
                </tr>
                <tr class="divider">
                  <td colspan="2"></td>
                </tr>
                <tr class="highlight">
                  <td class="field">About Me</td>
                  <td>
                    <a href="javascript:;">Add Description</a>
                  </td>
                </tr>
                <tr class="divider">
                  <td colspan="2"></td>
                </tr>
                <tr>
                  <td class="field">Country/Region</td>
                  <td>
                    <select class="form-control input-inline input-xs" name="region">
                      <option value="US" selected>United State</option>
                      <option value="AF">Afghanistan</option>
                      <option value="AL">Albania</option>
                      <option value="DZ">Algeria</option>
                      <option value="AS">American Samoa</option>
                      <option value="AD">Andorra</option>
                      <option value="AO">Angola</option>
                      <option value="AI">Anguilla</option>
                      <option value="AQ">Antarctica</option>
                      <option value="AG">Antigua and Barbuda</option>
                    </select>
                  </td>
                </tr>
                <tr>
                  <td class="field">City</td>
                  <td>Los Angeles</td>
                </tr>
                <tr>
                  <td class="field">State</td>
                  <td>
                    <a href="javascript:;">Add State</a>
                  </td>
                </tr>
                <tr>
                  <td class="field">Website</td>
                  <td>
                    <a href="javascript:;">Add Webpage</a>
                  </td>
                </tr>
                <tr>
                  <td class="field">Gender</td>
                  <td>
                    <select class="form-control input-inline input-xs" name="gender">
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                    </select>
                  </td>
                </tr>
                <tr>
                  <td class="field">Birthdate</td>
                  <td>
                    <select class="form-control input-inline input-xs" name="day">
                      <option value="04" selected>04</option>
                    </select>
                    -
                    <select class="form-control input-inline input-xs" name="month">
                      <option value="11" selected>11</option>
                    </select>
                    -
                    <select class="form-control input-inline input-xs" name="year">
                      <option value="1989" selected>1989</option>
                    </select>
                  </td>
                </tr>
                <tr>
                  <td class="field">Language</td>
                  <td>
                    <select class="form-control input-inline input-xs" name="language">
                      <option value selected>English</option>
                    </select>
                  </td>
                </tr>
                <tr class="divider">
                  <td colspan="2"></td>
                </tr>
                <tr class="highlight">
                  <td class="field">&nbsp;</td>
                  <td class="p-t-10 p-b-10">
                    <button type="submit" class="btn btn-primary width-150">Update</button>
                    <button type="submit" class="btn btn-white btn-white-without-border width-150 m-l-5">Cancel</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <!-- end table -->
        </div>
        <!-- end #profile-about tab -->
        <!-- begin #profile-about tab -->
        <div class="tab-pane fade" v-bind:class="{ 'show active': tab.password }">
          <h4 class="m-t-0 m-b-20">设置密码</h4>
          <Form ref="formPasswordChange" :model="workPara" :label-width="80" :rules="formRule.rulePasswordChage" style="width: 500px">
            <FormItem label="原密码" prop="old_password">
              <Input type="password" v-model="workPara.old_password"/>
            </FormItem>
            <FormItem label="新密码" prop="password">
              <Input type="password" v-model="workPara.password"/>
            </FormItem>
            <FormItem label="再次输入" prop="repassword">
              <Input type="password" v-model="workPara.repassword"/>
            </FormItem>
            <FormItem>
              <Button type="primary" @click="changePassword">提交</Button>
            </FormItem>
          </Form>
        </div>
        <!-- end #profile-about tab -->
      </div>
      <!-- end tab-content -->
    </div>
    <!-- end profile-content -->
  </div>
</template>

<script>
import { mapState } from 'vuex'
import CryptoJS from 'crypto-js'
import PageOptions from '../../../config/PageOptions.vue'
const apiUrl = '/v1/api/common/system/UserSetting/'

export default {
  data() {
    const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入新密码'))
      } else {
        if (this.workPara.repassword !== '') {
          // 对第二个密码框单独验证
          this.$refs.formPasswordChange.validateField('repassword')
        }
        callback()
      }
    }

    const validatePassCheck = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入你的新密码'))
      } else if (value !== this.workPara.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }

    return {
      tab: {
        about: true,
        password: false
      },
      formRule: {
        rulePasswordChage: {
          old_password: [{ required: true, trigger: 'change' }],
          password: [{ required: true, validator: validatePass, trigger: 'change' }],
          repassword: [{ required: true, validator: validatePassCheck, trigger: 'change' }]
        }
      },
      workPara: {}
    }
  },
  computed: {
    ...mapState('access', {
      userInfo: state => state.userInfo
    })
  },
  created() {
    PageOptions.pageContentFullWidth = true
  },
  beforeRouteLeave(to, from, next) {
    PageOptions.pageContentFullWidth = false
    next()
  },
  methods: {
    show: function(x) {
      this.tab.about = false
      this.tab.password = false

      switch (x) {
        case 'about':
          this.tab.about = true
          break
        case 'password':
          this.tab.password = true
          break
        default:
          this.tab.about = true
          break
      }
    },
    changePassword: async function() {
      try {
        await this.$http.post(apiUrl + 'changePassword', {
          old_password: CryptoJS.MD5(this.workPara.old_password).toString(),
          password: this.workPara.password
        })
        this.$Message.success('修改密码成功')
      } catch (error) {
        this.$commonact.fault(error)
      }
    }
  }
}
</script>