<template>
  <div class="flex md:flex-col overflow-y-auto">
    <!-- start -->
    <router-view class="blg:flex-grow lg:mr-0 bmd:mr-8 lg:mb-8" />
    <!-- end -->
    <div
      id="message-card-area"
      class="w-1/3 min-w-96 sm:w-full sm:min-w-0 border flex flex-col bg-secondary lg:w-full lg:grow lg:min-h-[640px]"
    >
      <!-- message -->
      <div class="grow overflow-y-auto">
        <div
          v-for="message in messageList"
          :key="message.id" 
        >
          <custom-message-card
            class="border-b"
            :message="message"
          />
        </div>
      </div>
      <div
        id="message-card-action"
        class="p-2 border-t flex justify-end items-center"
      >
        <v-btn
          variant="flat"
          append-icon="mdi-arrow-right-bold"
          @click="$router.push('/message')"
        >
          查看更多
        </v-btn>
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

<style lang="scss">
.v-badge__badge {
  bottom: calc(100% - 4px) !important;
  left: calc(100% - 4px) !important;
}

#message-card-action {
  background-color: var(--custom-background);
}
</style>