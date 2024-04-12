<script>
import router from '@/router';

export default {
  data() {
    return {
      data: [
        {
          "id": 7,
          "name": "章节三:测试章节3",
          "tasks": [
            { "id": 13, "name": "测试任务1-仅题目", "status": false, "score": null },
            { "id": 14, "name": "测试任务2-仅题目", "status": false, "score": null },
            { "id": 15, "name": "测试任务3-仅题目", "status": false, "score": null }
          ]
        },
        {
          "id": 8,
          "name": "章节三:测试章节4",
          "tasks": [
            { "id": 16, "name": "测试任务4-仅题目", "status": false, "score": null },
            { "id": 17, "name": "测试任务5-仅题目", "status": false, "score": null },
            { "id": 18, "name": "测试任务6-仅题目", "status": false, "score": null }
          ]
        }
      ],
    }
  },
  methods: {
    detail() {
      router.push('/course/detail')
    },
    chapter() {
      router.push('/course/chapter')
    },
    task() {
      router.push('/course/task')
    }
  }
}
</script>
<template>
  <div style="background-color: white;border: 1px #e3e3e3 solid;width: 16%;">
    <v-list open-strategy="multiple" active-strategy="single-independent" style="padding: 0;">
      <v-list-group v-for="chapter in data" :key="chapter.id" :value="chapter.id" subgroup>
        <template v-slot:activator="{ props }">
          <v-list-item :title="chapter.name" v-bind="props" :to="`/teacher/edit/chapter/${chapter.id}`">
          </v-list-item>
        </template>
        <v-list-item class="tile" v-for="task in chapter.tasks" :key="task.id" :title="task.name" :value="task.name"
          :to="`/teacher/edit/task/${task.id}`">
        </v-list-item>
      </v-list-group>
    </v-list>
  </div>
</template>
<style scoped>
.v-list-group__items>.v-list-item--active {
  background: #383838;
  color: white;
}
</style>