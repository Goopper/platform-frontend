<template>
  <div 
    id="the-header" 
    class="flex items-center justify-between px-8 sm:border-t bsm:border-b"
  >
    <!-- logo -->
    <div
      class="h-2/3 w-1/6 sm:hidden grow"
    >
      <img
        class="h-full cursor-pointer"
        alt="Goopper"
        src="/logo.svg"
        @click="$router.push('/')"
      >
    </div>
    <!-- tab menu -->
    <div class="flex items-center justify-center w-1/2 sm:w-full sm:h-full grow">
      <v-tabs
        class="sm:w-full sm:h-full"
      >
        <v-tab
          class="sm:w-1/2"
          to="/"
        >
          首页
        </v-tab>
        <v-tab
          class="sm:hidden"
          to="/course"
        >
          课程
        </v-tab>
        <v-tab
          class="sm:w-1/2"
          to="/personal"
        >
          个人中心
        </v-tab>
        <v-tab
          v-if="userStore.isTeacher"
          class="sm:hidden"
          to="/data/analysis"
        >
          数据分析
          <v-icon icon="mdi-share-outline" />
        </v-tab>
      </v-tabs>
    </div>
    <!-- avatar -->
    <div
      class="h-2/3 flex items-center justify-end w-1/6 space-x-2 sm:hidden grow"
    >
      <!-- message -->
      <v-badge 
        v-if="hasNewMessage"
        id="badge" 
        color="error"
        dot 
      >
        <v-icon
          icon="mdi-bell-outline" 
          size="large"
          @click="$router.push('/personal/message')"
        />
      </v-badge>
      <v-icon
        v-else
        icon="mdi-bell-outline"
        size="large"
        @click="$router.push('/personal/message')"
      />
      <!-- username -->
      <span class="text-h6">
        {{ user.name }}
      </span>
      <!-- avatar -->
      <v-avatar 
        id="avatar"
        class="cursor-pointer"
        size="48"
      >
        <v-img
          lazy-src="/default.jpg"
          :src="user.avatar"
          cover
          alt="用户头像"
        >
          <template #placeholder>
            <div class="d-flex align-center justify-center fill-height">
              <v-progress-circular
                color="grey-lighten-4"
                indeterminate
              />
            </div>
          </template>
        </v-img>
      </v-avatar>
      <!-- hover menu -->
      <v-menu
        open-on-hover
        activator="#avatar"
        theme="light"
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
              @click="$router.push('/personal')"
            >
              设置
            </v-btn>
          </v-list-item>
          <v-list-item>
            <v-btn
              variant="text"
              block
              @click="handleLogoutClick"
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
import { logout } from '@/api/access';
import { getMessageList } from '@/api/message';
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
  created() {
    mitt.on('hasNewMessage', () => {
      this.hasNewMessage = true;
    });
    mitt.on('noNewMessage', () => {
      this.hasNewMessage = false;
    });
    getMessageList().then((res) => {
      const messages = res.data.list;
      if (messages && messages.length > 0) {
        messages.forEach((item) => {
          if (!item.isRead) {
            mitt.emit('hasNewMessage');
            return;
          }
        });
      } else {
        mitt.emit('noNewMessage');
      }
    });
  },
  methods: {
    handleLogoutClick() {
      logout();
      mitt.emit('unauthorized');
    }
  },
};
</script>

<style lang="scss" scoped>
.v-tab--selected {
  background-color: var(--custom-primary);
  color: var(--custom-secondary) !important;
}

.v-tab {
  font-weight: bold;
  font-size: 1.025em;
}

#the-header {
  background-color: var(--custom-secondary);
  @media screen and (max-width: 768px) {
    padding: 0 !important;
  }
}

.v-badge {
  span {
    bottom: calc(100% - 8px);
    left: calc(100% - 8px);
  }
}
</style>
