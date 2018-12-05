<template>
  <!-- begin error -->
  <div class="error">
    <div class="error-code m-b-10">{{httpcode}}</div>
    <div class="error-content">
      <div class="error-message">We couldn't find it...</div>
      <div class="error-desc m-b-30">
        {{error}}.
        <br>
        {{message}}.
      </div>
      <div>
        <router-link to="/dashboard/v2" class="btn btn-success p-l-20 p-r-20">Go Home</router-link>
      </div>
    </div>
  </div>
  <!-- end error -->
</template>

<script>
import PageOptions from '../config/PageOptions.vue'

export default {
  data() {
    return {
      httpcode: this.$route.query.httpcode,
      error: this.$route.query.error || '-1',
      message: this.$route.query.message || 'System Fault'
    }
  },
  created() {
    PageOptions.pageEmpty = true
  },
  beforeRouteLeave(to, from, next) {
    PageOptions.pageEmpty = false
    next()
  }
}
</script>