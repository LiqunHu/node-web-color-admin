<script>
const routes = [
  { path: '/', component: resolve => require(['@/views/Login'], resolve) },
  { path: '/dashboard/home', component: resolve => require(['@/views/Home'], resolve) },
  { path: '/common/system/SystemApiControl', component: resolve => require(['@/views/common/system/SystemApiControl'], resolve) }
]

export default routes
</script>
