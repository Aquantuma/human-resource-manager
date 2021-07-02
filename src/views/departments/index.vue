<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card class="tree-card">
        <!-- 用了一个行列布局 -->
        <el-row
          type="flex"
          justify="space-between"
          align="middle"
          style="height: 40px"
        >
          <el-col>
            <strong><i class="el-icon-s-home" />
              江苏传智播客教育科技股份有限公司</strong>
          </el-col>
          <el-col :span="4">
            <el-row type="flex" justify="end">
              <!-- 两个内容 -->
              <el-col>负责人</el-col>
              <el-col>
                <!-- 下拉菜单 element -->
                <el-dropdown>
                  <span> 操作<i class="el-icon-arrow-down" /> </span>
                  <!-- 下拉菜单 -->
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>添加子部门</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
        <hr>
        <el-tree
          :data="treeList"
          :default-expand-all="true"
          :props="{ label: 'name' }"
        >
          <template #default="scope">
            <el-row
              type="flex"
              justify="space-between"
              align="middle"
              style="height: 40px; width: 100%"
            >
              <el-col>
                <span>{{ scope.data.name }}</span>
              </el-col>
              <el-col :span="4">
                <el-row type="flex" justify="end">
                  <!-- 两个内容 -->
                  <el-col>{{ scope.data.manager }}</el-col>
                  <el-col>
                    <!-- 下拉菜单 element -->
                    <el-dropdown>
                      <span> 操作<i class="el-icon-arrow-down" /> </span>
                      <!-- 下拉菜单 -->
                      <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item>添加子部门</el-dropdown-item>
                      </el-dropdown-menu>
                    </el-dropdown>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
          </template>
        </el-tree>
      </el-card>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      treeList: [
        {
          id: 1,
          name: '总裁办',
          manager: '曹操',
          children: [
            { id: 5, name: 'CEO', manager: '曹丕' },
            { id: 6, name: '总经理', manager: '曹植' }
          ]
        },
        {
          id: 2,
          name: '财务部',
          manager: '刘备',
          children: [
            { id: 7, name: '出纳', manager: '赵云' },
            { id: 8, name: '会计', manager: '诸葛亮' }
          ]
        },
        {
          id: 3,
          name: '技术部',
          manager: '孙权',
          children: [
            { id: 9, name: 'JAVA', manager: '周瑜' },
            { id: 10, name: '前端', manager: '陆逊' }
          ]
        },
        {
          id: 4,
          name: '运营部',
          manager: '司马懿',
          children: [
            { id: 11, name: '新媒体', manager: '司马昭' },
            { id: 12, name: '宣传部', manager: '司马炎' }
          ]
        }
      ]
    }
  }
}
</script>

<style scoped>
.tree-card {
  padding: 30px 140px;
  font-size: 14px;
}
</style>
