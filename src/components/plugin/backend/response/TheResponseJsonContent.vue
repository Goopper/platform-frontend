<template>
  <div class="w-full h-full">
    <div
      id="json-response-container"
      class="w-full h-full"
    />
  </div>
</template>

<script setup>
import { onMounted, watch } from 'vue';
import * as monaco from 'monaco-editor';
import jsonWorker from 'monaco-editor/esm/vs/language/json/json.worker?worker';
import mitt from '@/plugins/mitt';

const props = defineProps({
  response: {
    type: String,
    default: ''
  }
});

mitt.on('updateMonacoTheme', (theme) => {
  monaco.editor.setTheme(theme);
});

self.MonacoEnvironment = {
  getWorker() {
    return new jsonWorker();
  }
};

onMounted(() => {
  const instance = monaco.editor.create(document.getElementById('json-response-container'), {
    value: props.response,
    language: 'json',
    theme: 'vs-dark',
    automaticLayout: true,
    readOnly: true,
    wordWrap: 'on'
  });

  watch(() => props.response, (response) => {
    instance.setValue(response);
  });
});
</script>