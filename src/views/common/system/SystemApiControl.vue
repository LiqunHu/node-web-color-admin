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
          <button type="button" class="btn btn-info" @click="addFolderModel">增加目录</button>
          <button type="button" class="btn btn-info">增加菜单</button>
          <button type="button" class="btn btn-info">编辑</button>
        </div>
      </template>

      <Tree :data="treedata" ref="tree"></Tree>
    </panel>
    <Modal v-model="foldermodal" title="目录">
      <p>Content of dialog</p>
      <p>Content of dialog</p>
      <p>Content of dialog</p>
    </Modal>
  </div>
</template>
<script>
import PageOptions from '../../../config/PageOptions.vue'
const apiUrl = '/v1/api/common/system/SystemApiControl/'

export default {
  name: 'SystemApiControl',
  data() {
    return {
      foldermodal: false,
      pagePara: {},
      treedata: [],
      actNode: {}
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
    addFolderModel: function(event) {
      let selnodes = this.$refs.tree.getSelectedNodes()
      if (selnodes.length > 0) {
        if (selnodes[0].node_type === '01') {
          return this.$commonact.warning('菜单下不允许新增内容')
        }
        this.actNode = selnodes[0]
        this.foldermodal = true
      } else {
        return this.$commonact.warning('请选择一个目录')
      }
    }
  }
}
</script>