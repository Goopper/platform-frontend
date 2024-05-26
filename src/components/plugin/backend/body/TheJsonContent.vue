<template>
  <div class="w-full h-full">
    <div
      id="json-body-container"
      class="w-full h-full border"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { onMounted } from 'vue';
import * as monaco from 'monaco-editor';
import jsonWorker from 'monaco-editor/esm/vs/language/json/json.worker?worker';
import mitt from '@/plugins/mitt';

const body = defineModel({
  type: Object
});
const loading = ref(false);

self.MonacoEnvironment = {
  getWorker() {
    return new jsonWorker();
  }
};

mitt.on('updateMonacoTheme', (theme) => {
  monaco.editor.setTheme(theme);
});

onMounted(() => {
  const model = monaco.editor.createModel(body.value.json, 'json');

  mitt.on('loadJson', (json) => {
    loading.value = true;
    model.setValue(json);
    loading.value = false;
  });

  const instance = monaco.editor.create(document.getElementById('json-body-container'), {
    model: model,
    language: 'json',
    theme: 'vs-dark',
    automaticLayout: true,
    wordWrap: 'on'
  });

  instance.onDidChangeModelContent(() => {
    if (!loading.value) {
      body.value.json = model.getValue();
    }
  });
});
</script>