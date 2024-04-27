<template>
  <!-- temp view for dev -->
  <main>
    <!-- 返回上一页 -->
    <v-icon>
      mdi-arrow-left
    </v-icon>
    <!-- 课程列表 -->
    <v-list
      bg-color="white"
      class="course-aside"
    >
      <v-list-item title="测试课程1" />
      <v-list-group
        v-for="chapter in CourseTreeList"
        :key="chapter.id"
        :subgroup="chapter.tasks && chapter.tasks.length ? '' : null"
      >
        <template #activator="{props}">
          <v-list-item
            :title="chapter.name"
            v-bind="props"
          />
        </template>
        <v-list-item 
          v-for="task in chapter.tasks"
          :key="task.id"
          :title="task.name"
        />
      </v-list-group>
    </v-list>

    <!-- 展示的课程,章节,任务详情 -->
    <div class="show-detail">
      1111
    </div>
  </main>
</template>

<script>
import { getCourseTaskList } from '@/api/course';
export default {
  name: 'CourseDetailView',
  data() {
    return {
      courseId: this.$route.query.id,
      CourseTreeList :[]
    };
  },
  created() {
    getCourseTaskList(this.courseId).then((res) => {
      console.log(res.data);
      this.CourseTreeList=res.data;
    });
  }
};
</script>

<style lang="scss" scoped>
  main{
    display: flex;
    height: 98%;
  }
  .course-aside{
    flex: 1;
    border: 1px solid #e0e0e0;
  }
  .show-detail{
    flex: 4;
  }
</style>