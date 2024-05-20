<template>
  <div class="h-full w-full flex flex-col">
    <!-- 导航栏 -->
    <nav>
      <v-text-field
        v-model="searchCourseName"
        class="course-input"
        label="课程名称"
        variant="outlined"
        density="compact"
        hide-details
        :loading="loading"
      />
      <v-select
        v-model="selectedState"
        class="state-select"
        label="状态"
        :items="courseStateList"
        item-value="id"
        item-title="name"
        variant="outlined"
        density="compact"
        hide-details
        :loading="loading"
      />
      <router-link to="create">
        <v-btn
          text
          prepend-icon="mdi-pencil"
        >
          创建课程
        </v-btn>
      </router-link>
    </nav>
    <h1>
      {{ titleName(selectedState) }}
    </h1>

    <!-- 课程卡片 -->
    <div class="flex-grow overflow-y-auto">
      <div
        v-if="loading"
        class="loader"
      >
        <v-progress-circular
          indeterminate
          :size="80"
          :width="8"
          color="primary"
        />
      </div>
      <div
        v-else-if="courseList.length > 0"
        class="using-box"
      >
        <custom-course-card
          v-for="course in courseList"
          :key="course.id"
          :course="course"
          @refresh="loadData"
        />
      </div>
      <div
        v-else
        class="p-4 flex flex-col justify-center items-center"
      >
        <v-icon
          size="100px"
          class="text-gray-400 mt-8"
          icon="mdi-signal-off"
        />
        <p class="font-bold text-lg text-gray-400">
          无课程
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { getTeacherCourseList, getStatus } from '@/api/course';
import CustomCourseCard from '@/components/course/CustomCourseCard.vue';
export default {
  name: 'TeacherCourseView',
  components: { CustomCourseCard },
  data() {
    return {
      courseList :[],
      courseStateList: [{
        id: null,
        name: '全部',
      }],
      courseState: [],
      searchCourseName: '',
      selectedState: null,
      loading: true,
    };
  },
  // 监听两个输入框
  watch: {
    searchCourseName() {
      getTeacherCourseList(this.selectedState, this.searchCourseName).then(
        (res) => {
          this.courseList = res.data;
        }
      );
    },
    selectedState() {
      this.loading = true;
      this.loadData();
    },
  },
  async created() {
    const res = await getStatus();
    this.courseStateList = this.courseStateList.concat(res.data);
    this.loadData();
  },
  methods: {
    async loadData() {
      const courseList = await getTeacherCourseList(this.selectedState, this.searchCourseName);
      this.courseList = courseList.data;
      this.loading = false;
    },
    titleName(state) {
      if(state === null) {
        return '全部课程';
      }else if (state === 1) {
        return '草稿';
      } else if (state === 2) {
        return '使用中';
      } else if (state === 3) {
        return '已停用';
      }
    },
  },
};
</script>

<style lang="scss" scoped>
main {
  width: 100%;
  height: 100%;
}

//导航栏
nav {
  display: flex;

  .course-input {
    flex: 4;
    background-color: white;
  }

  .state-select {
    margin: 0 1em;
    background-color: white;
    flex: 1;
  }
}

//标签
h1 {
  font-size: 1.1em;
  margin: 1em 0;
}

// 课程卡片列表
.using-box {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
  grid-auto-rows: min-content;
  grid-auto-columns: min-content;
  justify-items: center;
  grid-gap: 1em;
  padding: 0 0 2em 0 ;
}

.loader {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50vh;
}

// 响应式
@media (max-width: 1600px) {
  .using-box {
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  }
}

@media (max-width: 1300px) {
  .using-box {
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }
}

@media (max-width: 1120px) {
  .using-box {
    grid-template-columns: 1fr 1fr 1fr;
  }
}
@media (max-width: 920px) {
  .using-box {
    grid-template-columns: 1fr 1fr;
  }
}

@media (max-width: 520px) {
  nav {
    .course-input {
      flex: 1;
    }

    .state-select {
      margin: 0 0.25em;
    }
  }

  .using-box {
    grid-template-columns: 1fr;

    .using-card {
      display: flex;
      width: 100%;
    }

    .title-more {
      display: flex;
      justify-content: space-between;
    }

    .course-info {
      padding: 0 0.5em;
      width: 80%;
    }

    p {
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 3;
      /* 修改这里 */
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: pre-wrap;
      word-wrap: break-word;
      max-width: 80%;
    }
  }

  .v-btn {
    display: none;
  }
}
</style>