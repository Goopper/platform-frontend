<template>
  <div class="text-center mx-auto mt-auto mb-auto">
    <v-progress-circular
      v-if="!error"
      :width="16"
      class="w-[15vw] h-[15vw]"
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
        绑定失败，要重试吗？
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
        @click="$router.push('/personal')"
      >
        返 回
      </v-btn>
      <v-btn
        variant="flat"
        color="primary"
        size="large"
        class="mt-6 ms-6"
      >
        重 试
      </v-btn>
    </div>
  </div>
</template>

<script>
import { getGitHubOAuthAccount, bindOAuth } from '@/api/oauth';
import mitt from '@/plugins/mitt';

export default {
  name: 'GitHubOAuthCallbackView',
  data: () => ({
    code: '',
    error: false,
  }),
  mounted() {
    const code = this.$route.query.code;
    if (code) {
      this.code = code;
      this.bindGitHub();
    } else {
      this.$router.push('/personal');
    }
  },
  methods: {
    async bindGitHub() {
      const account = await getGitHubOAuthAccount(this.code);
      if (account) {
        const oauthId = account.data.id;
        const oauthName = account.data.login;
        const result = await bindOAuth('github', oauthId, oauthName);
        if (result) {
          this.$router.push('/personal');
        } else {
          // error, try again able
          mitt.emit('showToast', {
            title: '绑定账户失败（第三方账户可能已被绑定）！',
            color: 'error',
            icon: '$error',
          });
          this.error = true;
        }
      } else {
        // error, try again able
        mitt.emit('showToast', {
          title: '尝试获取GitHub账户信息失败！',
          color: 'error',
          icon: '$error',
        });
        this.error = true;
      }
    }
  },
};
</script>

<style scoped>

</style>