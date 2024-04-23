<template>
  <div class="border bg-secondary mb-4 p-4 flex gap-4">
    <div class="w-[128px] h-[128px]">
      <v-img
        class="bg-default w-[128px] h-[128px]"
        aspect-ratio="1/1"
        alt="课程封面"
        :src="courseInfo.cover"
      />
    </div>
    <div class="flex flex-col flex-grow">
      <!-- name -->
      <div class="flex justify-between">
        <p class="font-bold">
          {{ courseInfo.name }}
        </p>
        <v-chip
          variant="outlined"
          size="small"
        >
          {{ courseInfo.type }}
        </v-chip>
      </div>
      <!-- desc -->
      <p class="flex-grow">
        {{ courseInfo.desc }}
      </p>
      <!-- progress -->
      <div
        v-if="showProgress"
        class="mt-4"
      >
        <span>
          目前学习进度：{{ course.finishedTask }}/{{ course.totalTask }}
          <span class="text-gray-500 text-xs">
            （已完成任务/总任务）
          </span>
        </span>
        <v-progress-linear
          class="mt-2"
          :model-value="progress"
          :height="24"
        >
          <strong
            style="color: white;"
          >{{ progress }}%</strong>
        </v-progress-linear>
      </div>
      <!-- else show action -->
      <div
        v-else
        class="flex justify-end"
      >
        <v-btn
          color="primary"
          variant="flat"
          size="small"
        >
          开始学习
        </v-btn>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CustomHorizontalCourseCard',
  props: {
    // 如果是显示进度，则传入CourseDTO对象，否则传入StudentLearningProgressDTO对象
    showProgress: {
      type: Boolean,
      default: false
    },
    course: {
      type: Object,
      required: true
    }
  },
  data: () => ({
    courseInfo: {}
  }),
  computed: {
    progress() {
      if (!this.course) return 0.00;
      let pg = ((this.course.finishedTask / this.course.totalTask) * 100).toFixed(2);
      // if not a number, return 0
      if (isNaN(pg)) return 0.00;
      return pg;
    }
  },
  created() {
    if (this.showProgress) {
      this.courseInfo = this.course.course;
    } else {
      this.courseInfo = this.course;
    }
  }
};
</script>

<style lang="scss" scoped>

</style>