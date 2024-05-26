<template>
  <div class="flex justify-between">
    <!-- title -->
    <span class="text-gray-500 text-sm">
      Query 参数
    </span>
    <!-- action -->
    <div class="flex items-center">
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
            @click="handleCleanParams"
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
            @click="handleAddParam"
          />
        </template>
      </v-tooltip>
    </div>
  </div>
  <!-- params form -->
  <div
    id="request-params"
    class="mt-2 flex flex-col overflow-y-auto border *:border-b"
  >
    <div
      v-for="(param, index) in params"
      :key="`param-${index}`"
      class="flex flex-row last:border-b-0"
    >
      <v-text-field
        v-model="param.key"
        class="border-r"
        density="compact"
        placeholder="参数名"
        variant="solo"
        theme="light"
        hide-details
        flat
        tile
      />
      <v-text-field
        v-model="param.value"
        density="compact"
        placeholder="参数值"
        variant="solo"
        theme="light"
        flat
        hide-details
        tile
      />
      <div class="border-l flex justify-center items-center px-2">
        <v-icon
          size="small"
          icon="mdi-close-circle-outline"
          class="text-gray-500 hover:text-red-500"
          @click="handleRemoveParam(index)"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { newParamTemplate } from '@/utils/backend-plugin';

const params = defineModel({
  type: Array
});

function handleCleanParams() {
  params.value = [newParamTemplate()];
}

function handleAddParam() {
  params.value.push(newParamTemplate());
}

function handleRemoveParam(index) {
  if (params.value.length === 1) {
    params.value = [newParamTemplate()];
    return;
  }
  params.value.splice(index, 1);
}
</script>

<style>
</style>