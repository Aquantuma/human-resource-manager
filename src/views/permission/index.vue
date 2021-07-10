<template>
  <div class="dashboard-container">
    <div class="app-container">
      <!-- 工具栏 -->
      <PageTools>
        <template #after>
          <el-button type="primary" size="small">
            <i class="el-icon-plus" />添加权限
          </el-button>
        </template>
      </PageTools>
      <!-- 页面渲染表格 -->
      <el-table :data="permissionList" row-key="id" :default-expand-all="true">
        <el-table-column label="权限名称" prop="name" />
        <el-table-column label="权限标识" prop="code" />
        <el-table-column label="权限描述" prop="description" />
        <el-table-column label="操作">
          <template #default="scope">
            <el-button type="text" :disabled="scope.row.type===2">添加</el-button>
            <el-button type="text">编辑</el-button>
            <el-button type="text">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { getPermissionList } from '@/api/permission'
import { listToTreeData } from '@/utils/index'
export default {
  data() {
    return {
      permissionList: []
    }
  },
  created() {
    this.getPermissionList()
  },
  methods: {
    async getPermissionList() {
      const res = await getPermissionList()
      console.log(res)
      this.permissionList = listToTreeData(res, '0')
    }
  }
}
</script>

<style>

</style>
