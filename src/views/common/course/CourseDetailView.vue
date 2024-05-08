<template>
  <!-- temp view for dev -->
  <main>
    <!-- 返回上一页 -->
    <div v-if="isAuthority()">
      <custom-float-back-button
        :back-url="'/course/teacher'"
        class="back-button"
      />
    </div>
    <div v-else>
      <custom-float-back-button
        class="back-button"
        :back-url="'/course/student'"
      />
    </div>

    <!-- 课程列表 -->
    <div class="course-list">
      <CustomCourseStructureList
        v-if="courseId && courseName"
        :course-id="courseId"
        :course-name="courseName"
      />
    </div>

    <!-- 展示的课程,章节,任务详情 -->
    <div class="show-detail">
      <router-view />
    </div>
  </main>
</template>

<script>
import { getCourseInfo } from '@/api/course';
import CustomCourseStructureList from '@/components/course/CustomCourseStructureList.vue';
import CustomFloatBackButton from '@/components/CustomFloatBackButton.vue';
import { useUserStore } from '@/store/user';
export default {
  name: 'CourseDetailView',
  components: {
    CustomCourseStructureList,
    CustomFloatBackButton,
  },
  data() {
    return {
      courseId: null,
      courseName: null,
    };
  },
  created() {
    this.courseId = this.$route.params.id;
    getCourseInfo(this.courseId).then((res) => {
      this.courseName = res.data.name;
    });
  },
  methods: {
    isAuthority() {
      const role = useUserStore().role.name;
      if (role === 'teacher') return true;
    },
  },
};
</script>

<style lang="scss" scoped>
main {
  display: flex;
  height: 100%;

}
.show-detail {
  flex: 4;
  background-color: white;
  border:1px solid #e0e0e0;
  border-left: 0px;
}
.course-list {
  width: 20%;
  border: 1px solid #e0e0e0;
  background-color: white;
  > * {
    height: 100%;
  }
}
@media (max-width: 770px) {
  .back-button {
    display: none;
  }
}
</style>