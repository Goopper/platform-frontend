<template>
  <!-- temp view for dev -->
  <main>
    <!-- 返回上一页 -->
    
    <custom-float-back-button />
    <!-- 课程列表 -->
    <div class="course-list">
      <CustomCourseList 
        v-if="courseId && courseName"
        :course-id="courseId"
        :course-name="courseName"
      />
    </div>
    <!-- 展示的课程,章节,任务详情 -->
    <router-view />
  </main>
</template>

<script>
import CustomCourseList from '@/components/course/CustomCourseList.vue';
import CustomFloatBackButton from '@/components/CustomFloatBackButton.vue';
export default {
  name: 'CourseDetailView',
  components: {
    CustomCourseList,
    CustomFloatBackButton,
  },
  data() {
    return {
      courseId: this.$route.query.id,
      courseName:this.$route.query.name,
    };
  },
  created() {

  }
};
</script>

<style lang="scss" scoped>
  main{
    display: flex;
    height: 98%;
  }
  .show-detail{
    flex: 4;
  }
  .course-list{
    width: 20%;
    height: 90%;
    border: 1px solid #e0e0e0;
    > *{
      height: 100%;
    }
  }
</style>