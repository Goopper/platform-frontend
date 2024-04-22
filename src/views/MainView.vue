<template>
  <div class="h-screen flex flex-col">
    <the-header class="sm:order-last min-h-20 h-20" />
    <router-view class="py-8 px-32 sm:p-4 flex-grow overflow-y-auto" />
  </div>
</template>

<script>
import TheHeader from '@/components/TheHeader.vue';

export default {
  name: 'MainView',
  components: {
    TheHeader
  },
};
</script>

<style scoped>

</style>
