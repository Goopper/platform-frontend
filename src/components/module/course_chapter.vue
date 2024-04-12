<script>
export default {
  data() {
    return {
      "tasks": {
        "id": 7,
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
  }
}
</script>
<template>
  <h3>{{ tasks.name }}</h3>
  <p style="margin: 32px 0;">{{ tasks.desc }}</p>
  <h3>任务目标 :</h3>
  <div style="margin:2em 3em">
    <div v-for="task in tasks.tasks" :key="task.id">
      <div id="box" style=" border: 1px solid #e3e3e3;">
    <v-checkbox id="check" style="margin-top: auto;margin-bottom: auto;" label="task.name" v-model="task.status" readonly hide-details></v-checkbox>
  </div>
    </div>
  </div>
</template>
<style scoped>
label{
  margin-right: 32px;
}
</style>