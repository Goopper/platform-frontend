import { createRouter, createWebHashHistory } from 'vue-router'
import Login from '../components/login.vue'
import Teacher_page from '../components/teacher_page.vue'

const routers = [
  {path:'/login',component:Login},
  {path:'/',component:Teacher_page}
  
]

const router = createRouter({
  history: createWebHashHistory(),
  routes: routers
})
export default router