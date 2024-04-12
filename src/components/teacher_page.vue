<!-- 教师 -->
<script>
import base_header from './base_module/base_teacher_header.vue'
export default {
  components: { base_header },
}
</script>
<template>
  <base_header />
  <div id="teacher_main">
    <router-view></router-view>
  </div>
</template>
<style scoped>
#teacher_main {
  width: 100%;
  height: 100%;
  background-color: #FAFAFA;
}
</style>