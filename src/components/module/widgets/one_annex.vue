<script>
export default {
  props:['annex']
}
</script>
<template >
  <div id="annex" style="height: 64px;">
    <div id="filename" style=" display: flex; align-items: Center;">
      <div style="height: 40px;width: 40px; border-radius: 4px;border: 1px #e3e3e3 solid; margin-right: 40px;">
        <v-icon></v-icon>
      </div>
      <p>{{ annex.filename }}</p>
    </div>
    <p id="file_size" style="">文件大小 : {{ annex.size }}</p>
    <div id="btn" style="">
      <v-btn variant="text" style="margin-right: 16px;color: #4CAF50;border: 1px #e3e3e3 solid">预览</v-btn>
      <v-btn variant="text" @click="downloadFile(annex.url)"
        style="color: #2196F3;border: 1px #e3e3e3 solid">下载</v-btn>
    </div>
  </div>
</template>
<style scoped>
#annex {
  padding: 16px;
  border: 1px #e3e3e3 solid;
  display: flex;
  align-items: Center;
  margin: 8px 0
}

@media (min-width: 768px) {
  #file_size {
    position: absolute;
    left: 50%;
  }
}

#filename {
  margin-right: auto;
}

#btn {
  margin-left: auto;
}

</style>