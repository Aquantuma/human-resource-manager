<template>
  <UploadExcel :on-success="uploadExcel" />
</template>

<script>
import { importEmployees } from '@/api/employees'
export default {
  methods: {
    async uploadExcel(data) {
      // 表头信息数组 data.header
      // 表格行信息数组 data.results
      //   console.log(data.header, data.results)
      // 定义中英文键名转换的字典
      const dict = {
        入职日期: 'timeOfEntry',
        手机号: 'mobile',
        姓名: 'username',
        转正日期: 'correctionTime',
        工号: 'workNumber'
      }
      const newData = data.results.map((item) => {
        const newEmployee = {}
        Object.keys(item).forEach((key) => {
          // Excel导出的时间值与时间戳不同，需要转换
          if (key === '入职日期' || key === '转正日期') {
            item[key] = new Date(this.correctExcelTime(item[key], '/'))
          }
          newEmployee[dict[key]] = item[key]
        })
        return newEmployee
      })
      console.log(newData)
      //   发请求添加数据
      await importEmployees(newData)
      this.$message.success('导入成功')
      //   返回到上一页
      this.$router.back()
    },
    correctExcelTime(num, char) {
      const time = new Date((num - 1) * 24 * 3600000 + 1)
      time.setYear(time.getFullYear() - 70)
      const year = time.getFullYear() + ''
      const month = time.getMonth() + 1 + ''
      const date = time.getDate() - 1 + ''
      if (char && char.length === 1) {
        return year + char + month + char + date
      }
      return (
        year +
        (month < 10 ? '0' + month : month) +
        (date < 10 ? '0' + date : date)
      )
    }
  }
}
</script>

<style>
</style>
