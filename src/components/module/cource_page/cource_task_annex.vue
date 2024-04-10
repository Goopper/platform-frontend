<script>
import one_annex from '../widgets/one_annex.vue'
export default {
  components: { one_annex },
  data() {
    return {
      tab: null,
      "data": {
        "id": 1,
        "name": "测试任务11-仅题目",
        "content": "任务内容任务内容任务内容任务内容任务内容任务内容任务内容任务内容任务内容任务内容任务内容任务内容任务内容任务内容任务内容任务内容任务内容任务内容任务内容任务内容任务内容任务内容1",
        "status": false,
        "score": 0,
        "attachment": [
          {
            "id": 4, "filename": "1xxxxx.demo", "originalFilename": "测试附件a.demo",
            "url": "http://fake.url/fakefilename.fake", "size": 0, "type": "demo", "md5": "fffaaakkkeee2=="
          },
          {
            "id": 5, "filename": "1xxxxx.demo", "originalFilename": "测试附件a.demo",
            "url": "http://fake.url/fakefilename.fake", "size": 0, "type": "demo", "md5": "fffaaakkkeee2=="
          },
          {
            "id": 6, "filename": "1xxxxx.demo", "originalFilename": "测试附件a.demo",
            "url": "http://fake.url/fakefilename.fake", "size": 0, "type": "demo", "md5": "fffaaakkkeee2=="
          },
          {
            "id": 7, "filename": "1xxxxx.demo", "originalFilename": "测试附件a.demo",
            "url": "http://fake.url/fakefilename.fake", "size": 0, "type": "demo", "md5": "fffaaakkkeee2=="
          },
          {
            "id": 8, "filename": "1xxxxx.demo", "originalFilename": "测试附件a.demo",
            "url": "http://fake.url/fakefilename.fake", "size": 0, "type": "demo", "md5": "fffaaakkkeee2=="
          },
          {
            "id": 9, "filename": "1xxxxx.demo", "originalFilename": "测试附件a.demo",
            "url": "http://fake.url/fakefilename.fake", "size": 0, "type": "demo", "md5": "fffaaakkkeee2=="
          }
        ]
      }
    }
  },

}
</script>
<template>
  <div style="height: 50%;padding: 32px">
    <h3>{{ data.name }}</h3>
    <p>{{ data.content }}</p>
  </div>
  <v-tabs v-model="tab" align-tabs="title" style="border-bottom: 1px solid #e3e3e3;">
    <v-tab value="teaching_courseware">教学课件</v-tab>
    <v-tab value="answering_area">答题区</v-tab>
  </v-tabs>
  <v-window v-model="tab" style="height: 36%;">
    <v-window-item value="teaching_courseware" style="padding: 12px 32px">
      <div>
        <v-virtual-scroll height="300px" :items="data.attachment">
          <template v-slot:default="{ item }">
            <one_annex :annex="item" />
          </template>
        </v-virtual-scroll>
      </div>
    </v-window-item>
    <v-window-item value="answering_area" style="display: flex;height: 100%;">
      <div style="width: 50%;flex-grow: 1;border-right: 1px #e3e3e3 solid;border-bottom: 1px #e3e3e3 solid;">
        <v-textarea row="10" clearable label="Label" variant="text" auto-grow></v-textarea>
      </div>
      <div style="width: 50%;height: 100%;"></div>
    </v-window-item>
  </v-window>
  <div style="display: flex;height: 56px;">
    <v-btn>上传附件</v-btn>
    <v-btn>前往插件</v-btn>
    <v-btn>提交</v-btn>
  </div>
</template>
<style scoped>
.v-input__control {
  height: 100%;
}

template>* {
  margin: 32px;
}
</style>