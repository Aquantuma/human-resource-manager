<template>
  <div class="dashboard-container">
    <div class="app-container">
      <!-- 工具栏 -->
      <PageTools>
        <template #after>
          <el-button type="primary" size="small" @click="addPermission">
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
            <el-button type="text" :disabled="scope.row.type===2" @click="addPermission">添加</el-button>
            <el-button type="text" @click="editPermission">编辑</el-button>
            <el-button type="text">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 放置一个弹层 用来编辑新增节点 -->
      <el-dialog :title="`${showText}权限点`" :visible="showDialog" @close="btnCancel">
        <!-- 表单 -->
        <el-form ref="perForm" :model="formData" :rules="rules" label-width="120px">
          <el-form-item label="权限名称" prop="name">
            <el-input v-model="formData.name" style="width:90%" />
          </el-form-item>
          <el-form-item label="权限标识" prop="code">
            <el-input v-model="formData.code" style="width:90%" />
          </el-form-item>
          <el-form-item label="权限描述">
            <el-input v-model="formData.description" style="width:90%" />
          </el-form-item>
          <el-form-item label="开启">
            <el-switch
              v-model="formData.enVisible"
              active-value="1"
              inactive-value="0"
            />
          </el-form-item>
        </el-form>
        <el-row slot="footer" type="flex" justify="center">
          <el-col :span="6">
            <el-button size="small" type="primary" @click="btnOK">确定</el-button>
            <el-button size="small" @click="btnCancel">取消</el-button>
          </el-col>
        </el-row>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { getPermissionList } from '@/api/permission'
import { listToTreeData } from '@/utils/index'
export default {
  data() {
    return {
      permissionList: [],
      showDialog: false,
      formData: {},
      rules: {
        name: [
          { required: true, message: '该项不能为空', trigger: 'blur' },
          { max: 10, message: '长度不能超过10个字符', trigger: 'blur' }
        ],
        code: [
          { required: true, message: '该项不能为空', trigger: 'blur' },
          { max: 20, message: '长度不能超过20个字符', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    showText() {
      return this.formData.id ? '编辑' : '新增'
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
    },
    addPermission() {
      this.showDialog = true
    },
    editPermission() {
      this.showDialog = true
    },
    btnOK() {
      this.showDialog = false
    },
    btnCancel() {
      this.showDialog = false
    }
  }
}
</script>

<style>

</style>
