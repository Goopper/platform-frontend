<template>
  <div>
    Student's Course List
    <br>
    <router-link to="create">
      <a style="color:red">
        Create
      </a>
    </router-link>
    <br>
    <router-link to="detail">
      <a style="color:red">
        Detail
      </a>
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'StudentCourseView',
};
</script>

<style lang="scss" scoped>

</style>