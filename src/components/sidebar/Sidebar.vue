<template>
  <div>
    <!-- begin #sidebar -->
    <div id="sidebar" class="sidebar" v-bind:class="{ 'sidebar-transparent': pageOptions.pageSidebarTransparent }">
      <!-- begin sidebar scrollbar -->
      <vue-scroll :ops="ops">
        <!-- begin sidebar user -->
        <sidebar-nav-profile></sidebar-nav-profile>
        <!-- end sidebar user -->
        <!-- begin sidebar nav -->
        <sidebar-nav></sidebar-nav>
        <!-- end sidebar nav -->
      </vue-scroll>
      <!-- end sidebar scrollbar -->
    </div>
    <div class="sidebar-bg"></div>
    <!-- end #sidebar -->
    <div class="mobile-click" v-on:click="dismissSidebar"></div>
  </div>
</template>

<script>
import SidebarNav from './SidebarNav.vue'
import SidebarNavProfile from './SidebarNavProfile.vue'
import PageOptions from '../../config/PageOptions.vue'

export default {
  name: 'Sidebar',
  components: {
    SidebarNav,
    SidebarNavProfile
  },
  data() {
    return {
      ops: {
        bar: {
          background: '#575d63'
        }
      },
      pageOptions: PageOptions
    }
  },
  methods: {
    dismissSidebar: function() {
      this.pageOptions.pageMobileSidebarToggled = false
      this.pageOptions.pageMobileRightSidebarToggled = false
    }
  }
}
</script>
