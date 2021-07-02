<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card class="tree-card">
        <!-- 用了一个行列布局 -->
        <TreeTools :tree-data="company" :is-title="true" />
        <hr>
        <el-tree
          :data="treeList"
          :default-expand-all="true"
          :props="{ label: 'name' }"
        >
          <template #default="scope">
            <TreeTools :tree-data="scope.data" :is-title="false" />
          </template>
        </el-tree>
      </el-card>
    </div>
  </div>
</template>

<script>
import TreeTools from './components/tree-tools.vue'
import { getDepartments } from '@/api/departments'
import { listToTreeData } from '@/utils/index'
export default {
  components: {
    TreeTools
  },
  data() {
    return {
      company: {},
      treeList: []
    }
  },
  async created() {
    const res = await getDepartments()
    console.log(res)
    this.company = { name: res.companyName, manager: '负责人' }
    console.log(res.depts)
    this.treeList = listToTreeData(res.depts, '')
  }
}
</script>

<style scoped>
.tree-card {
  padding: 30px 140px;
  font-size: 14px;
}
</style>
