<template>
  <div>
    <router-view />
    <!-- message -->
    <div
      v-for="message in messageList" 
      :key="message.id"
    >
      {{ message }}
      <custom-message-card :message="message" />
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