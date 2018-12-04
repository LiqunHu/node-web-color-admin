<template>
  <!-- begin top-menu nav -->
  <ul class="nav" v-if="userInfo.menulist" v-bind:style="{ marginLeft: '-' + margin.left + 'px', marginRight: '-'+ margin.right + 'px' }">
    <template v-for="menu in userInfo.menulist">
      <top-menu-nav-list ref="topMenuNavList" v-bind:menu="menu" v-bind:key="menu.menu_name" v-bind:status="menu.status" v-on:collapse-other="handleCollapseOther(menu)"></top-menu-nav-list>
    </template>
    <li class="menu-control menu-control-left" v-bind:class="{ 'show': controls.left }" v-on:click="controlLeft">
      <a href="javascript:;" data-click="prev-menu">
        <i class="fa fa-angle-left"></i>
      </a>
    </li>
    <li class="menu-control menu-control-right" v-bind:class="{ 'show': controls.right }" v-on:click="controlRight">
      <a href="javascript:;" data-click="next-menu">
        <i class="fa fa-angle-right"></i>
      </a>
    </li>
  </ul>
  <!-- end top-menu nav -->
</template>

<script>
import { mapState } from 'vuex'
import TopMenuNavList from './TopMenuNavList.vue'
import PageOptions from '../../config/PageOptions.vue'

export default {
  name: 'TopMenuNav',
  computed: {
    ...mapState('access', {
      userInfo: state => state.userInfo
    })
  },
  components: {
    TopMenuNavList
  },
  mounted() {
    let windowWidth = this.$el.clientWidth - 128
    let listFullWidth = 0
    let listPrevWidth = 0
    let listActive = false

    document.querySelectorAll('.top-menu .nav > li').forEach(function(elm) {
      listFullWidth += elm.offsetWidth
      listPrevWidth += !listActive ? elm.offsetWidth : 0
      listActive = elm.classList.contains('active') ? true : listActive
    })

    this.nav.width = listFullWidth

    listPrevWidth = !listActive ? 0 : listPrevWidth

    if (listPrevWidth >= windowWidth) {
      let finalScrollWidth = listPrevWidth - windowWidth + 128
      if (!document.body.classList.contains('rtl-mode')) {
        this.margin.left = finalScrollWidth
        this.margin.right = 0
      } else {
        this.margin.right = finalScrollWidth
        this.margin.left = 0
      }
    }

    this.controls.right = listPrevWidth !== listFullWidth && listFullWidth >= windowWidth ? true : false
    this.controls.left = listPrevWidth >= windowWidth && listFullWidth >= windowWidth ? true : false
  },
  data() {
    return {
      pageOptions: PageOptions,
      controls: {
        left: false,
        right: false
      },
      margin: {
        left: 0,
        right: 0
      },
      nav: {
        width: 0
      }
    }
  },
  methods: {
    handleCollapseOther: function(menu) {
      for (let i = 0; i < this.userInfo.menulist.length; i++) {
        this.$refs.topMenuNavList[i].collapse(menu)
      }
    },
    controlRight: function() {
      let containerWidth = document.querySelector('.top-menu').offsetWidth - 88
      let widthLeft = this.nav.width + -this.margin.left - containerWidth
      let finalScrollWidth = 0

      if (widthLeft <= containerWidth) {
        finalScrollWidth = widthLeft - -this.margin.left + 128
        this.controls.right = false
      } else {
        finalScrollWidth = containerWidth - -this.margin.left - 128
      }

      if (finalScrollWidth !== 0) {
        if (!document.body.classList.contains('rtl-mode')) {
          this.margin.left = finalScrollWidth
          this.margin.right = 0
        } else {
          this.margin.right = finalScrollWidth
          this.margin.left = 0
        }
        this.controls.left = true
      }
    },
    controlLeft: function() {
      let widthLeft = this.margin.left
      let containerWidth = document.querySelector('.top-menu').offsetWidth
      let finalScrollWidth = 0

      if (widthLeft <= containerWidth) {
        finalScrollWidth = 0
        this.controls.left = false
      } else {
        finalScrollWidth = widthLeft - containerWidth + 88
      }

      if (!document.body.classList.contains('rtl-mode')) {
        this.margin.left = finalScrollWidth
        this.margin.right = 0
        this.controls.right = true
      } else {
        this.margin.right = finalScrollWidth
        this.margin.left = 0
        this.controls.right = true
      }
    }
  }
}
</script>
