<template>
  <!-- temp view for dev -->
  <main>
    <!-- 返回上一页 -->

    <custom-float-back-button 
      :back-url="'/course/teacher'"
    />
    <!-- 课程列表 -->
    <div class="course-list">
      <CustomCourseStructureList
        v-if="courseId && courseName"
        :course-id="courseId"
        :course-name="courseName"
      />
    </div>
    <!-- 展示的课程,章节,任务详情 -->
    <div class="show-detail">
      <router-view />
    </div>
  </main>
</template>

<script>
import { getCourseInfo } from '@/api/course';
import CustomCourseStructureList from '@/components/course/CustomCourseStructureList.vue';
import CustomFloatBackButton from '@/components/CustomFloatBackButton.vue';
export default {
  name: 'CourseDetailView',
  components: {
    CustomCourseStructureList,
    CustomFloatBackButton,
  },
  data() {
    return {
      courseId: null,
      courseName: null,
    };
  },
created() {
   this.courseId = this.$route.params.id;
   getCourseInfo(this.courseId).then((res) => {
     this.courseName=res.data.name;
   });   
  },
  methods: {
  },
};
</script>

<style lang="scss" scoped>
main {
  display: flex;
  height: 98%;
}
.show-detail {
  flex: 4;
}
.course-list {
  width: 20%;
  height: 98%;
  border: 1px solid #e0e0e0;
  > * {
    height: 100%;
  }
}
</style>