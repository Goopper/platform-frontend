<template>
  <main>
    <!-- 返回上一页 -->
    <div class="back-button">
      <custom-float-back-button />
    </div>
    <!-- 主要 -->
    <div
      v-if="studentInfo"
      class="detail-main"
      :data="studentInfo"
    >
      <!-- 用来左右布局 -->
      <div class="user-msg">
        <v-img
          :src="studentInfo.avatar"
          alt="学生头像"
        />
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
            <v-dialog
              persistent
              max-width="300"
            >
              <template #activator="{ props: activatorProps }">
                <v-btn
                  v-bind="activatorProps"
                >
                  修改用户密码
                </v-btn>
              </template>
              <template #default="{ isActive }">
                <v-card
                  title="输入密码" 
                  color="white"
                >
                  <v-card-text>
                    <v-text-field
                      v-model="password"
                      :rules="passwordRules"
                      density="comfortable"
                      variant="outlined"
                      label="请输入新密码"
                      type="text"
                    />
                    <v-text-field
                      v-model="confirmPassword"
                      :rules="confirmPasswordRules"
                      density="comfortable"
                      variant="outlined"
                      label="再次输入新密码"
                      type="text"
                    />
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer />
                    <v-btn
                      text
                      @click="
                        password = '',
                        confirmPassword = '',
                        isActive.value = false"
                    >
                      取消
                    </v-btn>
                    <v-btn
                      id="apply-success"
                      text
                      @click="
                        changePassword(),
                        (isActive.value = false)
                      "
                    >
                      确定
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </template>
            </v-dialog>
          </div>
        </div>
      </div>
      <CustomHorizontalCourseCard
        v-if="courseDetail"
        :course="courseDetail"
        show-progress
      />
      <div class="course-list">
        <CustomCourseStructureList 
          :course-id="courseId"
          :student-id="studentInfo.id"
        />
      </div>
    </div>
    <div
      v-else
      class="loader"
    >
      <v-progress-circular
        color="primary"
        size="160"
        :width="8"
        indeterminate
      />
    </div>
  </main>
</template>
<script>
import CustomHorizontalCourseCard from '@/components/CustomHorizontalCourseCard.vue';
import CustomCourseStructureList from '@/components/course/CustomCourseStructureList.vue';
import { getStudentRecentCourse } from '@/api/course';
import { getStudentInfo } from '@/api/user';
import { changePassword } from '@/api/student';
import CustomFloatBackButton from '@/components/CustomFloatBackButton.vue';
import mitt from '@/plugins/mitt';
export default {
  name: 'StudentDetailView',
  components: {
    CustomHorizontalCourseCard,
    CustomCourseStructureList,
    CustomFloatBackButton,
  },
  data() {
    return {
      studentId: null,
      courseId: null,
      courseDetail: null,
      studentInfo: null,
      CourseTreeList: [],
      // 密码相关
      password: '',
      confirmPassword: '',
      passwordRules: [
        value => !!value || '密码是必填项'
    ],
      confirmPasswordRules: [
        value => !!value || '确认密码是必填项',
        value => value === this.password || '两次输入的密码不一致',
      ],
    loading: true,
    };
  },
  created() {
    this.studentId = this.$route.query.studentId;
    this.courseId = this.$route.query.courseId;
    // 获取学生学习进度详情
    getStudentRecentCourse(this.studentId).then((res) => {
      this.courseDetail = res.data;
      this.loading = false;
    });
    getStudentInfo(this.studentId).then((res) => {
      this.studentInfo = res.data;
      this.loading = false;
    });
  },
  methods: {
    //修改密码
    changePassword() {
      if (this.password !== this.confirmPassword) {
        mitt.emit('showToast', { title: '密码不一致', color: 'error', icon: '$error' });
      } else {
        const data = new FormData();
        data.append('password', this.password);
        data.append('uid', this.studentInfo.id);
        changePassword(data);
      }
    },
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
.v-img {
  width: 16%;
  height: 16%;
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
  background-color: white;
  > * {
    height: 100%;
  }
}
.loader {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50vh;
}
@media (max-width: 800px) {
  .student-info{
    padding-left: 20px;
  }
}
@media (max-width: 770px){
  .back-button{
    display: none;
  }
}
@media (max-width: 600px) {
  .v-img{
    display: none;
  }
  .basic-info .v-icon{
    display: none;
  }
}
</style>