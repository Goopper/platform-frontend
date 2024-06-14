<template>
  <div class="w-full h-full">
    <div
      id="banner"
      class="w-full h-full overflow-y-hidden"
    />
  </div>
</template>

<script>
import { drawBanner } from '@/plugins/p5-banner';

export default {
  mounted() {
    this.draw();
  },
  methods: {
    draw() {
      try {
        drawBanner('banner');
      } catch (error) {
        console.log(error);
      }
    }
  },
};
</script>

<style>

</style>