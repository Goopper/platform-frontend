<script>
export default {
  data() {
    return {
      imageUrl: '', // 用于显示已上传图片的URL
      notEmpty: [
        value => {
          if (value?.length > 0) return true
          return '不能为空  '
        }]
    };
  },
  methods: {
    handleFileUpload(event) {
      const file = event.target.files[0]; // 获取用户选择的文件
      this.imageUrl = URL.createObjectURL(file); // 显示预览图
    },
    handleImageClick() {
      // 点击已上传图片时触发input文件选择器
      this.$refs.fileInput.click();
    },
    deleteImage() {
      // 删除已上传的图片
      this.imageUrl = '';
      // 重置文件选择器，以便可以重新选择相同的图片
      this.$refs.fileInput.value = '';
    }
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
        <p style="margin-top: -24px;">课程附件&nbsp; </p>
        <v-file-input label="xxx.docx xxx.mp4(须一次写完)" prepend-icon="" variant="outlined" density="compact" clearable multiple counter>
        </v-file-input>
      </v-col></v-row>
    <v-row class="det_row"><v-col>
        <p>课程描述<span>*</span></p>
        <v-textarea placeholder="课程内容" variant="outlined" :rules="notEmpty"></v-textarea>
      </v-col>
      <v-col>
        <p>课程封面<span>*</span></p>
        <div id="upload_img">
          <label for="fileInput" class="upload-box" v-if="!imageUrl">
            封面选择
            <input type="file" id="fileInput" ref="fileInput" @change="handleFileUpload">
          </label>
          <div v-else style="display: flex;">
            <img :src="imageUrl" alt="Uploaded Image" @click="handleImageClick">
            <v-btn icon="mdi-close" variant="text" @click="deleteImage"></v-btn>
          </div>
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

.upload-box {
  display: block;
  width: 260px;
  height: 170px;
  background-color: #e3e3e3;
  text-align: center;
  line-height: 170px;
  cursor: pointer;
}

.upload-box:hover {
  background-color: #f0f0f0;
}

.upload-box input[type="file"] {
  display: none;
}

.upload-box img {
  display: block;
  width: 200px;
  height: 200px;
  object-fit: cover;
  cursor: pointer;
}
#upload_img >div> img {
  display: block;
  width: 260px;
  height: 170px;
  object-fit: cover;
  cursor: pointer;
}
#upload_img > div > .v-btn{
  width: 20px;
  height: 20px;
  font-size: 16px;
}
</style>