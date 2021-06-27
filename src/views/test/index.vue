<template>
  <div class="test">
    <h1>登录</h1>
    <el-form :model="loginForm" :rules="loginRules" label-width="100px">
      <el-form-item label="用户名" prop="username">
        <el-input v-model="loginForm.username" type="text" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="loginForm.password" type="password" />
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loginForm: {
        username: '',
        password: ''
      },
      loginRules: {
        username: [
          { required: true, message: '用户名不能为空', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '密码不能为空', trigger: 'blur' }
        ]
      }
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
