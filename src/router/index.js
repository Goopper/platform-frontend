import { createRouter, createWebHashHistory } from 'vue-router'
import login from '@/components/login.vue'
import teacher_page from '../components/teacher_page.vue'
import student_page from '@/views/StudentView.vue'

//用户首页
import teacher_main from '@/components/module/teacher_main.vue'
import student_main from '@/components/module/student_main.vue'
import teacher_course from '@/components/module/teacher_course.vue'

// 课程详情
import base_course_page from '@/components/base_module/base_course_page.vue'
import course_detail from '@/components/module/course_detail.vue'
import course_chapter from '@/components/module/course_chapter.vue'
import course_task from '@/components/module/course_task.vue'

//编辑课程
import base_edit_page from '@/components/base_module/base_edit_page.vue'
import edit_detail from '@/components/module/edit_detail.vue'
import edit_chapter from '@/components/module/edit_chapter.vue'
import edit_task from '@/components/module/edit_task.vue'

const routers = [
  { path: '/login', component: login },
  {
    path: '/teacher',
    component: teacher_page, redirect: '/teacher/main',
    children: [
      { path: '/teacher/main', component: teacher_main },
      { path: '/teacher/cource_main', component: teacher_course },
      {
        path: '/teacher/edit', component: base_edit_page,
        redirect: '/teacher/edit/detail', children: [
          { path: '/teacher/edit/detail', component: edit_detail },
          { path: '/teacher/edit/chapter/:id', component: edit_chapter },
          { path: '/teacher/edit/task/:id', component: edit_task }
        ]
      }

    ]
  },
  {
    path: '/student',
    component: student_page, redirect: '/student/main',
    children: [
      { path: '/student/main', component: student_main },

    ]
  },
  {
    path: '/course',
    component: base_course_page, redirect: '/course/detail', children: [
      { path: '/course/detail', component: course_detail },
      { path: '/course/chapter/:id', component: course_chapter },
      { path: '/course/task/:id', component: course_task }
    ]
  }
]
const router = createRouter({
  history: createWebHashHistory(),
  routes: routers
})
export default router