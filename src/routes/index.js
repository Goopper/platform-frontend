// 权限
import Role from '@/utils/role';

// 路由定义
export const routes = [
  {
    path: '/login',
    component: () => import('@/views/LoginView.vue')
  },
  {
    path: '/oauth/callback/github',
    component: () => import('@/views/oauth/GitHubOAuthCallbackView.vue')
  },
  {
    path: '/',
    component: () => import('@/views/MainView.vue'),
    children: [
      {
        path: 'home',
        component: () => import('@/views/common/HomeView.vue'),
        children: [
          {
            path: Role.ROLE_STUDENT.name,
            component: () => import('@/views/student/StudentHomeView.vue'),
            meta: {
              requireRole: Role.ROLE_STUDENT
            }
          },
          {
            path: Role.ROLE_TEACHER.name,
            component: () => import('@/views/teacher/TeacherHomeView.vue'),
            meta: {
              requireRole: Role.ROLE_TEACHER
            }
          }
        ]
      },
      {
        path: 'course',
        children: [
          {
            path: Role.ROLE_STUDENT.name,
            component: () => import('@/views/student/StudentCourseView.vue'),
            meta: {
              requireRole: Role.ROLE_STUDENT
            }
          },
          {
            path: Role.ROLE_TEACHER.name,
            component: () => import('@/views/teacher/TeacherCourseView.vue'),
            meta: {
              requireRole: Role.ROLE_TEACHER
            }
          }
        ]
      },
      {
        path: 'personal',
        component: () => import('@/views/common/PersonalCenterView.vue'),
      }
    ]
  },
  {
    // 404
    path: '/:pathMatch(.*)*',
    redirect: '/login'
  }
];