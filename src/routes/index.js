// 路由定义
import LoginView from "@/views/LoginView.vue";
import MainView from "@/views/MainView.vue";
import GitHubOAuthCallbackView from '@/views/oauth/GitHubOAuthCallbackView.vue';

export const routes = [
  {
    path: '/',
    component: MainView
  },
  {
    path: '/login',
    component: LoginView
  },
  {
    path: '/oauth/callback/github',
    component: GitHubOAuthCallbackView
  }
]