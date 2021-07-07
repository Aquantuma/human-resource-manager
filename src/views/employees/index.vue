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
        <el-table v-loading="loading" border :data="employeesList">
          <el-table-column label="序号" sortable="" type="index" />
          <el-table-column label="姓名" sortable="" prop="username" />
          <el-table-column label="工号" sortable="" prop="workNumber" />
          <el-table-column
            label="聘用形式"
            sortable=""
            prop="formOfEmployment"
            :formatter="formatFormEmployment"
          />
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
        <el-row
          type="flex"
          justify="center"
          align="middle"
          style="height: 60px"
        >
          <el-pagination
            layout="total,sizes,prev,pager,next,jumper"
            :total="page.total"
            :page-size="page.size"
            :page-sizes="[5, 10, 20, 30]"
            @current-change="pageChange"
            @size-change="sizeChange"
          />
        </el-row>
      </el-card>
    </div>
  </div>
</template>

<script>
// import PageTools from '@/components/PageTools'
import { getEmployeesList } from '@/api/employees'
import employmentFormat from '@/api/constant/employees'
export default {
  /* components: {
    PageTools
  } */
  data() {
    return {
      employeesList: [],
      page: {
        page: 1,
        size: 5,
        total: 0
      },
      loading: false
    }
  },
  created() {
    this.handleEmployeesList()
  },
  methods: {
    async handleEmployeesList() {
      // 开始调用获取员工列表方法时启动loading动画
      this.loading = true
      const { rows, total } = await getEmployeesList(this.page)
      console.log(rows, total)
      this.employeesList = rows
      this.page.total = total
      // 结束调用获取员工列表方式时关闭loading动画
      this.loading = false
    },
    pageChange(newpage) {
      // 更新数据中的当前页码
      this.page.page = newpage
      // 重新获取员工数据列表
      this.handleEmployeesList()
    },
    sizeChange(newsize) {
      // 更新数据中的页容量
      this.page.size = newsize
      // 重新获取员工数据列表
      this.handleEmployeesList()
    },
    formatFormEmployment(row, col, cellVal) {
      // console.log(employmentFormat)
      const obj = employmentFormat.hireType.find(item => item.id === cellVal)
      return obj ? obj.value : '未知聘用形式'
    }
  }
}
</script>

<style>
</style>
