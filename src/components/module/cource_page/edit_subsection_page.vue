<script>
export default {
  data() {
    return {
      task_depict: ['无需提交', '大题提交', '插件提交', '两者都提交'],
      sub_method: null,
      selectedOption2: null,
      isDis: false,
      notEmpty: [
        value => {
          if (value?.length > 0) return true
          return '不能为空'
        }]
    }
  },
  watch: {
    sub_method(new_value,old_value) {
      console.log(new_value)
      if (new_value === '无需提交' || new_value === '大题提交') {
        this.isDis = true;
      } else {
        this.isDis = false;
      }
    }
  },
  props:['step']
}

</script>
<template>
  <v-col>
    <p style="margin-top: -24px;">任务名称<span>*</span></p>
    <v-text-field placeholder="任务名称" variant="outlined" density="compact" :rules="notEmpty"></v-text-field>
  </v-col>
  <v-col style="align-items: normal;">
    <p>任务描述<span>*</span></p>
    <v-textarea placeholder="任务内容" variant="outlined" :rules="notEmpty"></v-textarea>
  </v-col>
  <v-col>
    <p style="margin-top: -24px;">任务附件&nbsp; </p>
    <v-file-input label="xxx.docx xxx.mp4(须一次写完)" prepend-icon="" variant="outlined" density="compact" clearable
      multiple counter>
    </v-file-input>
  </v-col>
  <v-col>
    <p style="margin-top: -24px;">提交方式&nbsp; </p>
    <v-select placeholder="提交方式" :items=task_depict variant="outlined" density="compact" :rules="notEmpty"
      v-model="sub_method"></v-select>
  </v-col>
  <v-col id="two_select">
    <p style="margin-top: -24px;">插件选择&nbsp; </p>
    <v-select placeholder="无需插件" :items="['California']" variant="outlined" density="compact" :rules="notEmpty"
      :disabled=isDis v-model="selectedOption2"></v-select>
    <v-select style="padding-left: 8px;" placeholder="插件任务" :items="['California']" variant="outlined" density="compact"
      :rules="notEmpty" :disabled=isDis></v-select>
  </v-col>
</template>
<style scoped>
p>span {
  color: red
}

.v-col {
  display: flex;
  align-items: center;
}

.v-col>p {
  margin-right: 10px;
}
</style>