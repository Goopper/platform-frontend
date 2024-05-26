<template>
  <div class="flex justify-start items-center gap-2 h-10">
    <!-- title -->
    <span class="text-gray-500 text-sm">
      Content-Type
    </span>
    <div class="flex gap-2">
      <v-chip
        v-for="(type, index) in types"
        :key="`content-type-${index}`"
        size="small"
        variant="outlined"
        :class="{ 'bg-primary': type === body.type }"
        @click="handleChooseType(type)"
      >
        {{ type }}
      </v-chip>
    </div>
    <div
      v-if="body.type === 'form-data'"
      class="ml-auto flex items-center"
    >
      <v-tooltip
        text="清空参数"
        location="top"
      >
        <template #activator="{ props }">
          <v-icon
            v-bind="props"
            icon="mdi-delete-outline"
            size="small"
            class="text-gray-500 hover:text-red-500"
            @click="handleCleanFormData"
          />
        </template>
      </v-tooltip>
      <v-tooltip
        text="创建参数"
        location="top"
      >
        <template #activator="{ props }">
          <v-icon
            v-bind="props"
            icon="mdi-plus"
            class="text-gray-500 hover:text-[#2c974b] ml-2"
            @click="handleAddFormData"
          />
        </template>
      </v-tooltip>
    </div>
  </div>
  <v-window
    v-model="body.type"
    class="flex-grow mt-2"
  >
    <v-window-item
      value="none"
      class="text-gray-500"
    >
      <v-icon
        class="mx-auto mt-8"
        size="x-large"
        icon="mdi-note-off-outline"
      />
      <p class="text-center text-lg">
        无请求体
      </p>
    </v-window-item>
    <v-window-item value="form-data">
      <the-form-data-content v-model="body" />
    </v-window-item>
    <v-window-item value="json">
      <the-json-content
        v-model="body"
        :theme="monacoTheme"
      />
    </v-window-item>
  </v-window>
</template>

<script setup>
import { ref } from 'vue';
import mitt from '@/plugins/mitt';

const body = defineModel({
  type: Object
});

const types = ref([
  'none',
  'form-data',
  'json',
]);

function handleChooseType(type) {
  body.value.type = type;
  if (body.value.type === 'json') {
    mitt.emit('loadJson', body.value.json);
  }
}

function handleCleanFormData() {
  mitt.emit('cleanFormData');
}

function handleAddFormData() {
  mitt.emit('addFormData');
}
</script>

<style>

</style>