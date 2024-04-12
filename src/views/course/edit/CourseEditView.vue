<script>
import edit_course_detail from '../course_page/edit_course_detail.vue';
import edit_chapter_page from '../course_page/edit_chapter_page.vue';
import edit_subsection_page from '../course_page/edit_subsection_page.vue';
export default {
  data() {
    return {
      step: 0,
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
      ]
    };
  },
  methods: {
    gotu() {
      this.step = 1

    },
    back() {
      this.step = 0
    },
    isActive() {
      return true
    }
  },
  components: {
    edit_course_detail,
    edit_chapter_page,
    edit_subsection_page

  }

}
</script>
<template>
  <div id="main_cources">
    <v-icon style="font-size: 32px;margin: 20px;">mdi-arrow-left</v-icon>
    <div id="edit_cources">
      <v-stepper v-model="step">
        <v-stepper-header style="height: 100px;">
          <v-stepper-item icon="mdi-information-outline" icon-size="48" title="课程基本信息" value="1" step="1"
            style="font-size: 20px;">
          </v-stepper-item>
          <v-divider></v-divider>
          <v-stepper-item icon=" mdi-format-list-bulleted" title="课程内容" value="2" step="2" selected-class="step_css"
            style="font-size: 20px;">
          </v-stepper-item>
        </v-stepper-header>
        <v-stepper-window style="margin: 0;">
          <v-stepper-window-item v-for="n in [1, 2]" :key="`${n}-content`">
            <edit_course_detail />
            <div class="choose_btn" v-if="step == 0">
              <v-btn class="cancel" variant="outlined" density="compact">取消</v-btn>
              <v-btn id="save" variant="outlined" density="compact" @click="gotu">保存,进入下一步</v-btn>
            </div>
          </v-stepper-window-item>
          <v-stepper-window-item id="content" v-for="n in [1, 2]" :key="`${n}-content`" style="margin: 0;">
            <div style="width: 30%;">
              <v-list open-strategy="multiple" active-strategy="single-independent" style="padding: 0;">
                <v-list-group v-for="chapter in data" :key="chapter.id" :value="chapter.id" subgroup>
                  <template v-slot:activator="{ props }">
                    <v-list-item :title="chapter.name" v-bind="props">
                    </v-list-item>
                  </template>
                  <v-list-item class="tile" v-for="task in chapter.tasks" :key="task.id" :title="task.name"
                    :value="task.name">
                  </v-list-item>
                </v-list-group>
              </v-list>
              <div id="add_content">
                <v-menu id="open_btn" location="top right" width="120px" height="80px">
                  <template v-slot:activator="{ props }">
                    <v-btn v-bind="props" width="28px" height="28px" icon="mdi-plus" variant="outlined"></v-btn>
                  </template>
                  <!-- <v-list style="padding: 0;"> -->
                  <div style="border: 1px #e3e3e3 solid;border-radius: 4px;">
                    <v-btn variant="text" block>添加任务</v-btn>
                    <v-btn variant="text" block>添加一章</v-btn>
                  </div>
                  <!-- </v-list> -->
                </v-menu>
              </div>
            </div>

            <div style="display: flex;flex-direction: column;width: 100%;">
              <div style="margin: 0 24px;">

                <!-- 编辑课程章页面 -->
                <edit_chapter_page/>

                <!-- 编辑课程任务页面 -->
                <!-- <edit_subsection_page /> -->
              
              </div>
              <div class="choose_btn" v-if="step == 1" style="margin-top: auto;">
                <v-btn id="delete" variant="outlined" density="compact">删除本块</v-btn>
                <v-btn class="cancel" variant="outlined" density="compact">取消</v-btn>
                <v-btn id="draft" variant="outlined" density="compact">保存草稿</v-btn>
                <v-btn id="back" variant="outlined" density="compact" @click="back">上一步</v-btn>
                <v-btn id="release" variant="outlined" density="compact">发布</v-btn>
              </div>
            </div>
          </v-stepper-window-item>
        </v-stepper-window>
      </v-stepper>
    </div>
  </div>
</template>
<style scoped>
.v-list {
  min-width: 180px;
  height: 540px;
  border: 1px #e3e3e3 solid;
  border-bottom: 0;
}

#add_content {
  height: 28px;
  margin: 8px;
  text-align: right;
}

#add_content>* {
  border: 2px solid;
}

#content {
  display: flex;
}

.v-stepper-window {
  margin: 0;
}

#main_cources {
  display: flex;
  margin: 22px 220px 108px 148px;
}

.v-stepper.v-sheet,
.v-stepper-header,
.choose_btn {
  box-shadow: 0 0 0 0;
  border: 1px #e3e3e3 solid;
  border-radius: 0;
}

.choose_btn {
  padding: 16px 32px 16px 0;
  background-color: #fafafa;
  text-align: right;
}

#edit_cources {
  height: 100%;
  width: 100%;
  background: white;
}

.choose_btn>* {
  margin: 0 4px;
}

.cancel {
  color: white;
  background-color: #FB8C00;
}

#save,
#release {
  color: white;
  background-color: #383838;
}

#back {
  color: white;
  background-color: #666666;
}

#delete {
  color: white;
  background-color: #FF5252;
}
</style>
