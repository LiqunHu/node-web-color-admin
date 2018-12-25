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
      用户维护
      <small></small>
    </h1>
    <!-- end page-header -->
    <panel title="维护">
      <template slot="beforeBody">
        <div class="panel-toolbar">
          <div class="form-inline">
            <div class="input-group m-r-10">
              <input type="text" placeholder="搜索用户名、姓名、电话" v-model="table.userTable.search_text" class="form-control">
              <div class="input-group-append">
                <button type="button" class="btn btn-info" @click="getUserData(1)">
                  <i class="fa fa-search"></i>
                </button>
              </div>
            </div>
            <div class="form-group m-r-10">
              <button type="button" class="btn btn-info" @click="addUserModal">增加用户</button>
            </div>
          </div>
        </div>
      </template>
      <Table stripe ref="userTable" :columns="table.userTable.rows" :data="table.userTable.data">
        <template slot="groups" slot-scope="props">
          <Select multiple v-model="props.user_groups" disabled>
            <Option v-for="item in pagePara.groupInfo" :value="item.id" :key="item.id">{{ item.text }}</Option>
          </Select>
        </template>
        <template slot="action" slot-scope="actrow">
          <a href="#" class="btn btn-info btn-icon btn-sm" @click="modifyUserModal(actrow.row)">
            <i class="fa fa-edit"></i>
          </a>
          <a href="#" class="btn btn-danger btn-icon btn-sm" @click="deleteUser(actrow.row)">
            <i class="fa fa-times"></i>
          </a>
        </template>
      </Table>
      <Page class="m-t-10" :total="table.userTable.total" :page-size="table.userTable.limit" @on-change="getUserData"/>
    </panel>
    <Modal v-model="modal.userModal" title="用户维护">
      <Form :model="workPara" :label-width="80" :rules="formRule.ruleUserModal" ref="formUser">
        <FormItem label="用户名" prop="user_username">
          <Input placeholder="用户名" v-model="workPara.user_username" :disabled="action === 'modify'"/>
        </FormItem>
        <FormItem label="姓名" prop="user_name">
          <Input placeholder="姓名" v-model="workPara.user_name"/>
        </FormItem>
        <FormItem label="邮箱" prop="user_email">
          <Input placeholder="邮箱" v-model="workPara.user_email"/>
        </FormItem>
        <FormItem label="手机" prop="user_phone">
          <Input placeholder="手机" v-model="workPara.user_phone"/>
        </FormItem>
        <FormItem label="用户组" prop="user_groups">
          <Select multiple v-model="workPara.user_groups">
            <Option v-for="item in pagePara.groupInfo" :value="item.id" :key="item.id" :disabled="item.disabled">{{ item.text }}</Option>
          </Select>
        </FormItem>
      </Form>
      <div slot="footer">
        <Button type="text" size="large" @click="modal.userModal=false">取消</Button>
        <Button type="primary" size="large" @click="submitUser">确定</Button>
      </div>
    </Modal>
  </div>
</template>
<script>
import PageOptions from '../../../config/PageOptions.vue'
const apiUrl = '/v1/api/common/system/OperatorControl/'

export default {
  name: 'OperatorControl',
  data: function() {
    return {
      modal: { userModal: false },
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
              key: 'user_groups',
              render: (h, params) => {
                return h('div', this.$refs.userTable.$scopedSlots.groups({ user_groups: params.row.user_groups }))
              }
            },
            {
              title: '操作',
              render: (h, params) => {
                return h('div', this.$refs.userTable.$scopedSlots.action({ row: params.row }))
              }
            }
          ],
          data: [],
          limit: 10,
          offset: 0,
          total: 0,
          search_text: ''
        }
      },
      formRule: {
        ruleUserModal: {
          user_username: [{ required: true, trigger: 'change', message: '请输入用户名' }],
          user_name: [{ required: true, trigger: 'change', message: '请输入用户姓名' }],
          user_email: [{ type: 'email', rigger: 'change', message: '不正确的email格式' }],
          user_groups: [{ type: 'array', min: 1, required: true, trigger: 'change', message: '请选择用户组' }]
        }
      },
      pagePara: {},
      oldPara: {},
      workPara: {},
      action: ''
    }
  },
  created() {
    PageOptions.pageEmpty = false
  },
  mounted: function() {
    const initPage = async () => {
      try {
        let response = await this.$http.post(apiUrl + 'init', {})
        this.pagePara = JSON.parse(JSON.stringify(response.data.info))
      } catch (error) {
        this.$commonact.fault(error)
      }
    }

    initPage()
    this.getUserData(1)
  },
  methods: {
    getUserData: async function(index) {
      try {
        if (index) {
          this.table.userTable.offset = (index - 1) * this.table.userTable.limit
        }

        let response = await this.$http.post(apiUrl + 'search', {
          search_text: this.table.userTable.search_text,
          offset: this.table.userTable.offset,
          limit: this.table.userTable.limit
        })
        let data = response.data.info
        this.table.userTable.total = data.total
        this.table.userTable.data = JSON.parse(JSON.stringify(data.rows))
      } catch (error) {
        this.$commonact.fault(error)
      }
    },
    addUserModal: async function() {
      this.workPara = {}
      this.action = 'add'
      this.$refs.formUser.resetFields()
      this.modal.userModal = true
    },
    modifyUserModal: async function(row) {
      let actrow = JSON.parse(JSON.stringify(row))
      delete actrow._index
      delete actrow._rowKey
      this.oldPara = JSON.parse(JSON.stringify(actrow))
      this.workPara = JSON.parse(JSON.stringify(actrow))
      this.action = 'modify'
      this.$refs.formUser.resetFields()
      this.modal.userModal = true
    },
    submitUser: function() {
      this.$refs.formUser.validate(async valid => {
        if (valid) {
          try {
            if (this.action === 'add') {
              await this.$http.post(apiUrl + 'add', this.workPara)
              this.$Message.success('增加用户成功')
            } else if (this.action === 'modify') {
              await this.$http.post(apiUrl + 'modify', { old: this.oldPara, new: this.workPara })
              this.$Message.success('修改用户成功')
            }
            this.getUserData()
            this.modal.userModal = false
          } catch (error) {
            this.$commonact.fault(error)
          }
        }
      })
    },
    deleteUser: function(row) {
      this.$commonact.confirm('确认要删除用户?', async () => {
        try {
          await this.$http.post(apiUrl + 'delete', { user_id: row.user_id })
          this.$Message.success('删除用户成功')
          this.getUserData()
        } catch (error) {
          this.$commonact.fault(error)
        }
      })
    }
  }
}
</script>