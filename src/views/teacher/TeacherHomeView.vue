<template>
  <!-- 课程里学生学习进度框 -->
  <main>
    <!-- 课程操作栏 -->
    <nav>
      <!-- 选择课程 -->
      <div class="course-select">
        <v-select
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
            label="选择小组"
            :items="GroupNameList"
            variant="outlined"
            density="compact"
          />
        </div>
        <!-- 排序顺序 -->
        <div class="sort-select">
          <v-select
            label="选择排序"
            :items="OrderNameList"
            variant="outlined"
            density="compact"
          />
        </div>
      </div>
    </nav>
    <div class="course-students-card">
      <div
        v-for="studentCard in studentCardsList"
        :key="studentCard.id"
      > 
        <div class="stu-cards">
          <h1>{{ studentCard.name }}</h1>
          <span>{{ studentCard.sectionName }}</span>
          <span>{{ studentCard.lastUpdate }}</span>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import { getCourseList, getGroupList, getStuentList } from '@/api/course';
export default {
  name: 'TeacherHomeView',
  data: () => ({
    studentCardsList: [],
    CourseNameList: [],
    GroupNameList: [],
    OrderNameList: [],
    OrderList: [{ 'id': 1, 'name': '按id排序' }, {'id':2,'name':'按姓名排序'}],
    courseId: null,
    groupId: null,
  }),
  mounted(){
    for(let i = 0; i < this.OrderList.length; i++) {
      this.OrderNameList.push(this.OrderList[i].name);
    }
  },
  created() {
    // 获取教师的课程列表
    getCourseList().then((res) => {
      const CourceList = [];
      for (let i = 0; i < res.data.length; i++) {
        this.CourseNameList.push(res.data[i].name);
        CourceList.push(res.data[i]);
      }
      this.courseId = CourceList[0].id;

      // 获取教师的小组列表
      getGroupList().then((res) => {
        const GroupList = [];
        for (let i = 0; i < res.data.length; i++) {
          this.GroupNameList.push(res.data[i].name);
          GroupList.push(res.data[i]);
        }
        this.groupId = GroupList[0].id;

        // 获取教师的学生列表 实现方法 get方法传入三个参数有默认值,再可以通过选择框传入
        getStuentList(this.courseId, this.groupId).then((res) => {
          this.studentCardsList = res.data;
          console.log(this.studentCardsList);
        });
      });
    });
  },
};
</script>

<style lang="scss" scoped>
main {
  padding: 32px;
  width: 100%;
  background-color: white;
  border: 1px solid #e0e0e0;
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
  padding-right: 1.5em;
}

.sort-select {
  width: 55%;
}

// 课程学生卡片
.course-students-card {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  // grid-template-rows: 1fr 1fr 1fr;
}
</style>