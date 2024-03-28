import { createRouter, createWebHashHistory } from 'vue-router'
import Login from '../components/login.vue'
import Teacher_main from '../components/teacher_main.vue'

const routers = [
  {path:'/login',component:Login},
  {path:'/',component:Teacher_main}
]

const router = createRouter({
  history: createWebHashHistory(),
  routes: routers
})
export default router