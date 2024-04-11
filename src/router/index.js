import { createRouter, createWebHashHistory } from 'vue-router'
import login from '../components/login.vue'
import teacher_page from '../components/teacher_page.vue'

const routers = [
  {path:'/login',component:login},
  {path:'/',component:teacher_page}
  
]

const router = createRouter({
  history: createWebHashHistory(),
  routes: routers
})
export default router