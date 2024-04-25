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
    path: '/oauth/bind/github',
    component: () => import('@/views/oauth/bind/GitHubOAuthBindView.vue')
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
        component: () => import('@/views/common/course/CourseView.vue'),
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
            },
          },
          {
            path: 'create',
            component: () => import('@/views/teacher/course/CourseCreateView.vue'),
            meta: {
              requireRole: Role.ROLE_TEACHER
            },
          },
          {
            path: 'detail',
            component: () => import('@/views/common/course/CourseDetailView.vue'),
          },
        ]
      },
      {
        path: 'personal',
        component: () => import('@/views/common/PersonalCenterView.vue'),
        children: [
          {
            path: '',
            component: () => import('@/views/common/personal/InfoView.vue'),
          },
          {
            path: 'security',
            component: () => import('@/views/common/personal/SecurityView.vue'),
          },
          {
            path: 'message',
            component: () => import('@/views/common/personal/MessageView.vue'),
          }
        ]
      },
      {
        path: 'teacher/correct',
        component: () => import('@/views/teacher/TaskCorrectView.vue'),
        meta: {
          requireRole: Role.ROLE_TEACHER
        }
      },
      {
        path: 'teacher/student/detail',
        component: () => import('@/views/teacher/StudentDetailView.vue'),
        meta: {
          requireRole: Role.ROLE_TEACHER
        }
      }
    ]
  },
  {
    // 404
    path: '/:pathMatch(.*)*',
    redirect: '/'
  }
];