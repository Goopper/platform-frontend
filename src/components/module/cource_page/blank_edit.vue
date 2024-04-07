<script>
import courceDet_edit from './courceDet_edit.vue';
export default {
  data() {
    return {
      step: 0
    };
  },
  methods: {
    gotu() {
      this.step = 1

    },
    back() {
      this.step = 0
    }
  },
  components: {
    courceDet_edit
  }

}
</script>
<template>
  <div id="main_cources">
    <v-icon>mdi-arrow-left</v-icon>
    <div id="edit_cources">
      <v-stepper v-model="step">
        <v-stepper-header style="height: 100px;">
          <v-stepper-item icon="mdi-information-outline" icon-size="48" title="课程基本信息" value="1" step="1"
            style="font-size: 20px;">
          </v-stepper-item>
          <v-divider></v-divider>
          <v-stepper-item icon=" mdi-format-list-bulleted" title="课程内容" value="2" step="2" selected-class="step_css">
          </v-stepper-item>
        </v-stepper-header>
        <v-stepper-window>
          <v-stepper-window-item v-for="n in [1, 2]" :key="`${n}-content`">
            <courceDet_edit />
          </v-stepper-window-item>
          <v-stepper-window-item v-for="n in [1, 2]" :key="`${n}-content`">
          </v-stepper-window-item>
        </v-stepper-window>
      </v-stepper>
      <div id="choose_btn">
        <v-btn id="cancel" variant="outlined" density="compact">取消</v-btn>
        <v-btn id="save" variant="outlined" density="compact">保存,进入下一步</v-btn>
      </div>
    </div>
  </div>
</template>
<style scoped>
#main_cources {
  display: flex;
  margin: 22px 220px 108px 148px;
}

.v-stepper.v-sheet,
.v-stepper-header,
#choose_btn {
  box-shadow: 0 0 0 0;
  border: 1px #e3e3e3 solid;
  border-radius: 0;
}

#edit_cources {
  height: 100%;
  width: 100%;
  margin-left: 40px;
  background: white;
}

#choose_btn {
  padding: 16px 32px 16px 0;
  background-color: #fafafa;
  text-align: right;
}

#cancel {
  margin-right: 16px;
  color: white;
  background-color: #FB8C00;
}

#save {
  color: white;
  background-color: #383838;
}
</style>
