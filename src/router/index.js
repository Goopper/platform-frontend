import { createRouter, createWebHistory } from 'vue-router'
import { routes } from "@/routes";

const whiteList = [
  "/login",
  "/oauth/callback/github"
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((from, to) => {
  const auth = localStorage.getItem("G-Token")
  if (!auth && !whiteList.includes(from.path)) {
    return '/login'
  }
})