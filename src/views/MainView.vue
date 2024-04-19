<template>
  <div id="main">
    <the-header />
    <router-view />
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
