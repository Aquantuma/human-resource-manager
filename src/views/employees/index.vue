<template>
  <div class="dashboard-container">
    <div class="app-container">
      <PageTools :show-before="true">
        <template #before>一共{{ page.total }}条数据</template>
        <template #after>
          <el-button type="warning" size="small" @click="$router.push('/import')">导入</el-button>
          <el-button type="danger" size="small" @click="exportExcel">导出</el-button>
          <el-button type="primary" size="small" @click="showDialog=true">新增员工</el-button>
        </template>
      </PageTools>
      <!-- 放置表格和分页 -->
      <el-card>
        <el-table v-loading="loading" border :data="employeesList">
          <el-table-column label="序号" sortable="" type="index" />
          <el-table-column label="头像" prop="staffPhoto" align="center">
            <template #default="{row}">
              <img v-imgerr="require('@/assets/common/head.jpg')" :src="row.staffPhoto" class="portrait">
            </template>
          </el-table-column>
          <el-table-column label="姓名" sortable="" prop="username" />
          <el-table-column label="工号" sortable="" prop="workNumber" />
          <el-table-column
            label="聘用形式"
            sortable=""
            prop="formOfEmployment"
            :formatter="formatFormEmployment"
          />
          <el-table-column label="部门" sortable="" prop="departmentName" />
          <el-table-column label="入职时间" sortable="" prop="timeOfEntry">
            <template #default="scope">
              {{ scope.row.timeOfEntry | formatDate }}
            </template>
          </el-table-column>
          <el-table-column label="账户状态" sortable="" prop="enableState">
            <template #default="{ row }">
              <!-- 只需绑定数据，无需监听input事件 -->
              <el-switch :value="row.enableState === 1" />
            </template>
          </el-table-column>
          <el-table-column label="操作" sortable="" fixed="right" width="280">
            <template #default="scope">
              <el-button size="small" type="text" @click="$router.push(`/employees/detail/${scope.row.id}`)">查看</el-button>
              <el-button size="small" type="text">角色</el-button>
              <el-button size="small" type="text" @click="handleDelete(scope.row.id)">删除</el-button>
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
      <AddEmployee :show-dialog="showDialog" />
    </div>
  </div>
</template>

<script>
// import PageTools from '@/components/PageTools'
import { getEmployeesList, deleteEmployee } from '@/api/employees'
import employmentFormat from '@/api/constant/employees'
import { formatDate } from '@/filters'
// 这里引入默认加载，不使用代码也会出现在页面上
// import { export_json_to_excel } from '@/vendor/Export2Excel'
import AddEmployee from '@/views/employees/components/add-employee.vue'
export default {
  components: {
    AddEmployee
  },
  data() {
    return {
      employeesList: [],
      page: {
        page: 1,
        size: 5,
        total: 0
      },
      loading: false,
      showDialog: false
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
      const obj = employmentFormat.hireType.find((item) => item.id === Number(cellVal))
      return obj ? obj.value : '未知聘用形式'
    },
    async exportExcel() {
      // 使用import函数加载json转excel的函数
      // 点击导出按钮时才会载入此函数
      const { export_json_to_excel } = await import('@/vendor/Export2Excel')
      console.log(export_json_to_excel)
      // 导出函数需传入带有header和data键名的对象，且均为数组
      // export_json_to_excel({
      //   header: ['姓名', '年龄', '性别'],
      //   data: [
      //     ['Tom', 20, '男'],
      //     ['Jane', 18, '女'],
      //     ['Mick', 22, '男']
      //   ]
      // })

      // 获取全部的员工数据
      const { rows } = await getEmployeesList({ page: 1, size: this.page.total })
      // console.log(rows)

      // 定义中英文键名互转的字典
      const dict = {
        '姓名': 'username',
        '手机号': 'mobile',
        '入职日期': 'timeOfEntry',
        '聘用形式': 'formOfEmployment',
        '转正日期': 'correctionTime',
        '工号': 'workNumber',
        '部门': 'departmentName'
      }
      // 按照dict键名的顺序将其存入header数组
      const header = Object.keys(dict)
      // 将员工数据转换成二维数组
      const data = rows.map(item => {
        const rowArr = []
        header.forEach(key => {
          // 将过滤器用作函数，处理接口返回的日期格式
          if (key === '入职日期' || key === '转正日期') {
            item[dict[key]] = formatDate(item[dict[key]])
          }
          if (key === '聘用形式') {
            const obj = employmentFormat.hireType.find(val => val.id === item[dict[key]])
            item[dict[key]] = obj ? obj.value : '未知聘用形式'
          }
          rowArr.push(item[dict[key]])
        })
        return rowArr
      })
      console.log(data)
      // 调用json转excel的函数
      export_json_to_excel({
        header,
        data,
        filename: '员工数据'
      })
    },
    async handleDelete(id) {
      // 询问是否删除
      await this.$confirm('确认要删除改员工吗?')
      // 发起删除请求
      await deleteEmployee(id)
      // 当前页(非第一页)只剩一条数据时，删除后应向前翻页
      if (this.employeesList.length === 1 && this.page.page > 1) {
        this.page.page--
      }
      // 提示用户删除完成
      this.$message.success('删除成功')
      // 重新加载员工列表
      this.handleEmployeesList()
    }
  }
}
</script>

<style lang="scss" scoped>
.el-table{
  .cell{
    .portrait{
      width: 90%;
      object-fit: cover;
      border-radius: 50%;
    }
  }
}
</style>
