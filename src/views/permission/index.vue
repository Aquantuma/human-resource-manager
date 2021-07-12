<template>
  <div class="dashboard-container">
    <div class="app-container">
      <!-- 工具栏 -->
      <PageTools>
        <template #after>
          <el-button type="primary" size="small" @click="addPermission(1, '0')">
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
            <el-button
              type="text"
              :disabled="scope.row.type === 2"
              @click="addPermission(2, scope.row.pid)"
            >添加</el-button>
            <el-button
              type="text"
              @click="editPermission(scope.row.id)"
            >编辑</el-button>
            <el-button
              type="text"
              @click="deletePermission(scope.row.id)"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 放置一个弹层 用来编辑新增节点 -->
      <el-dialog
        :title="`${showText}权限点`"
        :visible="showDialog"
        @close="btnCancel"
      >
        <!-- 表单 -->
        <el-form
          ref="perForm"
          :model="formData"
          :rules="rules"
          label-width="120px"
        >
          <el-form-item label="权限名称" prop="name">
            <el-input v-model="formData.name" style="width: 90%" />
          </el-form-item>
          <el-form-item label="权限标识" prop="code">
            <el-input v-model="formData.code" style="width: 90%" />
          </el-form-item>
          <el-form-item label="权限描述">
            <el-input v-model="formData.description" style="width: 90%" />
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
            <el-button
              size="small"
              type="primary"
              @click="btnOK"
            >确定</el-button>
            <el-button size="small" @click="btnCancel">取消</el-button>
          </el-col>
        </el-row>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import {
  getPermissionList,
  getPermissionDetail,
  addPermission,
  deletePermission,
  updatePermission
} from '@/api/permission'
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
    addPermission(type, pid) {
      this.showDialog = true
      this.formData.type = type
      this.formData.pid = pid
    },
    async editPermission(id) {
      this.formData = await getPermissionDetail(id)
      this.showDialog = true
    },
    async deletePermission(id) {
      // 二次确认
      await this.$confirm('确定删除该权限点吗？')
      // 发送请求
      await deletePermission(id)
      // 提示信息
      this.$message.success('删除成功')
      // 重新加载
      this.getPermissionList()
    },
    async btnOK() {
      try {
        // 表单验证
        await this.$refs.perForm.validate()
        // 根据formData有无id判断是新增还是编辑
        if (this.formData.id) {
          // 编辑
          await updatePermission(this.formData)
        } else {
          // 新增权限点
          await addPermission(this.formData)
        }
        // 提示信息
        this.$message.success('操作成功')
        // 重新加载
        this.getPermissionList()
        // 关闭弹窗
        this.showDialog = false
      } catch (error) {
        console.log(error)
      }
    },
    btnCancel() {
      // 清空表单
      this.formData = {
        name: '',
        code: '',
        description: '',
        enVisible: '1'
      }
      // 清除验证结果
      this.$refs.perForm.resetFields()
      // 关闭弹窗
      this.showDialog = false
    }
  }
}
</script>

<style>
</style>
