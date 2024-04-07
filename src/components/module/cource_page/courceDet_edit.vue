<script>
export default {
  data() {
    notEmpty: [
      value => {
        if (value?.length > 0) return true
        return 'qwe'
      }]
    file: []
  }
}
</script>
<template>
  <v-container id="cource_det">
    <v-row><v-col>
        <p style="margin-top: -24px;">课程名称<span>*</span></p>
        <v-text-field placeholder="课程名称" variant="outlined" density="compact" :rules="notEmpty"></v-text-field>
      </v-col>
      <v-col>
        <p style="margin-top: -24px;">课程类型<span>*</span></p>
        <v-select placeholder="课程类型" :items="['California']" variant="outlined" density="compact"
          :rules="notEmpty"></v-select>
      </v-col></v-row>
    <v-row><v-col>
        <p style="margin-top: -24px;">授课老师<span>*</span></p>
        <v-select placeholder="老师名称" :items="['California']" variant="outlined" density="compact"
          :rules="notEmpty"></v-select>
      </v-col>
      <v-col>
        <p style="margin-top: -24px;">课程附件</p>
        <v-file-input label="xxx.docx xxx.mp4" v-model="files" prepend-icon="" variant="outlined" density="compact"
          clearable multiple counter>
          <template v-slot:selection="{ fileNames }">
            <template v-for="(fileName, index) in fileNames" :key="fileName">
              <v-chip v-if="index < 2" class="me-2" color="deep-purple-accent-4" size="small" label>
                {{ fileName }}
              </v-chip>
              <span v-else-if="index === 2" class="text-overline text-grey-darken-3 mx-2">
                +{{ files.length - 2 }} File(s)
              </span>
            </template>
          </template>
        </v-file-input>
      </v-col></v-row>
    <v-row class="det_row"><v-col>
        <p>课程描述<span>*</span></p>
        <v-textarea placeholder="课程内容" variant="outlined" :rules="notEmpty"></v-textarea>
      </v-col>
      <v-col>
        <p>课程封面<span>*</span></p>
        <div style="width: 260px;">
          <v-file-input height="172px" prepend-icon="" variant="outlined" clearable prepend-inner-icon="mdi-plus"
            center-affix="true" tile="true" :rules="notEmpty"></v-file-input>
        </div>
      </v-col></v-row>
  </v-container>
</template>
<style scoped>
p>span {
  color: red
}

.v-col {
  display: flex;
  align-items: center;
  margin: 0 0 40px 15px;
}

.v-col>p {
  margin-right: 10px;
}

.det_row>* {
  align-items: normal;
}

</style>