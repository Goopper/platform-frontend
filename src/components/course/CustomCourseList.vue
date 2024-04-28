<template>
  <v-list
    v-if="list"
    bg-color="white"
    class="course-aside"
  >
    <v-list-item v-if="isShow">
      <v-list-item-title>{{ courseName }}</v-list-item-title>
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
        />
      </template>
      <v-list-item
        v-for="task in section.tasks"
        :key="task.id"
        :title="task.name"
        v-bind="iconProps(task)"
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
      required: true,
    },
    studentId: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      list: [],
      isShow: false,
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
  },
  methods: {
    //获取课程列表(无进度)
    async getCourseList() {
      const res = await getCourseTaskList(this.courseId);
      this.list = res.data;
    },
    async getStudentCourseProgress() {
      const res = await getStudentCourseProgress(this.courseId, this.studentId);
      this.list = res.data;
      console.log(this.list);
    },
    iconProps(task) {
      if ('status' in task) {
        return {
          'prepend-icon': task.status
            ? 'mdi-checkbox-marked-circle-outline'
            : 'empty',
        };
      } else {
        return {};
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
</style>