<template>
  <div class="w-full h-full border">
    <custom-code-editor
      v-model="body.json"
      language="json"
    />
  </div>
</template>

<script setup>
const body = defineModel({
  type: Object
});
</script>