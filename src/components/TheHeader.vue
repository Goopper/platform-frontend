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
          @click="selectedTab = 'null'"
        >
          首页
        </v-tab>
        <v-tab
          class="sm:hidden"
          to="/course"
          @click="selectedTab = 'null'"
        >
          课程
        </v-tab>
        <v-menu
          offset="4"
          open-on-hover
        >
          <template #activator="{ props }">
            <v-tab
              v-bind="props"
              class="sm:hidden"
              to="/plugin"
              :class="{ 'v-tab--active': selectedTab === 'plugin' }"
            >
              训练场
              <v-icon>mdi-menu-down</v-icon>
            </v-tab>
          </template>
          <v-list
            class="plugin-list sm:hidden white-background"
            bg-color="white"
          >
            <v-list-item>
              <v-btn
                variant="text"
                block
                @click="navigateTo('/plugin/frontend')"
              >
                前端练习
              </v-btn>
            </v-list-item>
            <v-list-item>
              <v-btn
                variant="text"
                block
                tile
                @click="navigateTo('/plugin/backend')"
              >
                后端练习
              </v-btn>
            </v-list-item>
          </v-list>
        </v-menu>

        <v-tab
          class="sm:w-1/2"
          to="/personal"
          @click="selectedTab = 'null'"
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
      <!-- install -->
      <v-tooltip
        v-if="installPrompt"
        text="点击图标安装应用程序"
      >
        <template #activator="{ props }">
          <v-icon
            
            v-bind="props"
            icon="mdi-inbox-arrow-down-outline"
            size="large"
            @click="installApp"
          />
        </template>
      </v-tooltip>
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
    selectedTab: null,
    installPrompt: undefined
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
  mounted() {
    window.addEventListener('beforeinstallprompt', (e) => {
      // Prevent Chrome 67 and earlier from automatically showing the prompt
      e.preventDefault();
      // Stash the event so it can be triggered later.
      this.installPrompt = e;
    });
  },
  methods: {
    handleLogoutClick() {
      logout();
      mitt.emit('unauthorized');
    },
    navigateTo(route) {
      this.selectedTab = 'plugin';
      this.$router.push(route);
    },
    installApp() {
      if (this.installPrompt) {
        this.installPrompt.prompt();
      }
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
.plugin-list{
  padding: 0;
  > .v-list-item {
    padding: 0;
  }
  > .v-list-item--density-default:not(.v-list-item--nav).v-list-item--one-line {
    padding-inline: 0.25em;
  }
}

</style>
