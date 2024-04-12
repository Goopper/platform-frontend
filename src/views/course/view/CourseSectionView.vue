<script>
import one_chapter_task from '../widgets/one_chapter_task.vue'
export default {
  data() {
    return {
      "tasks": {
        "id": 3,
        "name": "章节一: 测试章节11",
        "desc": "章节内容章节内容章节内容章节内容章节内容章节内容章节内容章节内容章节内容章节内容章节内容章节内容章节内容章节内容章节内容章节内容章节内容章节内容章节内容章节内容章节内容章节内容章节内容章节内容章节内容章节内容章节内容章节内容章节内容章节内容章节内容章节内容章节内容章节内容章节内容章节内容章节内容章节内容章节内容章节内容",
        "tasks": [
          { "id": 1, "name": "测试任务11-仅题目", "status": true, "score": 0 },
          { "id": 6, "name": "测试任务2-仅题目", "status": false, "score": 0 },
          { "id": 7, "name": "测试任务3-仅题目", "status": false, "score": 0 },
          { "id": 8, "name": "测试任务4-仅题目", "status": false, "score": 0 },
          { "id": 9, "name": "测试任务5-仅题目", "status": false, "score": 0 }
        ]
      }
    }
  },
  components: {
    one_chapter_task
  }
}
</script>
<template>
  <h3>{{ tasks.name }}</h3>
  <p style="margin: 32px 0;">{{ tasks.desc }}</p>
  <h3>任务目标 :</h3>
  <div style="margin:2em 3em">
    <div v-for="task in tasks.tasks" :key="task.id">
      <one_chapter_task :task="task" />
    </div>
  </div>
</template>
<style scoped>

</style>