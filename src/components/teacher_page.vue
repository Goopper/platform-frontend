<script>
import Header from './module/header.vue'
import Teacher_main from './module/teacher_main.vue';
import Teacher_cource from './module/teacher_cource.vue'
import Edit_cource from './module/cource_page/edit_blank.vue'
import Cource_details from './module/cource_page/cource_details.vue';
import Cource_blank from './module/cource_page/cource_blank.vue';
export default {
  components: {
    Header,
    Teacher_main,
    Teacher_cource,
    Edit_cource,
    Cource_details,
    Cource_blank
  }
}
</script>
<template>
  <div id="teacher_main">
    <Header />
    <!-- <Teacher_main /> -->
    <!-- <Teacher_cource/> -->
    <!-- <Edit_cource /> -->
    <!-- <Cource_details/> -->
    <Cource_blank/>
  </div>
</template>
<style scoped>
#teacher_main {
  width: 100%;
  height: 100%;
  background-color: #FAFAFA;
}

</style>