<template>
  <div class="flex justify-between">
    <!-- title -->
    <span class="text-gray-500 text-sm">
      响应 Headers 列表
    </span>
  </div>
  <div class="mt-2 flex flex-col overflow-y-auto border *:border-b">
    <div
      v-for="(key, index) in Object.keys(props.headers)"
      :key="`response-header-${index}`"
      class="flex flex-row last:border-b-0"
    >
      <div class="border-r w-[50%] p-2">
        {{ key }}
      </div>
      <div class="w-[50%] p-2">
        {{ props.headers[key] }}
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  headers: {
    type: Object,
    default: () => {}
  }
});
</script>

<style>

</style>