<template>
  <div class="dashboard-container">
    <div class="app-container">
      <PageTools :show-before="true">
        <template #before>一共{{ page.total }}条数据</template>
        <template #after>
          <el-button type="warning" size="small">导入</el-button>
          <el-button type="danger" size="small">导出</el-button>
          <el-button type="primary" size="small">新增员工</el-button>
        </template>
      </PageTools>
      <!-- 放置表格和分页 -->
      <el-card>
        <el-table border :data="employeesList">
          <el-table-column label="序号" sortable="" type="index" />
          <el-table-column label="姓名" sortable="" prop="username" />
          <el-table-column label="工号" sortable="" prop="workNumber" />
          <el-table-column label="聘用形式" sortable="" prop="formOfEmployment" />
          <el-table-column label="部门" sortable="" prop="departmentName" />
          <el-table-column label="入职时间" sortable="" prop="timeOfEntry" />
          <el-table-column label="账户状态" sortable="" prop="enableState" />
          <el-table-column label="操作" sortable="" fixed="right" width="280">
            <template>
              <el-button size="small" type="text">查看</el-button>
              <el-button size="small" type="text">角色</el-button>
              <el-button size="small" type="text">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页组件 -->
        <el-row type="flex" justify="center" align="middle" style="height:60px">
          <el-pagination layout="prev,pager,next" />
        </el-row>
      </el-card>
    </div>
  </div>
</template>

<script>
// import PageTools from '@/components/PageTools'
import { getEmployeesList } from '@/api/employees'
export default {
  /* components: {
    PageTools
  } */
  data() {
    return {
      employeesList: [],
      page: {
        page: 1,
        size: 10,
        total: 0
      }
    }
  },
  created() {
    this.handleEmployeesList()
  },
  methods: {
    async handleEmployeesList() {
      const { rows, total } = await getEmployeesList(this.page)
      console.log(rows, total)
      this.employeesList = rows
      this.page.total = total
    }
  }
}
</script>

<style>

</style>
