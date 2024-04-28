<template>
  <!-- 课程里学生学习进度框 -->
  <main>
    <!-- 课程操作栏 -->
    <nav>
      <!-- 选择课程 -->
      <div class="course-select">
        <v-select
          v-model="courseId"
          label="选择课程"
          :items="CourseList"
          item-title="name"
          item-value="id"
          variant="outlined"
          density="compact"
        />
      </div>
      <div class="right-select">
        <!-- 选择小组 -->
        <div class="group-select">
          <v-select
            v-model="groupId"
            label="选择小组"
            :items="GroupList"
            item-title="name"
            item-value="id"
            variant="outlined"
            density="compact"
          />
        </div>
        <!-- 排序顺序 -->
        <div class="sort-select">
          <v-select
            v-model="orderId"
            label="选择排序"
            :items="OrderList"
            item-title="name"
            item-value="id"
            variant="outlined"
            density="compact"
          />
        </div>
      </div>
    </nav>
    <!-- 学生信息卡片 -->
    <div
      v-if="showStudentCards"
      class="course-students-card"
    >
      <div
        v-for="studentCard in studentCardsList"
        :key="studentCard.id"
      >
        <div
          class="stu-cards"
          @click="goStudentDetail(studentCard.id)"
        >
          <section>
            <h1>{{ studentCard.name }}</h1>
            <span>{{ groupName() }}</span>
            <p>{{ studentCard.taskName }}</p>
            <span>{{
              timeAndSection(studentCard.lastUpdate, studentCard.sectionName)
            }}</span>
          </section>
          <div class="image-circular">
            <img
              :src="studentCard.avatar"
              alt=""
            >
            <v-progress-circular
              :model-value="
                processNumber(studentCard.finishedTask, studentCard.totalTask)
              "
              :size="48"
              :width="6"
              :color="
                processColor(
                  processNumber(studentCard.finishedTask, studentCard.totalTask)
                )
              "
            >
              {{
                processNumber(studentCard.finishedTask, studentCard.totalTask)
              }}
            </v-progress-circular>
          </div>
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
  </main>
</template>

<script>
import { getCourseList, getGroupList, getStudentList } from '@/api/course';
export default {
  name: 'TeacherHomeView',
  data: () => ({
    CourseList: [],
    GroupList: [],
    OrderList: [
      { id: 1, name: '按学号排序' },
      { id: 2, name: '按姓名排序' },
    ],
    courseId: null,
    groupId: null,
    orderId: null,
    studentCardsList: [],
    showStudentCards: true,
  }),
  watch: {
    // 选择框选择后触发获取当前选择的id
    orderId() {
      this.fetchStudentList();
    },
    groupId() {
      this.fetchStudentList();
    },
    courseId() {
      this.fetchStudentList();
    },
  },
  mounted() {
    //对OrderList进行遍历，将name放入OrderNameList中,添加OrderId的默认值
    this.orderId = this.OrderList[0].id;
  },
  created() {
    // 获取教师的课程列表
    getCourseList().then((res) => {
      if (res.data.length === 0) {
        this.showStudentCards = false;
      } else {
        for (let i = 0; i < res.data.length; i++) {
          this.CourseList.push(res.data[i]);
        }
        this.courseId = this.CourseList[0].id;
      }

      // 获取教师的小组列表
      getGroupList().then((res) => {
        for (let i = 0; i < res.data.length; i++) {
          this.GroupList.push(res.data[i]);
        }
        this.groupId = this.GroupList[0].id;

        // 获取教师的学生列表 实现方法 get方法传入三个参数有默认值,再可以通过选择框传入
        if (this.groupId && this.courseId && this.orderId) {
          this.fetchStudentList();
        }
      });
    });
  },
  methods: {
    //获取学生信息列表
    fetchStudentList() {
      if (this.groupId && this.courseId && this.orderId) {
        getStudentList(this.courseId, this.groupId, this.orderId).then(
          (res) => {
            if(res.data.length === 0) {
              this.showStudentCards = false;
            } else {
              this.showStudentCards = true;
              if (this.orderId === 2) {
              this.studentCardsList = res.data.sort((a, b) => {
                return a.name.localeCompare(b.name);
              });
            } else {
              this.studentCardsList = res.data;
            }
            }
            
          }
        );
      }
    },
    //查询当前学生的小组名称
    groupName() {
      let name = this.GroupList.find((group) => group.id === this.groupId);
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
main {
  padding: 2em;
  width: 100%;
  background-color: white;
  border: 1px solid #e0e0e0;
  height: 100%;
}

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
  grid-template-rows: 1fr 1fr 1fr 1fr;
  grid-gap: 1em;
  overflow: auto;
  height: calc(100% - 62px);
}
.course-students-card > div {
  display: flex;
  justify-content: center;
  align-items: center;
}
.stu-cards {
  display: flex;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  padding: 1em;
  width: 14em;
  height: 11em;
}

.stu-cards:hover {
  cursor: pointer;
}

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
    height: calc(100% - 140px);
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
  }

  .stu-cards {
    width: 90%;
  }
}

// 图片和进度条
.image-circular {
  width: 24%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  img {
    border-radius: 2em;
  }
}

.image-circular > * {
  max-width: 100%;
}

// 学生一些信息
section {
  width: 76%;
}

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
  height: 4em;
  max-width: 100%;
}

section span:first-of-type {
  color: #666666;
}
</style>