<template>
  <v-btn
    class="absolute left-12 top-28"
    variant="text"
    size="48"
    icon="mdi-arrow-left"
    @click="$router.back()"
  />
</template>

<script>
export default {
  name: 'CustomFloatBackButton',
};
</script>

<style>

</style>