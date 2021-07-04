<template>
  <div class="dashboard-container">
    <div class="app-container">
      <PageTools :show-before="true">
        <template #before>一共166条数据</template>
        <template #after>
          <el-button type="warning" size="small">导入</el-button>
          <el-button type="danger" size="small">导出</el-button>
          <el-button type="primary" size="small">新增员工</el-button>
        </template>
      </PageTools>
    </div>
  </div>
</template>

<script>
// import PageTools from '@/components/PageTools'
export default {
  /* components: {
    PageTools
  } */
}
</script>

<style>

</style>
