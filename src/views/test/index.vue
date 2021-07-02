<template>
  <div>
    <h1>插槽测试页</h1>
    <myComponent :mydata="list">
      <!-- 插槽旧版语法 -->
      <!-- <div slot="before" slot-scope="scope">
        姓名：{{ scope.data.name }}
      </div>
      <template slot="after" slot-scope="scope">
        <div>
          年龄：{{ scope.data.age }}
        </div>
      </template>
      <div slot="default" slot-scope="scope">
        城市：{{ scope.data.city }}
      </div> -->

      <!-- 插槽新版语法 -->
      <template v-slot:before="scope">
        姓名：{{ scope.data.name }}
      </template>
      <template #after="scope">
        年龄：{{ scope.data.age }}
      </template>
      <template #default="scope">
        城市：{{ scope.data.city }}
      </template>
    </myComponent>
  </div>
</template>

<script>
import myComponent from './components/myComponent.vue'
export default {
  components: {
    myComponent
  },
  data() {
    return {
      list: [
        { name: '张三', age: 20, city: '广州' },
        { name: '李四', age: 22, city: '深圳' }
      ]
    }
  }
}
</script>

<style>

</style>
