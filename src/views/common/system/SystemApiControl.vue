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
          <button type="button" class="btn btn-info">增加目录</button>
          <button type="button" class="btn btn-info">增加菜单</button>
          <button type="button" class="btn btn-info">编辑</button>
        </div>
      </template>

      <Tree :data="data1"></Tree>
    </panel>
  </div>
</template>
<script>
import PageOptions from '../../../config/PageOptions.vue'

export default {
  data() {
    return {
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
  }
}
</script>