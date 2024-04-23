<template>
  <!-- 课程里学生学习进度框 -->
  <main>
    <!-- 课程操作栏 -->
    <nav>
      <!-- 选择课程 -->
      <div class="course-select">
        <v-select
          v-model="selectedCourseName"
          label="选择课程"
          :items="CourseNameList"
          variant="outlined"
          density="compact"
        />
      </div>
      <div class="right-select">
        <!-- 选择小组 -->
        <div class="group-select">
          <v-select
            v-model="selectedGroupName"
            label="选择小组"
            :items="GroupNameList"
            variant="outlined"
            density="compact"
          />
        </div>
        <!-- 排序顺序 -->
        <div class="sort-select">
          <v-select
            v-model="selectedOrderName"
            label="选择排序"
            :items="OrderNameList"
            variant="outlined"
            density="compact"
          />
        </div>
      </div>
    </nav>
    <!-- 学生信息卡片 -->
    <div class="course-students-card">
      <div
        v-for="studentCard in studentCardsList"
        :key="studentCard.id"
        class="stu-cards"
      >
        <section>
          <h1>{{ studentCard.name }}</h1>
          <span>{{ groupName() }}</span>
          <p>{{ studentCard.taskName }}</p>
          <span>{{ timeAndSection(studentCard.lastUpdate, studentCard.sectionName) }}</span>
        </section>
        <div class="image-circular">
          <img
            :src="CheckImage(studentCard.avatar)"
            alt=""
          >
          <v-progress-circular
            :model-value="processNumber(studentCard.finishedTask, studentCard.totalTask)
            "
            :size="48"
            :width="6"
            :color="processColor(
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
  </main>
</template>

<script>
import { getCourseList, getGroupList, getStudentList } from '@/api/course';
export default {
  name: 'TeacherHomeView',
  data: () => ({
    CourseNameList: [],
    GroupNameList: [],
    OrderNameList: [],
    CourseList: [],
    GroupList: [],
    OrderList: [
      { id: 1, name: '按学号排序' },
      { id: 2, name: '按姓名排序' },
    ],
    courseId: null,
    groupId: null,
    OrderId: null,
    selectedCourseName: null,
    selectedGroupName: null,
    selectedOrderName: '按学号排序',
    studentCardsList: [],
  }),
  watch: {
    // 选择框选择后触发获取当前选择的id
    selectedCourseName(CourseName) {
      let course = this.CourseList.find((course) => course.name === CourseName);
      this.courseId = course ? course.id : null;
      this.fetchStudentList();
    },
    selectedGroupName(GroupName) {
      let group = this.GroupList.find((group) => group.name === GroupName);
      this.groupId = group ? group.id : null;
      this.fetchStudentList();
    },
    selectedOrderName(OrderName) {
      let order = this.OrderList.find((order) => order.name === OrderName);
      this.OrderId = order ? order.id : null;
      this.fetchStudentList();
    },
  },
  mounted() {
    //对OrderList进行遍历，将name放入OrderNameList中,添加OrderId的默认值
    this.OrderNameList = this.OrderList.map((order) => order.name);
    this.OrderId = this.OrderList[0].id;
  },
  created() {
    // 获取教师的课程列表
    getCourseList().then((res) => {
      for (let i = 0; i < res.data.length; i++) {
        this.CourseNameList.push(res.data[i].name);
        this.CourseList.push(res.data[i]);
      }
      this.selectedCourseName = this.CourseNameList[0];
      this.courseId = this.CourseList[0].id;
      // 获取教师的小组列表
      getGroupList().then((res) => {
        for (let i = 0; i < res.data.length; i++) {
          this.GroupNameList.push(res.data[i].name);
          this.GroupList.push(res.data[i]);
        }
        this.groupId = this.GroupList[0].id;
        this.selectedGroupName = this.GroupNameList[0];

        // 获取教师的学生列表 实现方法 get方法传入三个参数有默认值,再可以通过选择框传入
        if (this.groupId && this.courseId && this.OrderId) {
          this.fetchStudentList();
        }
      });
    });
  },
  methods: {
    //获取学生信息列表
    fetchStudentList() {
      if (this.groupId && this.courseId && this.OrderId) {
        getStudentList(this.courseId, this.groupId, this.OrderId).then((res) => {
          if (this.OrderId === 2) {
            this.studentCardsList = res.data.sort((a, b) => {
              return a.name.localeCompare(b.name);
            });
          } else {
            this.studentCardsList = res.data;
          }
        });
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
        Math.abs(new Date() - new Date(lastUpdate)) /
        (1000 * 60 * 60 * 24)
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
    //检查图片是否为默认
    CheckImage(avatar) {
      console.log(avatar);
      if (avatar === '/default.jpg') {
       return avatar;
      } else {
        return 'https://xxx'+avatar;
      }
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
  grid-gap: 1em;
  overflow: auto;
  height: calc(100% - 62px);
}

.stu-cards {
  display: flex;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  padding: 1em;
  width: 14em;
  height: 11em;
}

// .stu-cards:hover {
//   box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
//   cursor: pointer;
// }


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
@media (min-width: 820px) and (max-width: 1070px) {
  .course-students-card {
    grid-template-columns: 1fr 1fr 1fr;
  }
}

@media (max-width: 820px) {
  .course-students-card {
    grid-template-columns: 1fr 1fr;
    grid-gap: 0.5em;
      height: calc(100% - 140px);
  }
  nav {
    display: inline;
  }
  .right-select {
    width: 100%;
  }

  .course-select {
    width: 100%;
  }
}
@media (max-width: 500px) {
  .course-students-card{
    grid-template-columns: 1fr;
  }
  .stu-cards{
    width: 90%;
  }
}


// 图片和进度条
.image-circular {
  width: 24%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  img{
    border-radius: 2em;
  }
}

.image-circular>* {
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