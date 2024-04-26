<template>
  <div class="border p-3 flex justify-between items-center">
    <div class="border rounded p-2">
      <v-icon icon="mdi-paperclip" />
    </div>
    <span>
      {{ attachment.originalFilename }}
    </span>
    <span class="text-gray-500">
      文件大小：{{ formatBytes(attachment.size) }}
    </span>
    <v-btn
      variant="outlined"
      color="success"
      @click="downloadFile"
    >
      下载
    </v-btn>
  </div>
</template>

<script>
export default {
  name: 'CustomAttachmentCard',
  props: {
    attachment: {
      type: Object,
      required: true
    }
  },
  methods: {
    formatBytes(bytes) {
      if (bytes === 0) return '0 Bytes';
      const k = 1024;
      const sizes = ['Bytes', 'KB', 'MB', 'GB'];
      const i = Math.floor(Math.log(bytes) / Math.log(k));
      return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    },
    downloadFile() {
      const url = this.attachment.url;
      const link = document.createElement('a');
      link.setAttribute('download', this.attachment.originalFilename);
      link.click();
    }
  }
};
</script>

<style>

</style>