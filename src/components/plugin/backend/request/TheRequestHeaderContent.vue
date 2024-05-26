<template>
  <div class="flex justify-between">
    <!-- title -->
    <span class="text-gray-500 text-sm">
      额外 Headers 列表
    </span>
    <!-- action -->
    <div class="flex items-center">
      <v-tooltip
        text="清空请求头"
        location="top"
      >
        <template #activator="{ props }">
          <v-icon
            v-bind="props"
            icon="mdi-delete-outline"
            size="small"
            class="text-gray-500 hover:text-red-500"
            @click="handleCleanHeaders"
          />
        </template>
      </v-tooltip>
      <v-tooltip
        text="创建请求头"
        location="top"
      >
        <template #activator="{ props }">
          <v-icon
            v-bind="props"
            icon="mdi-plus"
            class="text-gray-500 hover:text-[#2c974b] ml-2"
            @click="handleAddHeader"
          />
        </template>
      </v-tooltip>
    </div>
  </div>
  <div class="mt-2 flex flex-col overflow-y-auto border *:border-b">
    <div
      v-for="(header, index) in headers"
      :key="`header-${index}`"
      class="flex flex-row last:border-b-0"
    >
      <v-text-field
        v-model="header.key"
        class="border-r"
        density="compact"
        placeholder="请求头名"
        variant="solo"
        theme="light"
        hide-details
        flat
        tile
      />
      <v-text-field
        v-model="header.value"
        density="compact"
        placeholder="请求头值"
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
          @click="handleRemoveHeader(index)"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { newHeaderTemplate } from '@/utils/backend-plugin';

const headers = defineModel({
  type: Array
});

function handleCleanHeaders() {
  headers.value = [newHeaderTemplate()];
}

function handleAddHeader() {
  headers.value.push(newHeaderTemplate());
}

function handleRemoveHeader(index) {
  if (headers.value.length === 1) {
    headers.value = [(newHeaderTemplate())];
    return;
  }
  headers.value.splice(index, 1);
}
</script>

<style>

</style>