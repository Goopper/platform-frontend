<script>
import base_annex from '../base_module/base_annex.vue';
export default {
  data(){
    return{
      course: {
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
      }
    }
  },
  components: { base_annex },
  methods: {
    downloadFile(path) {
      // Create a hidden anchor element
      const link = document.createElement('a');
      link.href = path;
      link.setAttribute('download', 'file.pdf');

      // Simulate a click on the anchor element
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    },
  }
}
</script>
<template>
  <div style="margin: 32px;height: 100%;">
    <div style="display: flex;align-items: center;">
      <h1>课程名称</h1>
      <p
        style="margin-left: 10px; display: grid;place-items: center;width: 54px;height: 20px;font-size: 10px;text-align: center;border-radius: 12px;color: white;background-color: #383838;">
        课程类型</p>
    </div>
    <div style="display: flex;">
      <div>

        <p style="margin: 32px 0;">授课老师 : {{ course.teacher }}</p>
        <div style=" text-indent: 2em;">课程描述</div>
      </div>
      <v-img src="/src/assets/cource-img.png" max-width="370px" max-height="230px" style="margin-left: auto;"></v-img>
    </div>
    <p>课程附件 :</p>
    <div>
      <v-virtual-scroll height="320px" :items="course.attachment" style="margin: 32px 32px 0 32px;">
        <template v-slot:default="{ item }">
          <base_annex :annex="item" />
        </template>
      </v-virtual-scroll>
    </div>
  </div>

</template>
<style scoped>
.v-list-group__items>.v-list-item--active {
  background: #383838;
  color: white;
}

/* .v-list-group > .v-list-item--active {
  background: #383838;
  color: white;
} */
template>* {
  margin: 32px;
}
</style>