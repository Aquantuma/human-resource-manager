<template>
  <!-- visible也可以设置一个sync修饰符 但是这里不能设置-->
  <!-- el-dialog 中的 visible.sync这个修饰符 是给el-dialog组件设置的 也就是 组件里 会进行一个事件触发
    this.$emit("update:visible", false)
    因为我们这里的visible后面的值是一个 props属性 props 是父组件的属性 是在子组件中只读的
  -->
  <el-dialog title="新增员工" :visible="showDialog" @close="btnCancel">
    <!-- 表单 -->
    <el-form ref="employeeForm" label-width="120px" :model="formData" :rules="formRules">
      <el-form-item label="姓名" prop="username">
        <el-input
          v-model="formData.username"
          style="width: 90%"
          placeholder="请输入姓名"
        />
      </el-form-item>
      <el-form-item label="手机" prop="mobile">
        <el-input
          v-model="formData.mobile"
          style="width: 90%"
          placeholder="请输入手机号"
        />
      </el-form-item>
      <el-form-item label="入职时间" prop="timeOfEntry">
        <el-date-picker
          v-model="formData.timeOfEntry"
          style="width: 90%"
          placeholder="请选择日期"
        />
      </el-form-item>
      <el-form-item label="聘用形式" prop="formOfEmployment">
        <el-select
          v-model="formData.formOfEmployment"
          style="width: 90%"
          placeholder="请选择"
        >
          <el-option
            v-for="item in employmentFormat.hireType"
            :key="item.id"
            :label="item.value"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="工号" prop="workNumber">
        <el-input
          v-model="formData.workNumber"
          style="width: 90%"
          placeholder="请输入工号"
        />
      </el-form-item>
      <el-form-item label="部门" prop="departmentName">
        <el-input
          v-model="formData.departmentName"
          style="width: 90%"
          placeholder="请选择部门"
          @focus="handleFocus"
        />
        <el-tree
          v-if="showTree"
          :data="treeList"
          :props="{ label: 'name' }"
          :default-expand-all="true"
          @node-click="chooseDepts"
        />
      </el-form-item>
      <el-form-item label="转正时间" prop="correctionTime">
        <el-date-picker
          v-model="formData.correctionTime"
          style="width: 90%"
          placeholder="请选择日期"
        />
      </el-form-item>
    </el-form>
    <!-- 底部按钮 -->
    <template #footer>
      <el-row type="flex" justify="center" align="middle">
        <el-col :span="6">
          <el-button type="primary" size="small" @click="btnConfirm">确定</el-button>
          <el-button size="small" @click="btnCancel">取消</el-button>
        </el-col>
      </el-row>
    </template>
  </el-dialog>
</template>

<script>
import { getDepartments } from '@/api/departments'
import { listToTreeData } from '@/utils/index'
import employmentFormat from '@/api/constant/employees'
import { addEmployee } from '@/api/employees'
export default {
  props: {
    showDialog: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      formData: {
        username: '',
        mobile: '',
        timeOfEntry: '',
        formOfEmployment: '',
        workNumber: '',
        departmentName: '',
        correctionTime: ''
      },
      formRules: {
        username: [
          { required: true, trigger: 'blur', message: '用户名不能为空' },
          { min: 1, max: 4, message: '用户名为1-4位' }
        ],
        mobile: [
          { required: true, trigger: 'blur', message: '手机号不能为空' },
          {
            pattern: /^1[23578]\d{9}$/,
            trigger: 'blur',
            message: '手机号格式不正确'
          }
        ],
        timeOfEntry: [{ required: true, trigger: 'blur', message: '入职时间' }],
        formOfEmployment: [
          { required: true, trigger: 'blur', message: '聘用形式不能为空' }
        ],
        workNumber: [
          { required: true, trigger: 'blur', message: '工号不能为空' }
        ],
        departmentName: [
          { required: true, trigger: 'change', message: '部门不能为空' }
        ]
      },
      treeList: [],
      showTree: false,
      employmentFormat
    }
  },
  methods: {
    async handleFocus() {
      const { depts } = await getDepartments()
      this.treeList = listToTreeData(depts, '')
      this.showTree = true
    },
    chooseDepts(data) {
      console.log(data.name)
      this.formData.departmentName = data.name
      this.showTree = false
    },
    async btnConfirm() {
      // 验证表单
      await this.$refs.employeeForm.validate()
      // 发起添加员工数据的请求
      await addEmployee(this.formData)
      // 提示添加成功
      this.$message('添加成功')
      // 父组件重新加载员工列表
      this.$parent.handleEmployeesList()
      // 关闭对话框
      this.$parent.showDialog = false
    },
    btnCancel() {
      // 清空表单数据和表单校验的提示
      this.$refs.employeeForm.resetFields()
      // 关闭对话框
      this.$parent.showDialog = false
    }
  }
}
</script>

<style scoped>
.el-tree {
  position: absolute;
  z-index: 10;
  width: 90%;
  height: 200px;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  overflow: auto;
}
</style>
