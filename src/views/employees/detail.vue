<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card>
        <el-tabs>
          <el-tab-pane label="登录账户设置">
            <!-- 放置表单 -->
            <el-form label-width="120px" style="margin-left: 120px; margin-top:30px" :model="formData" :rules="formRules">
              <el-form-item label="姓名:" prop="username">
                <el-input v-model="formData.username" style="width:300px" />
              </el-form-item>
              <el-form-item label="密码:" prop="newPassword">
                <el-input v-model="formData.newPassword" style="width:300px" type="password" />
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="updateAccountInfo">更新</el-button>
              </el-form-item>
            </el-form>
          </el-tab-pane>
          <el-tab-pane label="个人详情">
            <UserInfo />
          </el-tab-pane>
          <el-tab-pane label="岗位信息">
            <JobInfo />
          </el-tab-pane>
        </el-tabs>
      </el-card>
    </div>
  </div>
</template>

<script>
import { getUserDetail } from '@/api/user'
import { saveUserDetail } from '@/api/employees'
import UserInfo from './components/user-info.vue'
import JobInfo from './components/job-info.vue'
export default {
  components: {
    UserInfo,
    JobInfo
  },
  data() {
    return {
      formData: {
        username: '',
        newPassword: ''
      },
      formRules: {
        username: [
          { required: true, message: '该项不能为空', trigger: 'blur' }
        ],
        newPassword: [
          { required: true, message: '该项不能为空', trigger: 'blur' }
        ]
      },
      userId: this.$route.params.id
    }
  },
  created() {
    this.handleUserDetail()
  },
  methods: {
    async handleUserDetail() {
      const res = await getUserDetail(this.userId)
      this.formData = res
    },
    async updateAccountInfo() {
    //   console.log({ ...this.formData, password: this.formData.newPassword })
      await saveUserDetail({ ...this.formData, password: this.formData.newPassword })
      this.$message.success('修改成功')
    }
  }
}
</script>

<style>

</style>
