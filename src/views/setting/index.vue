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
              >新增角色</el-button>
            </el-row>
            <!-- 表格 -->
            <el-table :data="rolesList" border>
              <el-table-column label="序号" width="120" type="index" />
              <el-table-column label="名称" width="240" prop="name" />
              <el-table-column label="描述" prop="description" />
              <el-table-column label="操作">
                <template #default="scope">
                  <el-button size="small" type="success">分配权限</el-button>
                  <el-button size="small" type="primary">编辑</el-button>
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
    </div>
  </div>
</template>

<script>
import { getCompanyInfo, getRolesList, delRoleItem } from '@/api/setting'
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      formData: {},
      rolesList: [],
      page: {
        page: 1,
        pagesize: 2,
        total: 0
      }
    }
  },
  computed: {
    ...mapGetters(['companyId'])
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
      console.log(val)
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
        // 重新加载角色数据
        this.handleRolesList()
        // 提示删除成功
        this.$message.success('删除完毕')
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>

<style>
</style>
