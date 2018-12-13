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
      用户组维护
      <small></small>
    </h1>
    <!-- end page-header -->
    <panel title="维护">
      <template slot="beforeBody">
        <div class="panel-toolbar">
          <button type="button" class="btn btn-info" @click="groupModal">增加组</button>
          <button type="button" class="btn btn-info">增加权限组</button>
          <button type="button" class="btn btn-info">编辑</button>
        </div>
      </template>
      <Tree :data="treedata" ref="tree"></Tree>
    </panel>
    <Modal v-model="modal.groupModal" title="组">
      <Form :model="workPara" :label-width="80" :rules="formRule.ruleGroupModal" ref="formGroup">
        <FormItem label="组名称" prop="usergroup_name">
          <Input placeholder="组名称" v-model="workPara.usergroup_name"/>
        </FormItem>
      </Form>
      <div slot="footer">
        <Button type="text" size="large" @click="modal.groupModal=false">取消</Button>
        <Button type="primary" size="large" @click="submitGroup()">确定</Button>
      </div>
    </Modal>
  </div>
</template>
<script>
import PageOptions from '../../../config/PageOptions.vue'
const apiUrl = '/v1/api/common/system/GroupControl/'

export default {
  name: 'GroupControl',
  data() {
    return {
      modal: {
        groupModal: false
      },
      formRule: {
        ruleGroupModal: {
          usergroup_name: [{ required: true, trigger: 'change' }]
        }
      },
      workPara: {},
      pagePara: {},
      actNode: {},
      treedata: [],
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
        let retData = response.data.info
        this.pagePara = retData
        this.getTreeData()
      } catch (error) {
        this.$commonact.fault(error)
      }
    }

    initPage()
  },
  methods: {
    getTreeData: async function() {
      try {
        let response = await this.$http.post(apiUrl + 'search', {})
        this.treedata = response.data.info
      } catch (error) {
        this.$commonact.fault(error)
      }
    },
    groupModal: function() {
      let selNodes = this.$refs.tree.getSelectedNodes()
      if (selNodes.length > 0) {
        if (selNodes[0].node_type === '01') {
          return this.$commonact.warning('角色下不允许新增')
        }

        this.actNode = selNodes[0]
      } else {
        return this.$commonact.warning('请选择一个节点')
      }
      this.workPara = {}
      this.action = 'add'
      this.$refs.formGroup.resetFields()
      this.modal.groupModal = true
    },
    submitGroup: function() {
      this.$refs.formGroup.validate(async valid => {
        if (valid) {
          try {
            if (this.action === 'add') {
              this.workPara.parent_id = this.actNode.usergroup_id
              this.workPara.node_type = '00'
              await this.$http.post(apiUrl + 'add', this.workPara)
              this.$Message.success('增加组成功')
            } else if (this.action === 'modify') {
              await this.$http.post(apiUrl + 'modifyFolder', this.workPara)
              this.$Message.success('修改组成功')
            }

            this.getTreeData()
            this.modal.groupModal = false
          } catch (error) {
            this.$commonact.fault(error)
          }
        }
      })
    }
  }
}
</script>