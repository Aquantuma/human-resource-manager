<template>
  <el-dialog title="分配角色" :visible="showRoleDialog" @close="btnCancel">
    <el-checkbox-group v-model="checkList">
      <!-- 选项 -->
      <el-checkbox v-for="item in roleList" :key="item.id" :label="item.id">
        {{ item.name }}
      </el-checkbox>
    </el-checkbox-group>
    <el-row slot="footer" type="flex" justify="center">
      <el-col :span="6">
        <el-button type="primary" size="small" @click="btnConfirm">确定</el-button>
        <el-button size="small" @click="btnCancel">取消</el-button>
      </el-col>
    </el-row>
  </el-dialog>
</template>

<script>
import { getRolesList } from '@/api/setting'
import { getUserDetail } from '@/api/user'
export default {
  props: {
    showRoleDialog: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      roleList: [],
      checkList: []
    }
  },
  created() {
    this.getRoleList()
  },
  methods: {
    async getRoleList() {
      const { rows } = await getRolesList()
      this.roleList = rows
    },
    async getUserDetailById(id) {
      const res = await getUserDetail(id)
      this.checkList = res.roleIds
    },
    btnConfirm() {},
    btnCancel() {
      this.$emit('update:showRoleDialog', false)
    }
  }
}
</script>

<style>

</style>
