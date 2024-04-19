<template>
  <div class="text-center mx-auto mt-auto mb-auto">
    <v-progress-circular
      v-if="!error"
      :width="16"
      class="status"
      color="primary"
      indeterminate
    />
    <v-icon
      v-else
      size="15vw" 
      icon="mdi-alert-circle" 
      color="error"
    />
    <div class="text-h6 text-md-h5 text-lg-h4 mt-6">
      <span v-if="!error">
        加载中...
      </span>
      <span v-else>
        登陆失败，要重试吗？
      </span>
    </div>
    <div
      v-if="error"
      id="actions"
    >
      <v-btn
        variant="outlined"
        color="primary"
        size="large"
        class="mt-6"
        @click="$router.push('/login')"
      >
        返 回
      </v-btn>
      <v-btn
        variant="flat"
        color="primary"
        size="large"
        class="mt-6 ms-6"
        @click="startLogin()"
      >
        重 试
      </v-btn>
    </div>
  </div>
</template>

<script>
import mitt from '@/plugins/mitt';
import { getGitHubOAuthAccount, oAuthLogin } from '@/api/oauth';
import { setLoginState } from '@/utils/auth';
import { useUserStore } from '@/store/user';

export default {
  name: 'GitHubOAuthCallbackView',
  data: () => {
    return {
      code: '',
      error: false,
      userStore: useUserStore(),
    };
  },
  mounted() {
    const code = this.$route.query.code;
    if (code) {
      this.code = code;
      this.startLogin();
    } else {
      this.$router.push('/login');
    }
  },
  methods: {
    async githubLogin(oauthId) {
      // attempt login
      const res = await oAuthLogin('github', oauthId);
      // login success
      if (res) {
        const token = res.data;
        setLoginState(token);
        mitt.emit('showToast', {
          title: '登陆成功！',
          color: 'success',
          icon: '$success',
        });
        // load basic info
        await this.userStore.loadUserInfo();
        this.$router.push('/');
      } else {
        mitt.emit('showToast', {
          title: '登录失败！账户绑定信息不存在',
          color: 'error',
          icon: '$error',
        });
        this.$router.push('/login');
      }
    },
    async startLogin() {
      this.error = false;
      // get github oauth account information
      const info = await getGitHubOAuthAccount(this.code);
      if (info) {
        if (info) {
          const oauthId = info.data.id;
          this.githubLogin(oauthId);
        } else {
          // error, try again able
          mitt.emit('showToast', {
            title: '尝试获取GitHub账户信息失败！',
            color: 'error',
            icon: '$error',
          });
          this.error = true;
        }
      } else {
        // error, try again able
        this.error = true;
      }
    }
  }
};
</script>

<style scoped>
.status {
  width: 15vw;
  height: 15vw;
}
</style>