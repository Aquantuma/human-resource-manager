<template>
  <div class="test">
    <h1>登录</h1>
    <el-form :model="loginForm" :rules="loginRules">
      <el-form-item label="用户名" prop="username">
        <el-input v-model="loginForm.username" type="text" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="loginForm.password" type="password" />
      </el-form-item>
      <el-form-item label="确认密码" prop="checkPassword">
        <el-input v-model="loginForm.checkPassword" type="password" />
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { validMobilenum } from '@/utils/validate'
export default {
  data() {
    const validateMobile = (rule, value, callback) => {
      const isValid = validMobilenum(value)
      if (isValid) {
        callback()
      } else {
        callback(new Error('请输入有效的手机号'))
      }
    }
    const validCheckPassword = (rule, value, callback) => {
      // console.log(rule, value, callback)
      const isValid = value === this.loginForm.password
      if (isValid) {
        callback()
      } else {
        callback(new Error('两次输入的密码必须一致'))
      }
    }
    return {
      loginForm: {
        username: '',
        password: '',
        checkPassword: ''
      },
      loginRules: {
        username: [
          { required: true, message: '用户名不能为空', trigger: 'blur' },
          { validator: validateMobile, trigger: 'blur' }
        ],
        password: [
          { required: true, message: '密码不能为空', trigger: 'blur' }
        ],
        checkPassword: [
          { required: true, message: '校验密码不能为空', trigger: 'blur' },
          { validator: validCheckPassword, trigger: 'blur' }
        ]
      }
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
