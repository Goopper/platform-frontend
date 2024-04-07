<script>
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
  }

}
</script>
<template>
  <div id="main_cource">
    <v-icon>mdi-arrow-left</v-icon>
    <div id="edit_cource">
      <v-stepper v-model="step">
        <v-stepper-header>
          <v-stepper-item icon="mdi-information-outline" title="课程基本信息" value="1" step="1">
          </v-stepper-item>
          <v-divider></v-divider>
          <v-stepper-item icon=" mdi-format-list-bulleted" title="课程内容" value="2" step="2">
          </v-stepper-item>
        </v-stepper-header>
        <v-stepper-window>
          <v-stepper-window-item v-for="n in [1, 2]" :key="`${n}-content`">
          </v-stepper-window-item>
          <v-stepper-window-item v-for="n in [1, 2]" :key="`${n}-content`">
          </v-stepper-window-item>
        </v-stepper-window>
      </v-stepper>
    </div>
  </div>
</template>
<style>
#main_cource {
  display: flex;
  margin: 22px 220px 108px 148px;
}

#edit_cource {
  height: 100%;
  width: 100%;
  margin-left: 40px;
  background: white;
}
</style>
