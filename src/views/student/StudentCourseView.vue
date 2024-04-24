<template>
  <div>
    <p class="text-xl font-bold mb-8">
      学习中的课程
    </p>
    <div v-if="learningCourseList.length > 0">
      <custom-horizontal-course-card
        v-for="course in learningCourseList"
        :key="course.id"
        class="cursor-pointer"
        :course="course"
        show-progress
      />
    </div>
    <div
      v-else
      class="mb-8 flex flex-col items-center"
    >
      <v-icon
        size="100px"
        class="text-gray-400 mt-8"
        icon="mdi-pin-off-outline"
      />
      <p class="font-bold text-lg text-gray-400">
        无正在学习的课程
      </p>
    </div>
    <p class="text-xl font-bold mb-8">
      待学习课程
    </p>
    <div v-if="selectableCourseList.length > 0">
      <custom-horizontal-course-card
        v-for="course in selectableCourseList"
        :key="course.id"
        :course="course"
      />
    </div>
    <div
      v-else
      class="mb-8 flex flex-col items-center"
    >
      <v-icon
        size="100px"
        class="text-gray-400 mt-8"
        icon="mdi-projector-screen-off-outline"
      />
      <p class="font-bold text-lg text-gray-400">
        无可学习课程
      </p>
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