<script>
import base_annex from '../base_module/base_annex.vue'
export default {
  components: { base_annex },
  data() {
    return {
      tab: null,
      "data": {
        "id": 13,
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
  <div id="describe_name">
    <h3>{{ data.name }}</h3>
    <p>{{ data.content }}</p>
  </div>
  <v-tabs id="tabs" v-model="tab" align-tabs="title">
    <v-tab value="teaching_courseware">教学课件</v-tab>
    <v-tab value="answering_area">答题区</v-tab>
  </v-tabs>
  <v-window v-model="tab">
    <v-window-item id="annex_page" value="teaching_courseware">
      <div>
        <v-virtual-scroll height="320px" :items="data.attachment">
          <template v-slot:default="{ item }">
            <base_annex :annex="item" />
          </template>
        </v-virtual-scroll>
      </div>
    </v-window-item>
    <v-window-item id="answer" value="answering_area">
      <div>
        <div id="textarea">
          <v-textarea rows="10" clearable variant="outlined" hide-details></v-textarea>
        </div>
        <div id="annex" style="width: 60vh;">
          <v-virtual-scroll height="28vh" :items="data.attachment">
            <template v-slot:default="{ item }">
              <div style="display: flex; border: 1px solid #e3e3e3;align-items: center; margin: 0.5em;">
                <v-icon
                  style="height: 40px;width: 40px; border-radius: 4px;border: 1px #e3e3e3 solid;margin:0.25em"></v-icon>
                <div id="filename">
                  <p style="font-size: 1em;">{{ item.filename }}</p>
                  <p id="file_size" style="font-size: 0.7em;color: #666666;">文件大小 : {{ item.size }}</p>
                </div>
                <div>
                </div>
                <v-btn variant="text" style="margin-right: 16px;margin-left: auto;color: #FF5252;">删除</v-btn>
              </div>
            </template>
          </v-virtual-scroll>
        </div>
      </div>
      <div id="btn">
        <v-btn id="plugin" variant="outlined" density="comfortable">上传附件</v-btn>
        <v-btn id="plugin" variant="outlined" density="comfortable">前往插件</v-btn>
        <v-btn id="submit" variant="outlined" density="comfortable">提交</v-btn>
      </div>
    </v-window-item>
  </v-window>

</template>
<style scoped>
#describe_name {
  height: 42vh;
  padding: 2em
}

.v-tabs {
  border-bottom: 1px solid #e3e3e3;
}

.v-window {
  height: 35vh;
}

#annex_page {
  padding: 12px 32px
}

template>* {
  margin: 32px;
}

#textarea {
  width: 55vh;
  /* flex-grow: 1; */
  border-right: 1px #e3e3e3 solid;
  border-bottom: 1px #e3e3e3 solid;
}

#answer>div {
  display: flex;
}

#btn {
  height: 3.4rem;
  justify-content: right;
  align-items: center;
  background-color: #fafafa;
  border-top: #e3e3e3 1px solid;
}

#plugin {
  margin: 0 1em;
  background-color: white;
}

#submit {
  margin: 0 2em 0 1em;
  background-color: #383838;
  color: white;
}

#answer>div>#annex {
  width: 50vh;
}
</style>