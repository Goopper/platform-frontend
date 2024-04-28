<template>
  <main>
    <!-- 返回上一页 -->
    <custom-float-back-button />
    <!-- 主要 -->
    <div
      v-if="studentInfo"
      class="detail-main"
      :data="studentInfo"
    >
      <!-- 用来左右布局 -->
      <div class="user-msg">
        <img
          :src="studentInfo.avatar"
          alt="学生头像"
        >
        <!-- 学生信息 -->
        <div class="student-info">
          <strong> {{ studentInfo.name }}</strong>
          <div class="basic-info">
            <span><v-icon>mdi-card-account-details</v-icon> 学号 :
              {{ studentInfo.number }}</span>
            <span v-if="studentInfo.sex"><v-icon>mdi-gender-male-female</v-icon> 性别 : 男</span>
            <span v-else><v-icon>mdi-gender-male-female</v-icon>性别 : 女</span>
            <span><v-icon>mdi-account-group</v-icon> 小组 :
              {{ studentInfo.groupName }}</span>
          </div>
          <!-- 修改按钮 -->
          <div class="modify-button">
            <v-btn> 修改用户密码 </v-btn>
            <v-menu
              open-on-click
              class="menu"
            >
              <template #activator="{ props }">
                <div v-bind="props">
                  <v-icon>mdi-dots-vertical</v-icon>
                </div>
              </template>
              <v-list>
                <v-list-item>
                  <v-btn @click="completeCourseProgress">
                    完成所有课程
                  </v-btn>
                </v-list-item>
                <v-list-item>
                  <v-btn @click="emptyCourseProgress">
                    清空课程进度
                  </v-btn>
                </v-list-item>
                <v-list-item>
                  <v-btn block>
                    删除学生
                  </v-btn>
                </v-list-item>
              </v-list>
            </v-menu>
          </div>
        </div>
      </div>
      <CustomHorizontalCourseCard
        v-if="courseDetail"
        :course="courseDetail"
        show-progress
      />
      <div class="course-list">
        <CustomCourseListVue 
          :course-id="courseId"
        />
      </div>
    </div>
  </main>
</template>
<script>
import CustomHorizontalCourseCard from '@/components/CustomHorizontalCourseCard.vue';
import CustomCourseListVue from '@/components/course/CustomCourseList.vue';
import { getStudentRecentCourse } from '@/api/course';
import { getStudentInfo } from '@/api/user';
import CustomFloatBackButton from '@/components/CustomFloatBackButton.vue';
export default {
  name: 'StudentDetailView',
  components: {
    CustomHorizontalCourseCard,
    CustomCourseListVue,
    CustomFloatBackButton,
  },
  data() {
    return {
      studentId: null,
      courseId: null,
      courseDetail: null,
      studentInfo: null,
      CourseTreeList: [],
    };
  },
  created() {
    this.studentId = this.$route.query.studentId;
    this.courseId = this.$route.query.courseId;
    console.log(this.studentId);
    // 获取学生学习进度详情
    getStudentRecentCourse(this.studentId).then((res) => {
      this.courseDetail = res.data;
    });
    getStudentInfo(this.studentId).then((res) => {
      this.studentInfo = res.data;
    });
  },
  methods: {
    //清空课程进度
    emptyCourseProgress() {
      this.courseDetail.finishedTask = 0;
    },
    completeCourseProgress() {
      this.courseDetail.finishedTask = this.courseDetail.totalTask;
    },
    deleteStudent() {
      console.log(this.studentInfo);
    }
  }
};
</script>
<style lang="scss" scoped>
main {
  display: flex;
  justify-content: center;
  height: 100%;
}
.detail-main {
  width: 53.5em;
}
.user-msg {
  display: flex;
}
// 头像
img {
  width: 16%;
  border-radius: 5em;
}
//学生名字
strong {
  font-size: 1.5em;
}
// 学生基本信息
.student-info {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding-left: 4em;
  width: 100%;
}
.basic-info {
  display: flex;
  justify-content: space-between;
  i {
    padding: 0 1em;
  }
}
.modify-button {
  display: flex;
  align-content: center;
  .v-btn {
    box-shadow: none;
  }
  .v-icon{
    height: 1.5em;
    width: 1.5em;
  }
  .v-icon:hover {
    cursor: pointer;
  }
}
.detail-main > * {
  margin: 1em 0;
}
.course-list{
  height: 50%;
  overflow: auto;
  border: 1px solid #e0e0e0;
  > * {
    height: 100%;
  }
}
</style>