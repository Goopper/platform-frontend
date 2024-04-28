<template>
  <main>
    <!-- 导航栏 -->
    <nav>
      <v-text-field
        v-model="searchCourseName"
        class="course-input"
        label="课程名称"
        variant="outlined"
        density="compact"
        hide-details
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
    <h1 v-if="selectedState == 1">
      草稿
    </h1>
    <h1 v-else-if="selectedState == 2">
      使用中
    </h1>
    <h1 v-else>
      已禁用
    </h1>

    <!-- 课程卡片 -->
    <div
      v-if="courseList.length > 0"
      class="using-box"
    >
      <custom-course-card
        :course="courseList"
        :state="courseState"
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
        @click="$router.go(0);"
      />
      <p class="font-bold text-lg text-gray-400">
        无课程
      </p>
    </div>
  </main>
</template>

<script>
import { getTeacherCourseList, getStatus } from '@/api/course';
import CustomCourseCard from '@/components/course/CustomCourseCard.vue';
export default {
  name: 'TeacherCourseView',
  components: { CustomCourseCard },
  data() {
    return {
      courseList: [],
      usingCourseList: [],
      draftCourseList: [],
      deactivatedCourseList: [],
      courseStateList: [],
      courseState: [],
      searchCourseName: '',
      selectedState: null,
      lastState: null,
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
      if (this.selectedState === 1) {
        this.DraftCourse();
        this.lastState = 1;
      } else if (this.selectedState === 2) {
        this.UsingCourse();
        this.lastState = 2;
      } else {
        this.DeactivatedCourse();
        this.lastState = 3;
      }
    },
  },
  created() {
    this.courseList = [];
    //草稿课程
    getTeacherCourseList(1, '').then((res) => {
      if (res.data.length.length === 0) {
        this.isShowDraft = false;
      } else {
        this.draftCourseList = res.data;
      }
    });
    //使用中课程
    getTeacherCourseList(2, '').then((res) => {
      if (res.data.length.length === 0) {
        this.isShowUsing = false;
      } else {
        this.usingCourseList = res.data;
      }
    });
    //停用课程
    getTeacherCourseList(3, '').then((res) => {
      if (res.data.length.length === 0) {
        this.isShowUsing = false;
      } else {
        this.deactivatedCourseList = res.data;
      }
    });

    getStatus().then((res) => {
      this.courseStateList = res.data;
      this.selectedState = 2;
      this.courseState = this.courseStateList[1].name;
    });
  },
  methods: {
    //草稿课程
    DraftCourse() {
      this.courseList = [];
      this.courseList = this.draftCourseList;
      this.courseState = this.courseStateList[0];
    },
    //使用中课程
    UsingCourse() {
      this.courseList = [];
      this.courseList = this.usingCourseList;
      this.courseState = this.courseStateList[1];
    },
    DeactivatedCourse() {
      this.courseList = [];
      this.courseList = this.deactivatedCourseList;
      this.courseState = this.courseStateList[2];
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

// 使用中的所有课程卡片
.using-box {
  overflow: auto;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
  grid-gap: 1em;
  height: 90%;
}

// 响应式
@media (max-width: 1600px) {
  .using-box {
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  }
}

@media (max-width: 1200px) {
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
      width: auto;
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