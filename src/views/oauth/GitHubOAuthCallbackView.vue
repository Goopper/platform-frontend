<template>
  <div class="text-center mx-auto mt-auto mb-auto">
    <v-progress-circular :width="16" id="circular-loading" color="primary" indeterminate></v-progress-circular>
    <div class="text-h6 text-md-h5 text-lg-h4 mt-6">加载中...</div>
  </div>
</template>

<script>
import mitt from '@/plugins/mitt';
import { getGitHubOAuthAccount, oAuthLogin } from '@/api/oauth';

export default {
  methods: {
    async githubLogin(oauthId) {
      // attempt login
      const res = await oAuthLogin("github", oauthId)
      // login success
      if (res) {
        const token = res.data.data
        localStorage.setItem('G-Token', token)
        mitt.emit('showToast', {
          title: '登陆成功！',
          color: 'success',
          icon: '$success',
        })
        this.$router.push('/')
      }
    }
  },
  mounted() {
    const code = this.$route.query.code
    if (code) {
      getGitHubOAuthAccount(code)
        .then((githubInfo) => {
          // not error
          if (githubInfo) {
            console.log(githubInfo.data.id)
            // get id
            const oauthId = githubInfo.data.id
            this.githubLogin(oauthId)
          }
        })
    } else {
      mitt.emit('showToast', {
        title: 'GitHub OAuth 登陆失败',
        color: 'error',
        icon: '$error',
      })
    }
  }
}
</script>

<style scoped>
#circular-loading {
  width: 20vw;
  height: 20vw;
}
</style>