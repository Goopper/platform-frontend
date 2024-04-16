<template>
  <div id="login">
    <div id="content">
      <img alt="Goopper" src="../../logo-text.svg" id="logo" />
      <div class="text-subtitle-1 font-weight-bold">第三方登陆 :</div>
      <div id="oauth-login">
        <v-btn aria-label="GitHub" @click="githubLogin" prepend-icon="mdi-github" :loading="githubLoading" size="large" block variant="flat">
          GitHub
        </v-btn>
      </div>
      <v-divider :thickness="2" class="mt-5 mb-5"></v-divider>
      <v-form ref="form">
        <div class="text-subtitle-1 font-weight-bold">学号/工号 :</div>
        <v-text-field v-model="number" prepend-inner-icon="mdi-numeric" :rules="numberRole" variant="outlined" clearable
                      placeholder="请输入学号/工号(数字)"></v-text-field>
        <div class="text-subtitle-1 font-weight-bold">密码 :</div>
        <v-text-field v-model="password" prepend-inner-icon="mdi-lock-outline" :rules="passwordRole" variant="outlined" type="password" clearable
                      placeholder="请输入密码"></v-text-field>
        <v-btn :loading="loginLoading" type="button" variant="flat" @click="attemptLogin" block size="large">登 录</v-btn>
      </v-form>
    </div>
    <div id="introduction">
      <span v-text="maxim[randomMaximIndex].maxim"></span>
      <br/>
      <strong v-text="maxim[randomMaximIndex].author"></strong>
    </div>
  </div>
</template>

<script>
import mitt from "@/plugins/mitt";
import LogosGithubIcon from "@/assets/icon/LogosGithubIcon.vue";
import { login } from "@/api/access";
import { getGitHubOAuthUrl } from "@/api/oauth";

export default {
  components: {LogosGithubIcon},
  data: () => ({
    number: '',
    numberRole: [
      value => {
        if (/^\d+$/.test(value)) return true
        return '请输入正确的学号/工号'
      },
    ],
    password: '',
    passwordRole: [
      value => {
        if (value?.length > 0) return true
        return '密码不能为空'
      },
    ],
    loginLoading: false,
    githubLoading: false,
    randomMaximIndex: 0,
    maxim: [
      {
        maxim: "“计算机科学中的所有问题都可以通过增加一个间接层来解决”",
        author: "David Wheeler（剑桥大学计算机科学教授）"
      },
      {
        maxim: "“软件设计就像性，一次错误的决定，你可能要用余下一生来弥补”",
        author: "Michael Sinz（微软首席架构师）"
      },
      {
        maxim: "“简单是可靠的前提”",
        author: "Edsger W. Dijkstra（图灵奖得主）"
      },
      {
        maxim: "“好的代码有自说明性，当你想添加一条注释时，问下自己“我怎么能改进代码从而省略这个注释？”",
        author: "Steve McConnell（《代码大全》作者）"
      },
      {
        maxim: "“读代码比写代码困难”",
        author: "Joel Spolsky（Stack Overflow创始人）"
      },
      {
        maxim: "“不要重复！在一个系统中，每条知识必须唯一、清晰、权威的表达”",
        author: "Andy Hunt（《程序员修炼之道》作者）"
      },
      {
        maxim: "“软件开发是一种艺术，而不是一门科学”",
        author: "Donald Knuth（计算机科学家）"
      }
    ]
  }),
  methods: {
    async attemptLogin() {
      this.loginLoading = true
      const { valid } = await this.$refs.form.validate()
      if (valid) {
        // attempt login
        const result = await login(this.number, this.password)
        if (result) {
          const token = result.data.data
          // save login status
          localStorage.setItem("G-Token", token)
          mitt.emit("showToast", {
            title: "登陆成功！",
            color: "success",
            icon: "$success",
          })
          // redirect
          this.$router.push("/")
        }
      }

      this.loginLoading = false
    },
    async githubLogin() {
      this.githubLoading = true

      // github oauth url
      const result = await getGitHubOAuthUrl()
      if (result) {
        window.location.href = result.data
      }

      this.githubLoading = false
    }
  },
  mounted: function() {
    this.randomMaximIndex = Math.floor(Math.random() * this.maxim.length)
  }
}
</script>

<style lang="scss" scoped>
#logo {
  width: 80%;
  margin-top: 10%;
  margin-bottom: 10%;
}

#login {
  width: 100%;
  height: 100%;
  background-image: url("../assets/img/banner.png");
  background-size: cover;
}

#content {
  width: 30%;
  min-width: 512px;
  padding: 32px;
  height: 100%;
  background-color: var(--custom-background);

  @media screen and (max-width: 1024px) {
    width: 100%;
  }
}

#introduction {
  position: absolute;
  top: 5%;
  left: max(30% + 32px, 512px + 32px);
  right: 32px;
  color: white;

  @media screen and (max-width: 1024px) {
    display: none;
  }
}
</style>
