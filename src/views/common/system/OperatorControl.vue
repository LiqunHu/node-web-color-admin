<template>
  <div>
    <!-- begin breadcrumb -->
    <ol class="breadcrumb pull-right">
      <li class="breadcrumb-item active">
        <a href="javascript:;">系统管理</a>
      </li>
    </ol>
    <!-- end breadcrumb -->
    <!-- begin page-header -->
    <h1 class="page-header">
      员工维护
      <small></small>
    </h1>
    <!-- end page-header -->
    <panel title="维护">
      <template slot="beforeBody">
        <div class="panel-toolbar">
          <div class="form-inline">
            <div class="input-group m-r-10">
              <input type="text" placeholder="搜索用户名、姓名、电话" class="form-control">
              <div class="input-group-append">
                <button type="button" class="btn btn-info">
                  <i class="fa fa-search"></i>
                </button>
              </div>
            </div>
            <div class="form-group m-r-10">
              <button type="button" class="btn btn-info">增加员工</button>
            </div>
          </div>
        </div>
      </template>
			<Table stripe ref="userTable" :columns="table.userTable.rows" :data="table.iconTable.data"></Table>
    </panel>
  </div>
</template>
<script>
import PageOptions from '../../../config/PageOptions.vue'

export default {
  name: 'OperatorControl',
  data: function() {
    return {
      modal: {},
      table: {
        userTable: {
          rows: [
            {
              type: 'index',
              width: 60,
              align: 'center'
            },
            {
              title: '用户名',
              key: 'user_username'
            },
            {
              title: '姓名',
              key: 'user_name'
            },
            {
              title: '电话',
              key: 'user_phone'
            },
            {
              title: '邮箱',
              key: 'user_email'
            },
            {
              title: '用户组',
              key: 'user_groups'
            }
          ],
          data: []
        }
      },
      formRule: {
        ruleFolderModal: {
          systemmenu_name: [{ required: true, trigger: 'change' }],
          systemmenu_icon: [{ required: true, trigger: 'change' }]
        }
      }
    }
  },
  created() {
    PageOptions.pageEmpty = false
  }
}
</script>