<template>
  <div class="w-full flex flex-col overflow-y-auto border *:border-b">
    <div
      v-for="(formData, index) in body.formData"
      :key="`formData-${index}`"
      class="flex flex-row last:border-b-0 h-11"
    >
      <v-text-field
        v-model="formData.key"
        class="border-r my-auto"
        density="compact"
        placeholder="参数名"
        variant="solo"
        theme="light"
        hide-details
        flat
        tile
      />
      <div class="w-[40%] flex items-center">
        <v-text-field
          v-if="formData.type === 'text'"
          v-model="formData.value"
          density="compact"
          placeholder="参数值"
          variant="solo"
          theme="light"
          flat
          hide-details
          tile
        />
        <v-file-input
          v-else
          v-model="formData.files"
          label="请选择文件"
          single-line
          clearable
          chips
          multiple
          flat
          density="compact"
          theme="light"
          hide-details
          prepend-icon=""
          variant="solo"
        />
      </div>
      <div class="border-l w-[10rem]">
        <v-tooltip
          activator="parent"
          location="top"
        >
          参数类型
        </v-tooltip>
        <v-select
          v-model="formData.type"
          :items="types"
          variant="solo"
          hide-details
          density="compact"
          theme="light"
          flat
          tile
        />
      </div>
      <div class="border-l flex justify-center items-center px-2">
        <v-icon
          size="small"
          icon="mdi-close-circle-outline"
          class="text-gray-500 hover:text-red-500"
          @click="handleRemoveFormData(index)"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import mitt from '@/plugins/mitt';
import { newFormDataTemplate } from '@/utils/backend-plugin';

const body = defineModel({
  type: Object
});
const types = ref([
  'text',
  'file'
]);

watch(() => body.value.formData, () => {
  mitt.emit('updateFormData', body.value.formData);
},{ deep:true });

// clean files
body.value.formData.forEach((formData) => {
  formData.files = [];
});

mitt.on('addFormData', () => {
  body.value.formData.push(newFormDataTemplate());
});

mitt.on('cleanFormData', () => {
  body.value.formData = [newFormDataTemplate()];
});

function handleRemoveFormData(index) {
  if (body.value.formData.length === 1) {
    body.value.formData = [newFormDataTemplate()];
    return;
  }
  body.value.formData.splice(index, 1);
}
</script>

<style>

</style>