<script>
const routes = [
  { path: '*', component: resolve => require(['@/components/error404'], resolve) },
  { path: '/', component: resolve => require(['@/views/Login'], resolve) },
  { path: '/error', component: resolve => require(['@/components/error'], resolve) },
  { path: '/error404', component: resolve => require(['@/components/error404'], resolve) },
  { path: '/dashboard/home', component: resolve => require(['@/views/Home'], resolve) },
  { path: '/common/system/SystemApiControl', component: resolve => require(['@/views/common/system/SystemApiControl'], resolve) },
  { path: '/common/system/GroupControl', component: resolve => require(['@/views/common/system/GroupControl'], resolve) },
  { path: '/common/system/OperatorControl', component: resolve => require(['@/views/common/system/OperatorControl'], resolve) }
]

export default routes
</script>
