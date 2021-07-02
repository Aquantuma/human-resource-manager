<template>
  <div>
    <div v-for="(item, index) in mydata" :key="index">
      <slot name="before" :data="item" />
      <slot name="after" :data="item" />
      <slot :data="item" />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    mydata: {
      type: Array,
      required: true
    }
  }
}
</script>

<style>
</style>
