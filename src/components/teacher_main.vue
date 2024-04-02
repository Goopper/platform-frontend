<script>
import Header from './module/header.vue'
import Teacher_main from './module/teacher_main.vue';
import Teacher_cource from './module/teacher_cource.vue'
export default {
  components: {
    Header,
    Teacher_main,
    Teacher_cource
  }
}
</script>
<template>
  <div id="teacher_main">
    <Header />
    <Teacher_main />
    <!-- <Teacher_cource/> -->
  </div>
</template>
<style>
#teacher_main {
  width: 100%;
  height: 100%;
  background-color: #FAFAFA;
}

#cource {
  margin: 24px 128px 0 128px;
}

#choose_cource {
  display: flex;
}
</style>