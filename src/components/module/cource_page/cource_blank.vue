<script>
import cource_details from './cource_details.vue';  
import cource_chapter from './cource_chapter.vue';
import cource_task_annex from './cource_task_annex.vue';
export default {
  data() {
    return {
      cource: {
        "id": 3,
        "name": "测试课程1",
        "teacher": "教师1",
        "type": "测试类型",
        "desc": "测试课程描述",
        "cover": "default.jpg",
        "totalTask": 8,
        "attachment": [
          {
            "id": 3, "filename": "dawdawddaw.demo", "originalFilename": "测试附件.demo",
            "url": "http://fake.url/fakefilename.fake", "size": 0, "type": "demo", "md5": "fffaaakkkeee=="
          },
          {
            "id": 4, "filename": "1xxxxx.demo", "originalFilename": "测试附件a.demo",
            "url": "http://localhost:3000/[object%20PointerEvent]", "size": 0, "type": "demo", "md5": "fffaaakkkeee2=="
          },
          {
            "id": 5, "filename": "2xxxxx.demo", "originalFilename": "测试附件a.demo",
            "url": "http://localhost:3000/[object%20PointerEvent]", "size": 0, "type": "demo", "md5": "fffaaakkkeee2=="
          },
          {
            "id": 6, "filename": "2xxxxx.demo", "originalFilename": "测试附件a.demo",
            "url": "http://localhost:3000/[object%20PointerEvent]", "size": 0, "type": "demo", "md5": "fffaaakkkeee2=="
          },
          {
            "id": 7, "filename": "2xxxxx.demo", "originalFilename": "测试附件a.demo",
            "url": "http://localhost:3000/[object%20PointerEvent]", "size": 0, "type": "demo", "md5": "fffaaakkkeee2=="
          }
        ]
      },
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
  components: {
    cource_details,
    cource_chapter,
    cource_task_annex
  }
}
</script>
<template>
  <div style="display: flex;justify-content: center; margin: 32px 0;height: 70%;">
    <v-icon style="font-size: 32px;margin: 20px;">mdi-arrow-left</v-icon>
    <div style="background-color: white;border: 1px #e3e3e3 solid;width: 16%;">
      <v-list open-strategy="multiple" active-strategy="single-independent" style="padding: 0;">
        <v-list-item style="border: 1px #e3e3e3 solid;">
          <v-list-item-title>
            {{ cource.name }}
          </v-list-item-title>
        </v-list-item>
        <v-list-group v-for="chapter in data" :key="chapter.id" :value="chapter.id" subgroup>
          <template v-slot:activator="{ props }">
            <v-list-item :title="chapter.name" v-bind="props">
            </v-list-item>
          </template>
          <v-list-item class="tile" v-for="task in chapter.tasks" :key="task.id" :title="task.name" :value="task.name">
          </v-list-item>
        </v-list-group>
      </v-list>
    </div>
    <div style="background-color: white;width: 64%;;border: 1px #e3e3e3 solid;border-left: 0px;">

      <!-- <cource_details :data="data" :cource="cource"/> -->
      <!-- <cource_chapter/> -->
      <cource_task_annex/>
      
    
    </div>
  </div>
</template>
<style>
.v-list-group__items>.v-list-item--active {
  background: #383838;
  color: white;
}
</style>