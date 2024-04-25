<template>
  <main>
    <!-- 返回上一页 -->
    <v-icon> mdi-arrow-left </v-icon>
    <!-- 主要 -->
    <div class="detail-main">
      <div
        class="user-msg"
        :data="StudentInfo"
      >
        <img
          :src="StudentInfo.avatar"
          alt="学生头像"
        >
        <!-- 学生三项信息 -->
        <div class="user-dis">
          <strong> {{ StudentInfo.name }}</strong>
          <div class="basic-info">
            <span>学号 : {{ StudentInfo.number }}</span>
            <span v-if="StudentInfo.sex"><v-icon>mdi-gender-male-female</v-icon> 性别 : 男</span>
            <span v-else><v-icon>mdi-gender-male-female</v-icon>性别 : 女</span>
            <span>小组 : {{ StudentInfo.groupName }}</span>
          </div>
        </div>
      </div>
      <div class="course-progress-list">
        <v-list> 1 </v-list>
      </div>
    </div>
  </main>
</template>
<script>
import { getStudentRecentCourse } from '@/api/course';
import { getStudentInfo } from '@/api/user';
export default {
  name: 'StudentDetailView',
  data() {
    return {
      StudentId: null,
      CourseId: null,
      StudentDetail: null,
      StudentInfo: [],
    };
  },
  created() {
    this.StudentId = this.$route.query.studentId;
    this.CourseId = this.$route.query.courseId;
    // 获取学生学习进度详情
    getStudentRecentCourse(this.StudentId).then((res) => {
      this.StudentDetail = res.data.course;
      console.log(res.data.course);
    });
    getStudentInfo(this.StudentId).then((res) => {
      this.StudentInfo = res.data;
      console.log(this.StudentInfo);
    });
  },
};
</script>
<style lang="scss" scoped>
main {
  display: flex;
  justify-content: center;
}
.detail-main {
  width: 53.5em;
}
.user-msg {
  display: flex;
}
img{
  width: 16%;
  border-radius: 5em;
}
strong{
  font-size: 1.5em;
}
</style>