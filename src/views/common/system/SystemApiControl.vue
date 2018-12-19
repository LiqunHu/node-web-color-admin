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
      系统菜单维护
      <small></small>
    </h1>
    <!-- end page-header -->
    <panel title="维护">
      <template slot="beforeBody">
        <div class="panel-toolbar">
          <button type="button" class="btn btn-info" @click="addFolderModal">增加目录</button>
          <button type="button" class="btn btn-info" @click="addMenuModal">增加菜单</button>
          <button type="button" class="btn btn-info" @click="editNode">编辑</button>
        </div>
      </template>

      <Tree :data="tree.apiTree" ref="apiTree" :render="renderTreedata"></Tree>
    </panel>
    <Modal v-model="modal.folderModal" title="目录">
      <Form :model="workPara" :label-width="80" :rules="formRule.ruleFolderModal" ref="formFolder">
        <FormItem label="目录名称" prop="systemmenu_name">
          <Input placeholder="目录名称" v-model="workPara.systemmenu_name"/>
        </FormItem>
        <FormItem label="图标" prop="systemmenu_icon">
          <Input search enter-button placeholder="图标..." v-model="workPara.systemmenu_icon" @on-search="showIconModal"/>
        </FormItem>
      </Form>
      <div slot="footer">
        <Button type="text" size="large" @click="modal.folderModal=false">取消</Button>
        <Button type="primary" size="large" @click="submitFolder()">确定</Button>
      </div>
    </Modal>
    <Modal v-model="modal.iconModal" title="图标选择" @on-cancel="iconCancel">
      <Table highlight-row height="300" ref="icontable" :columns="table.iconTable.rows" :data="table.iconTable.data" @on-current-change="iconChoose"></Table>
    </Modal>
    <Modal v-model="modal.menuModal" title="菜单">
      <Form :model="workPara" :label-width="80" :rules="formRule.ruleMenuModal" ref="formMenu">
        <FormItem label="功能名称" prop="systemmenu_name">
          <Input placeholder="目录名称" v-model="workPara.systemmenu_name"/>
        </FormItem>
        <FormItem label="API路径" prop="api_path">
          <Input placeholder="API路径" v-model="workPara.api_path"/>
        </FormItem>
        <FormItem label="权限校验" prop="auth_flag">
          <Select v-model="workPara.auth_flag">
            <Option v-for="item in pagePara.tfInfo" :value="item.id" :key="item.id">{{ item.text }}</Option>
          </Select>
        </FormItem>
        <FormItem label="是否显示" prop="show_flag">
          <Select v-model="workPara.show_flag">
            <Option v-for="item in pagePara.tfInfo" :value="item.id" :key="item.id">{{ item.text }}</Option>
          </Select>
        </FormItem>
      </Form>
      <div slot="footer">
        <Button type="text" size="large" @click="modal.menuModal=false">取消</Button>
        <Button type="primary" size="large" @click="submitMenu()">确定</Button>
      </div>
    </Modal>
  </div>
</template>
<script>
import _ from 'lodash'
import PageOptions from '../../../config/PageOptions.vue'
const common = require('@/lib/common')
const apiUrl = '/v1/api/common/system/SystemApiControl/'
const icons = require('@/config/icon.json')

export default {
  name: 'SystemApiControl',
  data() {
    return {
      modal: {
        folderModal: false,
        iconModal: false,
        menuModal: false
      },
      table: {
        iconTable: {
          rows: [
            {
              type: 'index',
              width: 60,
              align: 'center'
            },
            {
              title: '图标',
              key: 'iconSource',
              render: (h, params) => {
                return h('i', {
                  class: params.row.iconSource
                })
              }
            },
            {
              title: '图标代码',
              key: 'iconSource'
            }
          ],
          data: icons
        }
      },
      formRule: {
        ruleFolderModal: {
          systemmenu_name: [{ required: true, trigger: 'change' }],
          systemmenu_icon: [{ required: true, trigger: 'change' }]
        },
        ruleMenuModal: {
          systemmenu_name: [{ required: true, trigger: 'change' }],
          api_path: [{ required: true, trigger: 'change' }],
          auth_flag: [{ required: true, trigger: 'change' }],
          show_flag: [{ required: true, trigger: 'change' }]
        }
      },
      pagePara: {},
      tree: {
        apiTree: []
      },
      actNode: {},
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
        this.getTreeData()
      } catch (error) {
        this.$commonact.fault(error)
      }
    }

    initPage()
  },
  methods: {
    renderTreedata: function(h, { root, node, data }) {
      return common.treeIconRender(h, { root, node, data }, this, this.$refs.apiTree, 'ios-folder-open', 'ios-cog')
    },
    getTreeData: async function() {
      try {
        let response = await this.$http.post(apiUrl + 'search', {})
        this.tree.apiTree = response.data.info
      } catch (error) {
        this.$commonact.fault(error)
      }
    },
    addFolderModal: function() {
      this.workPara = {}
      this.action = 'add'
      this.$refs.formFolder.resetFields()
      if (_.isEmpty(this.actNode)) {
        return this.$commonact.warning('请选择一个目录')
      } else {
        if (this.actNode.node_type === '01') {
          return this.$commonact.warning('菜单下不允许新增内容')
        }
        this.modal.folderModal = true
      }
    },
    showIconModal: function() {
      this.modal.iconModal = true
    },
    iconChoose: function(currentRow) {
      this.workPara.systemmenu_icon = currentRow.iconSource
    },
    iconCancel: function() {
      this.workPara.systemmenu_icon = ''
    },
    submitFolder: function() {
      this.$refs.formFolder.validate(async valid => {
        if (valid) {
          try {
            if (this.action === 'add') {
              this.workPara.parent_id = this.actNode.systemmenu_id
              await this.$http.post(apiUrl + 'addFolder', this.workPara)
              this.$Message.success('增加目录成功')
            } else if (this.action === 'modify') {
              await this.$http.post(apiUrl + 'modifyFolder', this.workPara)
              this.$Message.success('修改目录成功')
            }

            this.getTreeData()
            this.modal.folderModal = false
          } catch (error) {
            this.$commonact.fault(error)
          }
        }
      })
    },
    addMenuModal: function() {
      this.workPara = {}
      this.action = 'add'
      this.$refs.formMenu.resetFields()
      if (_.isEmpty(this.actNode)) {
        return this.$commonact.warning('请选择一个目录')
      } else {
        if (this.actNode.node_type === '01') {
          return this.$commonact.warning('菜单下不允许新增内容')
        }
        this.modal.menuModal = true
      }
    },
    submitMenu: function() {
      this.$refs.formMenu.validate(async valid => {
        if (valid) {
          try {
            if (this.action === 'add') {
              this.workPara.parent_id = this.actNode.systemmenu_id
              await this.$http.post(apiUrl + 'addMenu', this.workPara)
              this.$Message.success('增加菜单成功')
            } else if (this.action === 'modify') {
              await this.$http.post(apiUrl + 'modifyMenu', this.workPara)
              this.$Message.success('修改菜单成功')
            }
            this.getTreeData()
            this.modal.menuModal = false
          } catch (error) {
            this.$commonact.fault(error)
          }
        } else {
          this.$commonact.error('增加目录失败')
        }
      })
    },
    editNode: async function() {
      try {
        if (_.isEmpty(this.actNode)) {
          return this.$commonact.warning('请选择一个节点')
        }
        this.action = 'modify'
        if (this.actNode.node_type === '00') {
          this.workPara = {}
          this.$refs.formFolder.resetFields()
          this.workPara.systemmenu_id = this.actNode.systemmenu_id
          this.workPara.systemmenu_name = this.actNode.systemmenu_name
          this.workPara.systemmenu_icon = this.actNode.systemmenu_icon
          this.modal.folderModal = true
        } else if (this.actNode.node_type === '01') {
          this.workPara = {}
          this.$refs.formMenu.resetFields()
          this.workPara.systemmenu_id = this.actNode.systemmenu_id
          this.workPara.systemmenu_name = this.actNode.systemmenu_name
          this.workPara.api_path = this.actNode.api_path
          this.workPara.auth_flag = this.actNode.auth_flag
          this.workPara.show_flag = this.actNode.show_flag
          this.modal.menuModal = true
        }
      } catch (error) {
        this.$commonact.fault(error)
      }
    }
  }
}
</script>