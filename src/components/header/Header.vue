<template>
  <div>
    <!-- begin #header -->
    <div id="header" class="header navbar-default">
      <!-- begin navbar-header -->
      <div class="navbar-header">
        <button type="button" class="navbar-toggle pull-right" v-on:click="toggleMobileRightSidebar" v-if="pageOptions.pageWithTwoSidebar">
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
        </button>
        <button type="button" class="navbar-toggle pull-left" v-on:click="toggleMobileSidebar" v-if="pageOptions.pageWithTwoSidebar">
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
        </button>
        <router-link to="/dashboard/v2" class="navbar-brand">
          <span class="navbar-logo"></span>
          <b>Color</b> Admin
        </router-link>
        <button type="button" class="navbar-toggle" v-on:click="toggleMobileSidebar" v-if="!pageOptions.pageWithTwoSidebar && (!pageOptions.pageWithTopMenu && !pageOptions.pageWithoutSidebar)">
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
        </button>
        <button type="button" class="navbar-toggle" v-on:click="toggleMobileTopMenu" v-if="pageOptions.pageWithTopMenu && pageOptions.pageWithoutSidebar">
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
        </button>
      </div>
      <!-- end navbar-header -->
      <!-- begin header-nav -->
      <ul class="navbar-nav navbar-right">
        <li class="dropdown navbar-user">
          <Dropdown trigger="click" class="dropdown-menu-right" @on-click="dropdownWork">
            <a class="btn btn-link dropdown-toggle">
              <!-- <div class="image image-icon bg-black text-grey-darker">
                <i class="fa fa-user"></i>
              </div> -->
              <img :src="userInfo.avatar" alt>
              <span class="d-none d-md-inline">{{userInfo.name}}</span>
              <b class="caret"></b>
            </a>
            <DropdownMenu slot="list" style="min-width: 10rem;">
              <DropdownItem name="profile">Edit Profile</DropdownItem>
              <DropdownItem divided name="logout">Log Out</DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </li>
        <li class="divider d-none d-md-block" v-if="pageOptions.pageWithTwoSidebar"></li>
        <li class="d-none d-md-block" v-if="pageOptions.pageWithTwoSidebar">
          <a href="javascript:;" v-on:click="toggleRightSidebar" data-click="right-sidebar-toggled" class="f-s-14">
            <i class="fa fa-th"></i>
          </a>
        </li>
      </ul>
      <!-- end header navigation right -->
    </div>
    <!-- end #header -->
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import PageOptions from '../../config/PageOptions.vue'

export default {
  name: 'Header',
  computed: {
    ...mapState('access', {
      userInfo: state => state.userInfo
    })
  },
  data() {
    return {
      pageOptions: PageOptions
    }
  },
  methods: {
    ...mapActions('access', ['logout']),
    toggleMobileSidebar() {
      this.pageOptions.pageMobileSidebarToggled = !this.pageOptions.pageMobileSidebarToggled
    },
    toggleMobileRightSidebar() {
      this.pageOptions.pageMobileRightSidebarToggled = !this.pageOptions.pageMobileRightSidebarToggled
    },
    toggleMobileTopMenu() {
      this.pageOptions.pageMobileTopMenu = !this.pageOptions.pageMobileTopMenu
    },
    toggleMobileMegaMenu() {
      this.pageOptions.pageMobileMegaMenu = !this.pageOptions.pageMobileMegaMenu
    },
    toggleRightSidebar() {
      this.pageOptions.pageRightSidebarToggled = !this.pageOptions.pageRightSidebarToggled
    },
    checkForm: function(e) {
      e.preventDefault()
      this.$router.push({ path: '/extra/search' })
    },
    dropdownWork: function(name) {
      if (name === 'logout') {
        this.$http.post('/v1/api/auth/signout', {})
        this.logout()
        this.$router.push({ path: '/' })
      } else if (name === 'profile') {
        this.$router.push({ path: '/common/system/UserProfile' })
      }
    }
  }
}
</script>
