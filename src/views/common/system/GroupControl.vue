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
          <button type="button" class="btn btn-info" @click="permissionModal">增加权限组</button>
          <button type="button" class="btn btn-info" @click="editNode">编辑</button>
        </div>
      </template>
      <Tree :data="tree.groupTree" ref="tree"></Tree>
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
    <Modal v-model="modal.permissionModal" title="角色">
      <Form :model="workPara" :label-width="80" :rules="formRule.rulePermissionModal" ref="formPermission">
        <FormItem label="角色名称" prop="usergroup_name">
          <Input placeholder="角色名称" v-model="workPara.usergroup_name"/>
        </FormItem>
        <Tree show-checkbox multiple :data="tree.permissionTree" ref="permissionTree"></Tree>
      </Form>
      <div slot="footer">
        <Button type="text" size="large" @click="modal.permissionModal=false">取消</Button>
        <Button type="primary" size="large" @click="submitPermission()">确定</Button>
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
        groupModal: false,
        permissionModal: false
      },
      formRule: {
        ruleGroupModal: {
          usergroup_name: [{ required: true, trigger: 'change' }]
        },
        rulePermissionModal: {
          usergroup_name: [{ required: true, trigger: 'change' }]
        }
      },
      workPara: {},
      pagePara: {},
      actNode: {},
      tree: {
        groupTree: [],
        permissionTree: []
      },
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
        this.tree.groupTree = response.data.info
      } catch (error) {
        this.$commonact.fault(error)
      }
    },
    groupModal: function() {
      let selNodes = this.$refs.tree.getSelectedNodes()
      if (selNodes.length > 0) {
        if (selNodes[0].node_type === '01') {
          return this.$Message.warning('角色下不允许新增')
        }

        this.actNode = selNodes[0]
      } else {
        return this.$Message.warning('请选择一个节点')
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
              await this.$http.post(apiUrl + 'modify', this.workPara)
              this.$Message.success('修改组成功')
            }

            this.getTreeData()
            this.modal.groupModal = false
          } catch (error) {
            this.$commonact.fault(error)
          }
        }
      })
    },
    permissionModal: function() {
      let selNodes = this.$refs.tree.getSelectedNodes()
      if (selNodes.length > 0) {
        if (selNodes[0].node_type === '01') {
          return this.$Message.warning('职位下不允许新增')
        }
        this.actNode = selNodes[0]
      } else {
        return this.$Message.warning('请选择一个节点')
      }
      this.action = 'add'
      this.workPara = {}
      this.tree.permissionTree = []
      this.tree.permissionTree = JSON.parse(JSON.stringify(this.pagePara.menuInfo))
      this.$refs.permissionTree.rebuildTree()
      this.$refs.formPermission.resetFields()
      this.modal.permissionModal = true
    },
    submitPermission: function() {
      this.$refs.formPermission.validate(async valid => {
        if (valid) {
          try {
            let nodes = this.$refs.permissionTree.getCheckedAndIndeterminateNodes()
            this.workPara.menus = []
            for (let n of nodes) {
              this.workPara.menus.push({ systemmenu_id: n.systemmenu_id })
            }
            if (this.action === 'add') {
              this.workPara.parent_id = this.actNode.usergroup_id
              this.workPara.node_type = '01'
              await this.$http.post(apiUrl + 'add', this.workPara)
              this.$Message.success('增加角色成功')
            } else if (this.action === 'modify') {
              await this.$http.post(apiUrl + 'modify', this.workPara)
              this.$Message.success('修改角色成功')
            }

            this.getTreeData()
            this.modal.permissionModal = false
          } catch (error) {
            this.$commonact.fault(error)
          }
        }
      })
    },
    editNode: async function() {
      const getCheckData = async nodeObj => {
        let response = await this.$http.post(apiUrl + 'getcheck', {
          usergroup_id: nodeObj[0].usergroup_id
        })
        let retData = response.data.info
        // this.tree.permissionTree = [
        //   {
        //     title: 'parent 1',
        //     expand: true,
        //     children: [
        //       {
        //         title: 'parent 1-1',
        //         expand: true,
        //         children: [
        //           {
        //             title: 'leaf 1-1-1',
        //             disabled: true
        //           },
        //           {
        //             title: 'leaf 1-1-2'
        //           }
        //         ]
        //       },
        //       {
        //         title: 'parent 1-2',
        //         expand: true,
        //         children: [
        //           {
        //             title: 'leaf 1-2-1',
        //             checked: true
        //           },
        //           {
        //             title: 'leaf 1-2-1'
        //           }
        //         ]
        //       }
        //     ]
        //   }
        // ]
        this.tree.permissionTree = []
        let tempTree = JSON.parse(JSON.stringify(this.pagePara.menuInfo))

        const treeTraverse = nodeArray => {
          nodeArray.forEach(value => {
            retData.groupMenu.forEach(systemmenuId => {
              if (systemmenuId === value.systemmenu_id) {
                if (!value.expand) {
                  value.checked = true
                }
              }
            })
            if (value.expand) {
              treeTraverse(value.children)
            }
          })
        }

        treeTraverse(tempTree)
        console.log(tempTree)
        this.tree.permissionTree = JSON.parse(JSON.stringify(tempTree))
        this.$refs.permissionTree.rebuildTree()
      }
      try {
        let selNodes = this.$refs.tree.getSelectedNodes()
        if (selNodes.length > 0) {
          this.actNode = selNodes[0]
        } else {
          return this.$Message.warning('请选择一个节点')
        }

        this.action = 'modify'
        this.workPara.usergroup_id = selNodes[0].usergroup_id
        if (selNodes[0].node_type === '00') {
          this.$refs.formGroup.resetFields()
          this.workPara.usergroup_name = selNodes[0].name
          this.modal.groupModal = true
        } else if (selNodes[0].node_type === '01') {
          this.$refs.formPermission.resetFields()
          this.workPara.usergroup_name = selNodes[0].name
          await getCheckData(selNodes)
          this.modal.permissionModal = true
        }
      } catch (error) {
        this.$commonact.fault(error)
      }
    }
  }
}
</script>