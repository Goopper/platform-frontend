<template>
  <div class="flex">
    <!-- start -->
    <router-view class="sm:hidden grow mr-8" />
    <!-- end -->
    <div class="w-1/3 sm:w-full">
      <!-- message -->
      <div
        v-for="message in messageList" 
        :key="message.id"
      >
        <custom-message-card :message="message" />
      </div>
    </div>
  </div>
</template>

<script>
import { getMessageList } from '@/api/message';
import { useUserStore } from '@/store/user';

export default {
  name: 'HomeView',
  data: () => ({
    userStore: useUserStore(),
    messageList: [],
  }),
  computed: {
    user() {
      return this.userStore.userInfo;
    },
  },
  created() {
    getMessageList().then(res => { 
      this.messageList = res.data;
    });
  },
};
</script>

<style lang="scss" scoped>
</style>