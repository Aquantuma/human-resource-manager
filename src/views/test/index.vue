<template>
  <div>
    <el-tree
      :data="treeList"
      :default-expand-all="true"
      :props="{ label: 'name' }"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      treeList: [
        {
          id: 1,
          name: '服装',
          children: [
            {
              id: 5,
              name: '男装'
            },
            {
              id: 6,
              name: '女装'
            }
          ]
        },
        {
          id: 2,
          name: '数码',
          children: [
            {
              id: 7,
              name: '电脑'
            },
            {
              id: 8,
              name: '手机'
            }
          ]
        },
        {
          id: 3,
          name: '健康',
          children: [
            {
              id: 9,
              name: '蛋白粉'
            },
            {
              id: 10,
              name: '维生素'
            }
          ]
        },
        {
          id: 4,
          name: '餐饮',
          children: [
            {
              id: 11,
              name: '牛奶'
            },
            {
              id: 12,
              name: '面包'
            }
          ]
        }
      ]
    }
  }
}
</script>

<style>
</style>
