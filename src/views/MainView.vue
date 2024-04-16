<script>
import page_header from './module/widgets/header.vue'
import teacher_main from './module/sub_page/teacher_main.vue';
import teacher_cource from './module/sub_page/teacher_course.vue'
import edit_blank from './module/sub_page/edit_blank.vue'
import course_blank from './module/sub_page/course_blank.vue';
export default {
  components: {
    page_header,
    teacher_main,
    teacher_cource,
    edit_blank,
    course_blank
  }
}
</script>
<template>
  <div id="teacher_main">
    
    <!-- 顶部导航栏 -->
    <page_header />
    
    <!-- 老师主页 -->
    <!-- <teacher_main /> -->
    
    <!-- 老师课程页面 -->
    <!-- <teacher_cource/> -->
    
    <!-- 编辑课程界面 -->
    <!-- <edit_blank /> -->

    <!-- 课程界面 -->
    <course_blank/>
  </div>
</template>
<style scoped>
#teacher_main {
  width: 100%;
  height: 100%;
  background-color: #FAFAFA;
}

</style>