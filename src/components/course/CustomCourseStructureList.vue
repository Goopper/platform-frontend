<template>
  <div
    v-if="isLoading"
    class="loader"
  >
    <v-progress-circular
      indeterminate
      color="primary"
    />
  </div>

  <v-list
    v-else
    bg-color="white"
    open-strategy="multiple"
    active-strategy="single-independent"
    class="course-aside"
  >
    <v-list-item
      v-if="isShow"
      :class="{ selected: selectedId === courseId }"
      @click="goToDetail()"
    >
      <v-list-item-title>
        {{ courseName }}
      </v-list-item-title>
    </v-list-item>
    <v-list-group
      v-for="section in list"
      :key="section.id"
      subgroup
    >
      <template #activator="{ props }">
        <v-list-item
          :title="section.name"
          v-bind="props"
          :class="{ selected: selectedId === section.id }"
          @click="goToSection(section.id)"
        />
      </template>
      <v-list-item
        v-for="task in section.tasks"
        :key="task.id"
        :title="task.name"
        v-bind="iconProps(task)"
        :class="{ selected: selectedId === task.id }"
        @click="goToTask(task.id,section.id)"
      >
        <v-list-item-subtitle :style="scoreColor(task.score)">
          {{ task.score }}
        </v-list-item-subtitle>
      </v-list-item>
    </v-list-group>
  </v-list>
</template>
<script>
import { getCourseTaskList, getStudentCourseProgress } from '@/api/course';
export default {
  props: {
    courseId: {
      type: String,
      required: true,
    },
    courseName: {
      type: String,
      default: undefined,
    },
    studentId: {
      type: Number,
      default: undefined,
    },
  },
  data() {
    return {
      list: [],
      iconDisplayed: 0,
      isShow: false,
      selectedId: null,
      isLoading: true,
      
    };
  },
  created() {
    if (this.studentId) {
      this.getStudentCourseProgress();
    } else {
      this.getCourseList();
    }
    if (this.courseName) {
      this.isShow = true;
    }
    //判断当前选中的是课程、章节还是任务
    if (this.$route.params.taskId) {
      this.selectedId = Number(this.$route.params.taskId);
      this.activeSection = this.selectedId;
    } else if (this.$route.params.sectionId) {
      this.selectedId = Number(this.$route.params.sectionId);
      this.activeSection = this.selectedId;
    } else {
      this.selectedId = this.courseId;
    }
  },
  methods: {
    //获取课程列表
    async getCourseList() {
      const res = await getCourseTaskList(this.courseId);
      this.list = res.data;
      this.isLoading = false;
    },
    //获取学生学习课程列表
    async getStudentCourseProgress() {
      const res = await getStudentCourseProgress(this.courseId, this.studentId);
      this.list = res.data;
      this.iconDisplayed = 1;
      this.isLoading = false;

    },
    iconProps(task) {
      if (this.iconDisplayed === 1) {
        if ('status' in task) {
          return {
            'prepend-icon': task.status
              ? 'mdi-checkbox-marked-circle-outline'
              : 'empty',
          };
        }
      }
    },
    scoreColor(score) {
      if (score) {
        if (score >= 80) {
          return { color: 'green' };
        } else if (score >= 60) {
          return { color: 'orange' };
        } else {
          return { color: 'red' };
        }
      }
    },
    //跳转到课程详情
    goToDetail() {
      if (!this.studentId) {
        this.$router.push(`/course/detail/${this.courseId}`);
      }
      this.selectedId = this.courseId;
    },
    //跳转到章节详情
    goToSection(sectionId) {
      if (!this.studentId) {
        this.$router.push(
          `/course/detail/${this.courseId}/section/${sectionId}`
        );
      }
      this.selectedId = sectionId;
    },
    //跳转到任务详情
    goToTask(taskId) {
      if (!this.studentId) {
        this.$router.push(`/course/detail/${this.courseId}/task/${taskId}`);
      }
      this.selectedId = taskId;
    },
  },
};
</script>
<style lang="scss" scoped>
.v-list-item:hover {
  cursor: pointer;
}
.v-list-item > * {
  display: flex;
  justify-content: space-between;
}
.selected {
  background-color: #383838; /* 你的颜色 */
  color: #ffffff;
}
.v-list{
 padding: 0; 
}
.loader {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>