<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card>
        <el-tabs>
          <el-tab-pane label="角色管理">
            <!-- 新增角色按钮 -->
            <el-row style="height: 60px">
              <el-button
                type="primary"
                icon="el-icon-plus"
                size="small"
                @click="addNewRole"
              >新增角色</el-button>
            </el-row>
            <!-- 表格 -->
            <el-table :data="rolesList" border>
              <el-table-column label="序号" width="120" type="index">
                <template #default="{$index}">{{ (page.page - 1) * page.pagesize + $index + 1 }}</template>
              </el-table-column>
              <el-table-column label="名称" width="240" prop="name" />
              <el-table-column label="描述" prop="description" />
              <el-table-column label="操作">
                <template #default="scope">
                  <el-button size="small" type="success">分配权限</el-button>
                  <el-button size="small" type="primary" @click="editCurRole(scope.row.id)">编辑</el-button>
                  <el-button size="small" type="danger" @click="handleDelete(scope.row.id)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
            <!-- 分页组件 -->
            <el-row
              type="flex"
              justify="center"
              align="middle"
              style="height: 60px"
            >
              <el-pagination background layout="prev,pager,next" :total="page.total" :page-size="page.pagesize" @current-change="changePage" />
            </el-row>
          </el-tab-pane>
          <el-tab-pane label="公司信息">
            <el-alert
              title="对公司名称、公司地址、营业执照、公司地区的更新，将使得公司资料被重新审核，请谨慎修改"
              type="info"
              show-icon
              :closable="false"
            />
            <el-form label-width="120px" style="margin-top:50px">
              <el-form-item label="公司名称">
                <el-input v-model="formData.name" disabled style="width:400px" />
              </el-form-item>
              <el-form-item label="公司地址">
                <el-input v-model="formData.companyAddress" disabled style="width:400px" />
              </el-form-item>
              <el-form-item label="公司邮箱">
                <el-input v-model="formData.mailbox" disabled style="width:400px" />
              </el-form-item>
              <el-form-item label="备注">
                <el-input v-model="formData.remarks" type="textarea" :rows="3" disabled style="width:400px" />
              </el-form-item>
            </el-form>
          </el-tab-pane>
        </el-tabs>
      </el-card>
      <el-dialog :title="dialogTitle" :visible.sync="showDialog" @close="btnCancel">
        <el-form ref="roleForm" :model="roleForm" label-width="120px" :rules="formRules">
          <el-form-item label="角色名称" prop="name">
            <el-input v-model="roleForm.name" autocomplete="off" />
          </el-form-item>
          <el-form-item label="角色描述" prop="description">
            <el-input v-model="roleForm.description" autocomplete="off" />
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="btnCancel">取 消</el-button>
          <el-button type="primary" @click="btnConfirm">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { getCompanyInfo, getRolesList, delRoleItem, getRoleDetail, updateRoleData, addNewRole } from '@/api/setting'
import { mapGetters } from 'vuex'
export default {
  data() {
    const checkNameRepeat = async(rule, value, callback) => {
      const { rows } = await getRolesList({ page: 1, pagesize: this.page.total })
      if (rows.some(item => item.name === value && item.id !== this.roleForm.id)) {
        callback(new Error('角色名称不能重复'))
      } else {
        callback()
      }
    }
    return {
      formData: {},
      rolesList: [],
      page: {
        page: 1,
        pagesize: 2,
        total: 0
      },
      roleForm: {
        name: '',
        description: ''
      },
      showDialog: false,
      formRules: {
        name: [
          { required: true, message: '角色名称不能为空', trigger: 'blur' },
          { validator: checkNameRepeat, trigger: 'blur' }
        ],
        description: [{ required: true, message: '角色描述不能为空', trigger: 'blur' }]
      }
    }
  },
  computed: {
    ...mapGetters(['companyId']),
    dialogTitle() {
      return this.roleForm.id ? '编辑角色' : '新增角色'
    }
  },
  created() {
    this.handleComanyInfo()
    this.handleRolesList()
  },
  methods: {
    async handleComanyInfo() {
      const res = await getCompanyInfo(this.companyId)
      this.formData = res
    },
    async handleRolesList() {
      const { rows, total } = await getRolesList(this.page)
      this.rolesList = rows
      this.page.total = total
    },
    changePage(val) {
      // console.log(val)
      this.page.page = val
      this.handleRolesList()
    },
    async handleDelete(id) {
      try {
        // 二次校验
        await this.$confirm('是否删除该条角色数据？', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        // 提交删除请求
        await delRoleItem(id)
        // 如果当前页码上仅有一条数据,删除后应向前翻页
        if (this.rolesList.length === 1 && this.page.page > 1) {
          this.page.page--
        }
        // 重新加载角色数据
        this.handleRolesList()
        // 提示删除成功
        this.$message.success('删除完毕')
      } catch (error) {
        console.log(error)
      }
    },
    addNewRole() {
      this.showDialog = true
    },
    async editCurRole(id) {
      // console.log(id)
      const res = await getRoleDetail(id)
      this.roleForm = res
      this.showDialog = true
    },
    btnCancel() {
      // 清理表单
      this.roleForm = { name: '', description: '' }
      // 清理校验（重新打开新增对话框无上一次校验提示）
      this.$refs.roleForm.resetFields()
      this.showDialog = false
    },
    async btnConfirm() {
      // 启用表单校验
      await this.$refs.roleForm.validate()
      // 判断roleForm中的id是否存在
      if (this.roleForm.id) {
        // 发送修改角色数据的请求
        await updateRoleData(this.roleForm)
        this.$message.success('修改成功')
      } else {
        // 发送新增角色数据的请求
        await addNewRole(this.roleForm)
        this.$message.success('新增成功')
      }
      // 更新角色列表数据
      this.handleRolesList()
      this.showDialog = false
    }
  }
}
</script>

<style>
</style>
