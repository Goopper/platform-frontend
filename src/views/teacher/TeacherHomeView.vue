<template>
  <!-- 课程里学生学习进度框 -->
  <div class="flex flex-col w-full bg-background border p-6">
    <!-- 课程操作栏 -->
    <div>
      <!-- 选择课程 -->
      <div class="grid gap-2 grid-cols-3 sm:grid-cols-2">
        <v-select
          v-model="courseId"
          class="sm:col-span-2"
          label="选择课程"
          :items="courseList"
          item-title="name"
          item-value="id"
          variant="outlined"
          density="compact"
          :loading="loading"
          :disable="fetch"
        />
        <!-- 选择小组 -->
        <v-select
          v-model="groupId"
          label="选择小组"
          :items="groupList"
          item-title="name"
          item-value="id"
          variant="outlined"
          density="compact"
          :loading="loading"
          :disable="fetch"
        />
        <!-- 排序方式 -->
        <v-select
          v-model="orderId"
          label="选择排序"
          :items="orderList"
          item-title="name"
          item-value="id"
          variant="outlined"
          density="compact"
          :loading="loading"
          :disable="fetch"
        />
      </div>
    </div>
    <!-- 学生信息卡片 -->
    <div class="student-cards">
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
        v-else-if="showStudentCards && loading === false"
        id="student-cards"
        class="grid gap-4 justify-items-center"
      >
        <div
          v-for="student in students"
          :key="student.id"
          class="stu-cards gap-2"
          @click="goStudentDetail(student.id)"
        >
          <section class="flex-grow h-full flex flex-col justify-between">
            <div>
              <h1>{{ student.name }}</h1>
              <span>{{ groupName() }}</span>
            </div>
            <p class="flex-grow">
              {{ student.taskName }}
            </p>
            <span class="text-ellipsis">{{
              timeAndSection(student.lastUpdate, student.sectionName)
            }}</span>
          </section>
          <div class="image-circular">
            <img
              :src="student.avatar"
              alt=""
            >
            <v-progress-circular
              class="w-[3rem] h-[3rem]"
              :model-value="
                processNumber(student.finishedTask, student.totalTask)
              "
              :width="6"
              :color="
                processColor(
                  processNumber(student.finishedTask, student.totalTask)
                )
              "
            >
              {{
                processNumber(student.finishedTask, student.totalTask)
              }}
            </v-progress-circular>
          </div>
        </div>
      </div>
      <div
        v-else
        class="p-4 flex flex-col justify-center items-center h-full"
      >
        <v-icon
          size="100px"
          class="text-gray-400 mt-8"
          icon="mdi-signal-off"
        />
        <p class="font-bold text-lg text-gray-400">
          无学生
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { getCourseList, getGroupList, getStudentList } from '@/api/course';
export default {
  name: 'TeacherHomeView',
  data: () => ({
    courseList: [],
    groupList: [],
    orderList: [
      { id: 1, name: '按学号排序' },
      { id: 2, name: '按姓名排序' },
    ],
    courseId: null,
    groupId: null,
    orderId: null,
    students: [],
    showStudentCards: true,
    loading: true,
  }),
  computed: {
    fetch() {
      if (this.orderId != null && this.groupId != null && this.courseId != null) {
        return this.fetchStudentList();
      } else {
        return false;
      }
    },
  },
  watch: {
    // 选择框选择后触发获取当前选择的id
    orderId() {
      this.loading = true;
      this.showStudentCards = false;
    },
    groupId() {
      this.loading = true;
      this.showStudentCards = false;
    },
    courseId() {
      this.loading = true;
      this.showStudentCards = false;
    },
  },
  async created() {
    // 获取教师的课程列表
    const course = await getCourseList();
    const group = await getGroupList();
    console.log(course, group);
    if (course == [] || group == []) {
      this.loading = false;
    }
    this.courseList = course.data;
    this.groupList = group.data;
    this.courseId = this.courseList[0].id;
    this.groupId = this.groupList[0].id;
    this.orderId = this.orderList[0].id;
    this.loading = false;
  },
  methods: {
    //获取学生信息列表
    async fetchStudentList() {
      const res = await getStudentList(
        this.courseId,
        this.groupId,
        this.orderId
      );
      this.loading = true;
      if (res.data.length === 0) {
        this.showStudentCards = false;
        this.loading = false;
      } else {
        this.showStudentCards = true;
        this.loading = false;
        if (this.orderId === 2) {
          this.students = res.data.sort((a, b) => {
            return a.name.localeCompare(b.name);
          });
        } else {
          this.students = res.data;
        }
      }
    },
    //查询当前学生的小组名称
    groupName() {
      let name = this.groupList.find((group) => group.id === this.groupId);
      return name ? name.name : null;
    },

    //格式化时间和章节
    timeAndSection(lastUpdate, section) {
      if (section === null) {
        section = '无章节';
      }
      let time = Math.ceil(
        Math.abs(new Date() - new Date(lastUpdate)) / (1000 * 60 * 60 * 24)
      );
      if (time >= 10000) {
        return `无上次记录 • ${section}`;
      } else {
        return `${time}天前 • ${section}`;
      }
    },
    //去除任务进度有NAN和小数点
    processNumber(lastTask, totalTask) {
      let taskProcess = Math.floor((lastTask / totalTask) * 100);
      if (isNaN(taskProcess)) {
        return 0;
      } else {
        return Math.floor((lastTask / totalTask) * 100);
      }
    },
    //进度条颜色
    processColor(value) {
      if (value < 25) {
        return 'red';
      } else if (value < 75) {
        return 'orange';
      } else if (value < 100) {
        return 'blue';
      } else {
        return 'green';
      }
    },
    //跳转到学生详情页
    goStudentDetail(studentId) {
      this.$router.push({
        path: '/teacher/student/detail',
        query: {
          studentId,
          courseId: this.courseId,
        },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
#student-cards {
  grid-template-columns: repeat(2, minmax(0, 1fr));

  @media screen and (min-width: 1440px){
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  @media screen and (min-width: 1680px){
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }

  @media screen and (max-width: 1440px) {
    grid-template-columns: repeat(1, minmax(0, 1fr));
  }

  @media screen and (max-width: 1280px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media screen and (max-width: 768px){
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media screen and (max-width: 600px){
    grid-template-columns: repeat(1, minmax(0, 1fr));
  }
}

<<<<<<< HEAD
//选择框
nav {
  display: flex;
  justify-content: space-between;
}

.course-select {
  width: 22%;
}

// 右侧选择框
.right-select {
  width: 30%;
  display: flex;
}

.group-select {
  width: 80%;
  min-width: 11em;
  padding-right: 1.5em;
}

.sort-select {
  width: 55%;
  min-width: 8em;
}

// 课程学生卡片
.course-students-card {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-gap: 1em;
  overflow: auto;
}
.course-students-card > div {
  display: flex;
  justify-content: center;
  align-items: center;
}
=======
>>>>>>> e1c692e6d10643b043e4919570aafe1ee315f6d8
.stu-cards {
  display: flex;
  justify-content: space-between;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  padding: 1em;
  width: 100%;
  height: 11rem;
}

.student-cards{
  overflow: auto;
}
.student-cards{
  overflow: auto;
}

.stu-cards:hover {
  cursor: pointer;
}

.loader {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50vh;
}

<<<<<<< HEAD
//缩小时改变大小
@media (min-width: 820px) and (max-width: 1280px) {
  .right-select {
    width: 100%;
    padding-left: 1.5em;
  }

  .course-select {
    width: 70%;
  }
}

@media (min-width: 1024px) and (max-width: 1600px) {
  .course-students-card {
    grid-template-columns: 1fr 1fr 1fr;
  }
  .right-select {
    width: 44%;
  }
}

@media (max-width: 1024px) {
  .course-students-card {
    grid-template-columns: 1fr 1fr;
    grid-gap: 0.5em;
    height: 96%;
  }
  nav {
    display: inline;
  }
  .stu-cards {
    width: 70%;
  }
  .right-select {
    width: 100%;

    .group-select {
      min-width: 0;
    }
    .sort-select {
      min-width: 0;
    }
  }
  .course-select {
    width: 100%;
  }
}
@media (max-width: 500px) {
  .course-students-card {
    grid-template-columns: 1fr;
    height: 96%;
    overflow: auto;
  }

  .stu-cards {
    width: 90%;
  }
}

=======
>>>>>>> e1c692e6d10643b043e4919570aafe1ee315f6d8
// 图片和进度条
.image-circular {
  width: 3rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  img {
    border-radius: 100vw;
  }
}

.image-circular > * {
  max-width: 100%;
}

// 学生一些信息
h1 {
  font-size: 1.4em;
}

section span {
  display: inline-block;
  font-size: 0.8em;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 100%;
}

section p {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 4;
  font-size: 0.9em;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: normal;
  word-wrap: break-word;
  line-height: 1em;
  max-width: 100%;
}

section span:first-of-type {
  color: #666666;
}
</style>