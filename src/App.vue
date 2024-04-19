<template>
  <v-app>
    <router-view />
    <Transition name="toast">
      <v-alert
        v-if="toastShow"
        class="toast"
        :color="toastColor"
        :icon="toastIcon"
        :title="toastTitle"
      />
    </Transition>
  </v-app>
</template>

<script>
import mitt from '@/plugins/mitt';
import { useUserStore } from './store/user';

export default {
  data: () => {
    return {
      toastShow: false,
      toastTitle: '',
      toastColor: 'info',
      toastIcon: '$info',
      userStore: useUserStore()
    };
  },
  mounted: function () {
    // create a global event bus
    mitt.on('showToast', this.showToast);
  },
  methods: {
    async showToast ({title, color, icon, duration=2000}) {
      this.toastTitle = title;
      this.toastColor = color;
      this.toastIcon = icon;
      this.toastShow = true;
      await new Promise(resolve => setTimeout(resolve, duration));
      this.toastShow = false;
    }
  }
};
</script>

<style scoped>
</style>