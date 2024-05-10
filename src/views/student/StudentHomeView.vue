<template>
  <div>
    <!-- course card -->
    <div
      v-if="currentCourse"
      class="bg-secondary p-4 border flex min-h-[280px] sm:flex-col"
    >
      <!-- course info left -->
      <div class="sm:mr-0 bsm:mr-7 h-auto flex flex-col">
        <v-img
          class="bg-default w-auto min-w-[22.5vw] sm:min-h-[200px]"
          width="22.5vw"
          height="12.5vw"
          :src="currentCourse.course.cover"
        />
        <div class="mt-4">
          <span>
            目前学习进度：{{ currentCourse.finishedTask }}/{{ currentCourse.totalTask }}
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
      </div>
      <!-- course info right -->
      <div class="flex flex-col flex-grow h-auto">
        <div class="h-auto">
          <p class="text-2xl font-bold mb-8">
            {{ currentCourse.course.name }}
          </p>
          <div class="flex justify-start items-center">
            <v-icon icon="mdi-sign-direction" />
            {{ latestLearnedInfo.section }}
          </div>
          <div class="flex justify-start items-start mt-2">
            <v-icon icon="mdi-format-list-bulleted" />
            <span>
              {{ latestLearnedInfo.task }}
            </span>
          </div>
        </div>
        <div class="flex flex-grow justify-between items-end">
          <p class="text-gray-500 text-sm">
            最后学习日期：{{ latestLearnedInfo.date }}
          </p>
          <v-btn
            variant="outlined"
            @click="goToDetail(currentCourse.course.id)"
          >
            继续学习
          </v-btn>
        </div>
      </div>
    </div>
    <!-- year lean performance -->
    <div
      v-if="allYears && allYears.length !== 0"
      class="bg-secondary p-4 border flex flex-col mt-8"
    >
      <p class="text-2xl font-bold mb-4">
        {{ currentYear }}年学习情况
      </p>
      <div class="flex lg:flex-col">
        <div class="max-w-[100%] overflow-x-auto blg:mr-4">
          <div
            class="h-fit w-[650px] grid grid-rows-7 grid-cols-52 grid-flow-col gap-0.5 justify-center items-center"
          >
            <div
              v-for="day in currentYearDaysCount"
              :key="day"
              class="day"
              :class="{ 'learned': dayIsLearned(day) }"
            />
          </div>
        </div>
        <div class="flex flex-col flex-grow lg:mt-4">
          <v-btn
            v-for="year in allYears"
            :key="year"
            variant="outlined"
            class="activate mb-3"
            :value="year"
            :class="{ 'year-activate': year == currentYear }"
            :disabled="switchYearLoading"
            @click="switchYear(year)"
          >
            {{ year }}
          </v-btn>
        </div>
      </div>
    </div>
    <!-- empty view -->
    <div
      v-else
      class="bg-secondary p-4 border flex flex-col justify-center items-center h-full"
    >
      <v-icon
        size="100px"
        class="text-gray-400 mt-8"
        icon="mdi-signal-off"
      />
      <p class="font-bold text-lg text-gray-400">
        无学习记录
      </p>
    </div>
  </div>
</template>

<script>
import { getCurrentCourse,getAllLearnedYears,getLearnedPerformanceByYear } from '@/api/student';
import { useUserStore } from '@/store/user';
import mitt from '@/plugins/mitt';

export default {
  name: 'StudentHomeView',
  data: () => ({
    userStore: useUserStore(),
    currentCourse: undefined,
    allYears: undefined,
    currentYear: undefined,
    currentYearDaysCount: 356,
    currentYearPerformance: [],
    switchYearLoading: false,
  }),
  computed: {
    user() {
      return this.userStore.userInfo;
    },
    progress() {
      if (!this.currentCourse) return 0;
      let pg = ((this.currentCourse.finishedTask / this.currentCourse.totalTask) * 100).toFixed(2);
      if (isNaN(pg)) return 0;
      return pg;
    },
    latestLearnedInfo() {
      if (!this.currentCourse.lastLearningDate) {
        return {
          date: '暂无学习记录',
          section: '暂无学习记录',
          task: '暂无学习记录',
        };
      }
      return {
        date: this.currentCourse.lastLearningDate.substring(0, 10),
        section: this.currentCourse.lastSectionName,
        task: this.currentCourse.lastTaskName,
      };
    }
  },
  created() {
    const currentYear = new Date().getFullYear();
    this.currentYear = currentYear;
    this.currentYearDaysCount = (currentYear % 4 === 0 && currentYear % 100 !== 0) || currentYear % 400 === 0 ? 366 : 365;
    getCurrentCourse().then(res => {
      this.currentCourse = res.data;
    }).catch(err => {
      mitt.emit('showToast', { title: '无学习记录', color: 'warning', icon: '$warning' });
    });
    getAllLearnedYears().then(res => {
      this.allYears = res.data.reverse();
    });
    getLearnedPerformanceByYear(this.currentYear).then(res => {
      this.currentYearPerformance = res.data;
    });
  },
  methods: {
    async switchYear(year) {
      this.switchYearLoading = true;
      const result = await getLearnedPerformanceByYear(year);
      if (result) {
        this.currentYearPerformance = result.data;
        this.currentYear = year;
        this.currentYearDaysCount = (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0 ? 366 : 365; 
      } else {
        mitt.emit('showToast', { title: '获取学习情况失败', color: 'error', icon: '$error' });
      }
      this.switchYearLoading = false;
    },
    dayIsLearned(day) {
      // day: 1-365 || 366
      if (day < this.currentYearPerformance.length) {
        return this.currentYearPerformance[day] === 1;
      }
      return false;
    },
    //跳转到课程详情页
    goToDetail(courseId) {
      this.$router.push({
        path: `/course/detail/${courseId}`,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.year-activate {
  background-color: var(--custom-primary);
  border: none;
  color: var(--custom-secondary);
}

.day {
  width: 0.625rem;
  height: 0.625rem;
  background-color: #e3e3e3;
}

.learned {
  background-color: #4caf50;
}
</style>