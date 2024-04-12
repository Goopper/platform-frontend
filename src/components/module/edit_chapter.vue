<script>
export default {

}
</script>
<template>
  <div id="edit_chapter">
    <div>
      <p style="margin-top: -24px;">章节名称<span style="color: red;">*</span></p>
      <v-text-field placeholder="课程名称" variant="outlined" density="compact" :rules="notEmpty"></v-text-field>
    </div>
    <div style="align-items: normal;">
      <p>课程描述<span style="color: red;">*</span></p>
      <v-textarea placeholder="课程内容" variant="outlined" :rules="notEmpty"></v-textarea>
    </div>
  </div>
</template>
<style scoped>
#edit_chapter>div {
  display: flex;
  margin-top: auto;
  align-items: center;
  margin: 24px;
}
</style>