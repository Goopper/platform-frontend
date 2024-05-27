<template>
  <div class="w-full h-full">
    <custom-code-editor
      v-model="readonlyContent"
      language="json"
      disabled
    />
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';

const props = defineProps({
  response: {
    type: String,
    default: ''
  }
});
const readonlyContent = ref(props.response);

watch(() => props.response, (response) => {
  readonlyContent.value = response;
});
</script>