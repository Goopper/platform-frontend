<template>
  <div 
    id="the-header" 
    class="flex items-center justify-between h-20 px-8"
  >
    <!-- logo -->
    <div
      class="h-2/3 w-1/6"
    >
      <img
        class="h-full cursor-pointer"
        alt="Goopper"
        src="../../logo.svg"
        @click="$router.push('/')"
      >
    </div>
    <!-- tab menu -->
    <div class="flex items-center justify-center w-1/2">
      <v-tabs>
        <v-tab to="/">
          首页
        </v-tab>
        <v-tab to="/course">
          课程
        </v-tab>
        <v-tab to="/personal">
          个人中心
        </v-tab>
      </v-tabs>
    </div>
    <div
      class="h-2/3 flex items-center justify-end w-1/6 space-x-2"
    >
      <!-- message -->
      <v-badge 
        v-if="hasNewMessage" 
        color="error" 
        dot 
      >
        <v-icon
          icon="mdi-bell-outline"
          size="large"
        />
      </v-badge>
      <v-icon
        v-else
        icon="mdi-bell-outline"
        size="large"
      />
      <!-- username -->
      <span class="text-h6">
        {{ user.name }}
      </span>
      <!-- avatar -->
      <img 
        id="avatar"
        alt="头像"
        class="cursor-pointer h-full"
        src="../assets/img/avatar/default.svg" 
      >
      <!-- hover menu -->
      <v-menu
        open-on-hover
        activator="#avatar"
      >
        <v-list>
          <v-list-item>
            <v-list-item-title>
              {{ user.name }}
            </v-list-item-title>
            <v-list-item-subtitle>
              {{ user.email }}
            </v-list-item-subtitle>
          </v-list-item>
          <!-- actions start -->
          <v-list-item>
            <v-btn
              variant="text"
              block
            >
              设置
            </v-btn>
          </v-list-item>
          <v-list-item>
            <v-btn
              variant="text"
              block
              @click="logout"
            >
              退出登录
            </v-btn>
          </v-list-item>
          <!-- actions end -->
        </v-list>
      </v-menu>
    </div>
  </div>
</template>

<script>
import mitt from '@/plugins/mitt';
import { useUserStore } from '@/store/user';

export default {
  name: 'TheHeader',
  data: () => ({
    userStore: useUserStore(),
    hasNewMessage: false,
  }),
  computed: {
    user() {
      return this.userStore.userInfo || {};
    },
    roleName() {
      const name = this.userStore.roleInfo.name;
      if (name === 'admin') return 'teacher';
      return name || '';
    }
  },
  methods: {
    logout() {
      mitt.emit('unauthorized');
    }
  }
};
</script>

<style lang="scss" scoped>
.v-tab--selected {
  background-color: var(--custom-primary);
  color: var(--custom-secondary) !important;
}

#the-header {
  background-color: var(--custom-secondary);
}
</style>
