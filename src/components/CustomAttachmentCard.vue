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
    <div>
      <v-btn
        v-if="deletable"
        class="mr-3"
        variant="outlined"
        color="error"
        @click="deleteFile"
      >
        删除
      </v-btn>
      <v-btn
        variant="outlined"
        color="success"
        @click="downloadFile"
      >
        下载
      </v-btn>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CustomAttachmentCard',
  props: {
    attachment: {
      type: Object,
      required: true
    },
    deletable: {
      type: Boolean,
      default: false
    }
  },
  emits: ['deleteFile'],
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
      window.open(url, '_blank');
    },
    deleteFile() {
      this.$emit('deleteFile', this.attachment);
    }
  }
};
</script>

<style>

</style>