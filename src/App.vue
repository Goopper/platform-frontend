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
    <v-overlay
      v-model="globalLoading"
      persistent
      color="white"
      opacity="0.8"
      class="flex flex-col justify-center items-center"
    >
      <div class="flex flex-col justify-center items-center">
        <v-progress-circular
          indeterminate
          :width="16"
          class="w-[15vw] h-[15vw] min-w-[200px] min-h-[200px]"
          color="primary"
        />
        <p class="text-4xl mt-4 font-bold">
          加载用户信息中
        </p>
      </div>
    </v-overlay>
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
      userStore: useUserStore(),
      globalLoading: false
    };
  },
  mounted: function () {
    // create a global event bus
    mitt.on('showToast', this.showToast);
    mitt.on('globalLoading', () => {
      this.globalLoading = !this.globalLoading;
    });
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