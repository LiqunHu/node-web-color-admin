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

      <Tree :data="data1" ref="tree"></Tree>
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
const common = require('@/lib/common')
const apiUrl = '/v1/api/common/system/SystemApiControl/'

export default {
  data() {
    return {
      foldermodal: false,
      data1: [
        {
          title: 'parent 1',
          expand: true,
          children: [
            {
              title: 'parent 1-1',
              expand: true,
              children: [
                {
                  title: 'leaf 1-1-1'
                },
                {
                  title: 'leaf 1-1-2'
                }
              ]
            },
            {
              title: 'parent 1-2',
              expand: true,
              children: [
                {
                  title: 'leaf 1-2-1'
                },
                {
                  title: 'leaf 1-2-1'
                }
              ]
            }
          ]
        }
      ]
    }
  },
  created() {
    PageOptions.pageEmpty = false
  },
  methods: {
    addFolderModel: function(event) {
      let selnodes = this.$refs.tree.getSelectedNodes()
      if (selnodes.length > 0) {
      } else {
        return this.$commonact.Warning('请选择一个目录')
      }
      console.log(selnodes)
    }
  }
}
</script>