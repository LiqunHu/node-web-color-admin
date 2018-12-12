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
          <button type="button" class="btn btn-info">增加菜单</button>
          <button type="button" class="btn btn-info">编辑</button>
        </div>
      </template>

      <Tree :data="treedata" ref="tree"></Tree>
    </panel>
    <Modal v-model="modal.folderModal" title="目录">
      <Form :model="workPara" :label-width="80" :rules="formRule.ruleFoldermodal" ref="formFolder">
        <FormItem label="目录名称" prop="systemmenu_name">
          <Input placeholder="目录名称" v-model="workPara.systemmenu_name"/>
        </FormItem>
        <FormItem label="图标" prop="systemmenu_icon">
          <Input search enter-button placeholder="图标..." v-model="workPara.systemmenu_icon" @on-search="showIconModal"/>
        </FormItem>
      </Form>
      <div slot="footer">
        <Button type="text" size="large" @click="modal.folderModal=false">取消</Button>
        <Button type="primary" size="large" @click="submitFolder(1)">确定</Button>
      </div>
    </Modal>
    <Modal v-model="modal.iconModal" title="图标选择" @on-cancel="iconCancel">
      <Table highlight-row height="300" ref="icontable" :columns="table.iconTable.rows" :data="table.iconTable.data" @on-current-change="iconChoose"></Table>
    </Modal>
    <Modal v-model="modal.menuModal" title="菜单">
      <Form :model="workPara" :label-width="80" :rules="formRule.ruleMenuModal" ref="formMenu">
        <FormItem label="目录名称" prop="systemmenu_name">
          <Input placeholder="目录名称" v-model="workPara.systemmenu_name"/>
        </FormItem>
        <FormItem label="图标" prop="systemmenu_icon">
          <Input search enter-button placeholder="图标..." v-model="workPara.systemmenu_icon" @on-search="showIconModal"/>
        </FormItem>
      </Form>
      <div slot="footer">
        <Button type="text" size="large" @click="modal.menuModal=false">取消</Button>
        <Button type="primary" size="large" @click="submitMenu(1)">确定</Button>
      </div>
    </Modal>
  </div>
</template>
<script>
import PageOptions from '../../../config/PageOptions.vue'
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
        ruleFoldermodal: {
          systemmenu_name: [{ required: true, trigger: 'change' }],
          systemmenu_icon: [{ required: true, trigger: 'change' }]
        }
      },
      pagePara: {},
      treedata: [],
      actNode: {},
      workPara: {}
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
        console.log('init success')
      } catch (error) {
        this.$commonact.fault(error)
      }
    }

    initPage()
  },
  methods: {
    getTreeData: async function(event) {
      try {
        let response = await this.$http.post(apiUrl + 'search', {})
        this.treedata = response.data.info
      } catch (error) {
        this.$commonact.fault(error)
      }
    },
    addFolderModal: function(event) {
      this.workPara = {}
      let selnodes = this.$refs.tree.getSelectedNodes()
      if (selnodes.length > 0) {
        if (selnodes[0].node_type === '01') {
          return this.$commonact.warning('菜单下不允许新增内容')
        }
        this.actNode = selnodes[0]
        this.modal.folderModal = true
      } else {
        return this.$commonact.warning('请选择一个目录')
      }
    },
    showIconModal: function() {
      this.modal.iconModal = true
    },
    iconChoose: function(currentRow, oldCurrentRow) {
      this.workPara.systemmenu_icon = currentRow.iconSource
    },
    iconCancel: function() {
      this.workPara.systemmenu_icon = ''
    },
    submitFolder: function(action) {
      this.$refs.formFolder.validate(async valid => {
        if (valid) {
          this.workPara.parent_id = this.actNode.systemmenu_id
          await this.$http.post(apiUrl + 'addFolder', this.workPara)
          this.getTreeData()
          this.modal.folderModal = false
        } else {
          this.$commonact.error('增加目录失败')
        }
      })
    },
    submitMenu: function(action) {
      this.$refs.formMenu.validate(async valid => {
        if (valid) {
          this.getTreeData()
          this.modal.menuModal = false
        } else {
          this.$commonact.error('增加目录失败')
        }
      })
    }
  }
}
</script>