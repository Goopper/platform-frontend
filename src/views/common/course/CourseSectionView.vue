<template>
  <main>
    <div class="section-main">
      <h1>{{ section.name }}</h1>
      <p>{{ section.desc }}</p>
    </div>
    <div class="task_target">
      <h2>任务目标 :</h2>
      <div
        v-if="section.tasks && section.tasks.length > 0"
        class="task"
      >
        <v-checkbox
          v-for="task in section.tasks"
          :key="task"
          v-model="task.status"
          class="task-item"
          :label="task.name"
          hide-details
          density="comfortable"
          readonly
        />
      </div>
      <div v-else>
        当前章节没有任务
      </div>
    </div>
  </main>
</template>
<script>
import { getSectionDetail } from '@/api/course';
export default {
  name: 'CourseSectionView',
  data() {
    return {
      sectionId: null,
      section: [],
    };
  },
  watch: {
    $route: 'fetchData',
  },
  created() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      this.sectionId = this.$route.params.sectionId;
      getSectionDetail(this.sectionId).then((res) => {
        this.section = res.data;
      });
    },
  },
};
</script>
<style lang="scss" scoped>
main {
  background-color: white;
  height: 98%;
  border: 1px solid #e0e0e0;
  display: flex;
  flex-direction: column;
  padding: 2em;
}
.section-main{
  height: 30%;
  p{
    height: 70%;
    overflow: auto;
  }
}
h1 {
  margin-bottom: 2em;
  font-size: 1em;
  font-weight: bold;
}
.task_target {
  height: 60%;
  h2 {
    font-weight: bold;
    padding: 2em 0;
  }
  .task {
    height: 80%;
    overflow: auto;
  }
}
.task-item {
  border: 1px solid #e0e0e0;
}
</style>