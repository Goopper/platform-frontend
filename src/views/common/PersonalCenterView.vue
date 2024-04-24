<template>
  <div class="flex">
    <!-- menu -->
    <div class="w-[15%] mr-8">
      <v-tabs
        color="primary"
        direction="vertical"
      >
        <v-tab to="/personal">
          <v-icon>
            mdi-account
          </v-icon>
          个人资料
        </v-tab>
        <v-tab to="/personal/security">
          <v-icon>
            mdi-lock
          </v-icon>
          安全管理
        </v-tab>
        <v-tab to="/personal/message">
          <v-icon>
            mdi-message
          </v-icon>
          消息中心
        </v-tab>
      </v-tabs>
    </div>
    <!-- cards -->
    <router-view class="flex-grow overflow-y-auto" />
  </div>
</template>

<script>
import { useUserStore } from '@/store/user';

export default {
  name: 'PersonalCenterView',
  data: () => ({
    userStore: useUserStore(),
  }),
  computed: {
    user() {
      return this.userStore.userInfo;
    },
  }
};
</script>

<style lang="scss" scoped>
.v-tab--selected {
  background-color: #e3e3e3;
}
.v-tab {
  font-weight: bold;
  font-size: 1.025em;
  .v-icon {
    margin-right: 8px;
  }
}
</style>