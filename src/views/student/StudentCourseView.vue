<template>
  <div>
    <div class="flex items-center justify-between">
      <p class="text-xl font-bold mb-6">
        学习中的课程
      </p>
      <div class="flex items-center w-[50%] min-w-[360px]">
        <v-text-field
          v-model="learningCourseName"
          class="mr-4"
          variant="outlined"
          label="课程名称"
          density="compact"
        />
        <v-select
          v-model="learningCourseTypeId"
          class="w-[25%]"
          flat
          :items="courseTypeList"
          item-title="name"
          item-value="id"
          no-data-text="没有课程类型"
          density="compact"
          label="课程类型"
          variant="outlined"
        >
          <template #append>
            <v-btn
              variant="flat"
              @click="searchLearningCourse"
            >
              搜索
            </v-btn>
          </template>
        </v-select>
      </div>
    </div>
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
    <div class="flex items-center justify-between">
      <p class="text-xl font-bold mb-6">
        待学习课程
      </p>
      <div class="flex items-center w-[50%] min-w-[360px]">
        <v-text-field
          v-model="selectableCourseName"
          class="mr-4"
          variant="outlined"
          label="课程名称"
          density="compact"
        />
        <v-select
          v-model="selectableCourseTypeId"
          class="w-[25%]"
          flat
          :items="courseTypeList"
          item-title="name"
          item-value="id"
          no-data-text="没有课程类型"
          density="compact"
          label="课程类型"
          variant="outlined"
        >
          <template #append>
            <v-btn
              variant="flat"
              @click="searchSelectableCourse"
            >
              搜索
            </v-btn>
          </template>
        </v-select>
      </div>
    </div>
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
import { getCourseType } from '@/api/course';
import { getAllLearningCourse, getAllSelectableCourses } from '@/api/student';
import CustomHorizontalCourseCard from '@/components/CustomHorizontalCourseCard.vue';

export default {
  name: 'StudentCourseView',
  components: {
    CustomHorizontalCourseCard
  },
  data: () => ({
    learningCourseList: [],
    selectableCourseList: [],
    courseTypeList: [
      {
        name: '全部',
        id: null
      }
    ],
    learningCourseTypeId: null,
    learningCourseName: '',
    selectableCourseTypeId: null,
    selectableCourseName: '',
    loading: true,
  }),
  created() {
    this.searchLearningCourse();
    this.searchSelectableCourse();
    getCourseType().then(res => {
      if (res) {
        this.courseTypeList = this.courseTypeList.concat(res.data);
      }
    });
  },
  methods: {
    async searchLearningCourse() {
      this.loading = true;
      const res = await getAllLearningCourse(
        this.learningCourseTypeId,
        this.learningCourseName
      );
      if (res) {
        this.learningCourseList = res.data;
      }
      this.loading = false;
    },
    async searchSelectableCourse() {
      this.loading = true;
      const res = await getAllSelectableCourses(
        this.selectableCourseTypeId,
        this.selectableCourseName
      );
      if (res) {
        this.selectableCourseList = res.data;
      }
      this.loading = false;
    },
  }
};
</script>

<style lang="scss" scoped>

</style>