<template>
  <div class="h-screen flex flex-col">
    <the-header class="sm:order-last max-h-20" />
    <router-view class="bsm:py-8 bsm:px-32 flex-grow overflow-y-auto lg:px-8 sm:px-2 sm:py-0 sm:pt-2" />
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
