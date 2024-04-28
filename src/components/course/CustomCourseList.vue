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
      />
    </v-list-group>
  </v-list>
</template>
<script>
import { getCourseTaskList } from '@/api/course';
export default {
  props:{
    courseId: {
      type: Array,
      required: true,
    },
    courseName: {
      type: String,
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
    this.getCourseList();
    if(this.courseName){
      this.isShow = true;
    }
  },
  methods: {
        //获取课程列表
    async getCourseList() {
      const res = await getCourseTaskList(this.courseId);
      this.list = res.data;

    }
  },
};
</script>