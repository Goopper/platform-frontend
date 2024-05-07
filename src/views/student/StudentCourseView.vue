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
        @click="goToDetail(course.course.id)"
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
        @select-course="handleSelectCourse"
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
    <v-dialog
      v-model="dialog"
      persistent
      max-width="500"
    >
      <v-card
        color="white"
        title="选课"
      >
        <v-card-text>
          确认要开始学习选中的课程吗
          <div class="border p-4 mt-4 flex">
            <div class="w-[64px] h-[64px]">
              <v-img
                class="bg-default w-[64px] h-[64px]"
                aspect-ratio="1/1"
                alt="课程封面"
                lazy-src="/default.jpg"
                :src="targetCourse.cover"
              >
                <template #placeholder>
                  <div class="d-flex align-center justify-center fill-height">
                    <v-progress-circular
                      color="grey-lighten-4"
                      indeterminate
                    />
                  </div>
                </template>
              </v-img>
            </div>
            <div class="flex flex-grow flex-col justify-between h-auto ml-4">
              <div class="flex justify-between">
                <p class="font-bold">
                  {{ targetCourse.name }}
                </p>
                <v-chip
                  variant="outlined"
                  size="small"
                >
                  {{ targetCourse.type }}
                </v-chip>
              </div>
              <p class="max-w-[320px] truncate ...">
                {{ targetCourse.desc }}
              </p>
            </div>
          </div>
        </v-card-text>

        <v-card-actions>
          <v-spacer />

          <v-btn
            variant="flat"
            text="确认"
            :loading="loading"
            :disabled="loading"
            @click="handleConfirmClick"
          />
          <v-btn
            variant="outlined"
            text="取消"
            :disabled="loading"
            @click="dialog = false"
          />
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { getCourseType } from '@/api/course';
import { getAllLearningCourse, getAllSelectableCourses, manualSelectCourse } from '@/api/student';
import CustomHorizontalCourseCard from '@/components/CustomHorizontalCourseCard.vue';
import mitt from '@/plugins/mitt';

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
    dialog: false,
    targetCourse: {}
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
    handleSelectCourse(course) {
      this.dialog = true;
      this.targetCourse = course;
    },
    async handleConfirmClick() {
      this.loading = true;
      const courseId = this.targetCourse.id;
      const res = await manualSelectCourse(courseId);
      if (res) {
        mitt.emit('showToast', { title: '选课成功！', color: 'success', icon: '$success' });
        await this.searchLearningCourse();
        await this.searchSelectableCourse();
        this.dialog = false;
      } else {
        mitt.emit('showToast', { title: '选课失败！', color: 'error', icon: '$error' });
      }
      this.loading = false;
    },
    goToDetail(courseId) {
      this.$router.push({
        path: `/course/detail/${courseId}`,
      });
    },
  }
};
</script>

<style lang="scss" scoped>

</style>