<script>
import Header from './module/header.vue'
import Teacher_main from './module/teacher_main.vue';
import Teacher_cource from './module/teacher_cource.vue'
import Edit_cource from './module/cource_page/blank_edit.vue'
export default {
  components: {
    Header,
    Teacher_main,
    Teacher_cource,
    Edit_cource
  }
}
</script>
<template>
  <div id="teacher_main">
    <Header />
    <!-- <Teacher_main /> -->
    <!-- <Teacher_cource/> -->
    <Edit_cource />
  </div>
</template>
<style scoped>
#teacher_main {
  width: 100%;
  height: 100%;
  background-color: #FAFAFA;
}

</style>