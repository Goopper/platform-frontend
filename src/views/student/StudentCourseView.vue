<template>
  <div>
    <p class="text-xl font-bold mb-8">
      学习中的课程
    </p>
    <div>
      <custom-horizontal-course-card
        v-for="course in learningCourseList"
        :key="course.id"
        class="cursor-pointer"
        :course="course"
        show-progress
      />
    </div>
    <p class="text-xl font-bold mb-8">
      待学习课程
    </p>
    <div>
      <custom-horizontal-course-card
        v-for="course in selectableCourseList"
        :key="course.id"
        :course="course"
      />
    </div>
  </div>
</template>

<script>
import { getAllLearningCourse, getAllSelectableCourses } from '@/api/student';
import CustomHorizontalCourseCard from '@/components/CustomHorizontalCourseCard.vue';

export default {
  name: 'StudentCourseView',
  components: {
    CustomHorizontalCourseCard
  },
  data: () => ({
    learningCourseList: [],
    selectableCourseList: []
  }),
  created() {
    getAllLearningCourse().then(res => {
      this.learningCourseList = res.data;
    });
    getAllSelectableCourses().then(res => {
      this.selectableCourseList = res.data;
    });
  }
};
</script>

<style lang="scss" scoped>

</style>