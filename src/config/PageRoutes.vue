<script>
const routes = [
  { path: '/', component: resolve => require(['@/views/Login'], resolve) },
  { path: '/dashboard/home', component: resolve => require(['@/views/Home'], resolve) }
]

export default routes
</script>
