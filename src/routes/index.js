// 权限
import Role from '@/utils/role';

// 视图
import LoginView from '@/views/LoginView.vue';
import GitHubOAuthCallbackView from '@/views/oauth/GitHubOAuthCallbackView.vue';
import GitHubOAuthBindView from '@/views/oauth/bind/GitHubOAuthBindView.vue';
import MainView from '@/views/MainView.vue';
import HomeView from '@/views/common/HomeView.vue';
import StudentHomeView from '@/views/student/StudentHomeView.vue';
import TeacherHomeView from '@/views/teacher/TeacherHomeView.vue';
import CourseView from '@/views/common/course/CourseView.vue';
import StudentCourseView from '@/views/student/StudentCourseView.vue';
import TeacherCourseView from '@/views/teacher/TeacherCourseView.vue';
import CourseCreateView from '@/views/teacher/course/CourseCreateView.vue';
import CourseDetailView from '@/views/common/course/CourseDetailView.vue';
import CourseInfoView from '@/views/common/course/CourseInfoView.vue';
import CourseTaskView from '@/views/common/course/CourseTaskView.vue';
import CourseSectionView from '@/views/common/course/CourseSectionView.vue';
import PersonalCenterView from '@/views/common/PersonalCenterView.vue';
import InfoView from '@/views/common/personal/InfoView.vue';
import SecurityView from '@/views/common/personal/SecurityView.vue';
import MessageView from '@/views/common/personal/MessageView.vue';
import StatisticView from '@/views/common/personal/StatisticView.vue';
import TaskCorrectView from '@/views/teacher/TaskCorrectView.vue';
import StudentPerformanceView from '@/views/teacher/StudentPerformanceView.vue';
import StudentDetailView from '@/views/teacher/StudentDetailView.vue';
import TaskCreateView from '@/views/teacher/course/TaskCreateView.vue';
import SectionCreateView from '@/views/teacher/course/SectionCreateView.vue';
import FrontendPluginView from '@/views/plugin/FrontendPluginView.vue';
import PluginMainView from '@/views/plugin/PluginMainView.vue';
import BackendPluginView from '@/views/plugin/BackendPluginView.vue';
import VuePluginView from '@/views/plugin/VuePluginView.vue';
import AboutView from '@/views/common/personal/AboutView.vue';
import TaskBatchCorrectView from '@/views/teacher/correct/TaskBatchCorrectView.vue';
import TaskBatchSelectView from '@/views/teacher/correct/TaskBatchSelectView.vue';

// 路由定义
export const routes = [
  {
    path: '/login',
    component: LoginView
  },
  {
    path: '/oauth/callback/github',
    component: GitHubOAuthCallbackView
  },
  {
    path: '/oauth/bind/github',
    component: GitHubOAuthBindView
  },
  {
    path: '/',
    component: MainView,
    children: [
      {
        path: 'home',
        component: HomeView,
        children: [
          {
            path: Role.ROLE_STUDENT.name,
            component: StudentHomeView,
            meta: {
              requireRole: Role.ROLE_STUDENT
            }
          },
          {
            path: Role.ROLE_TEACHER.name,
            component: TeacherHomeView,
            meta: {
              requireRole: Role.ROLE_TEACHER
            }
          }
        ]
      },
      {
        path: 'course',
        component: CourseView,
        children: [
          {
            path: Role.ROLE_STUDENT.name,
            component: StudentCourseView,
            meta: {
              requireRole: Role.ROLE_STUDENT
            }
          },
          {
            path: Role.ROLE_TEACHER.name,
            component: TeacherCourseView,
            meta: {
              requireRole: Role.ROLE_TEACHER
            },
          },
          {
            path: 'create',
            component: CourseCreateView,
            meta: {
              requireRole: Role.ROLE_TEACHER,
              routeConfirm: true
            },
            children: [
              {
                path: 'task',
                component: TaskCreateView,
                meta: {
                  requireRole: Role.ROLE_TEACHER,
                  routeConfirm: true
                },
              },
              {
                path: 'section',
                component: SectionCreateView,
                meta: {
                  requireRole: Role.ROLE_TEACHER,
                  routeConfirm: true
                },
              }
            ]
          },
          {
            path: 'detail/:id',
            component: CourseDetailView,
            children: [
              {
                path: '',
                component: CourseInfoView,
              },
              {
                path: 'task/:taskId',
                component: CourseTaskView,
              },
              {
                path: 'section/:sectionId',
                component: CourseSectionView,
              }
            ]
          },
        ]
      },
      {
        path: 'personal',
        component: PersonalCenterView,
        children: [
          {
            path: '',
            component: InfoView,
          },
          {
            path: 'security',
            component: SecurityView,
          },
          {
            path: 'message',
            component: MessageView,
          },
          {
            path: 'statistics',
            component: StatisticView,
            meta: {
              requireRole: Role.ROLE_TEACHER
            }
          },
          {
            path: 'about',
            component: AboutView
          }
        ]
      },
      {
        path: 'teacher/correct/:messageId',
        component: TaskCorrectView,
        meta: {
          requireRole: Role.ROLE_TEACHER,
          routeConfirm: true
        }
      },
      {
        path: 'teacher/student/performance',
        component: StudentPerformanceView,
        meta: {
          requireRole: Role.ROLE_TEACHER
        }
      },
      {
        path: 'teacher/student/detail',
        component: StudentDetailView,
        meta: {
          requireRole: Role.ROLE_TEACHER
        }
      },
      {
        path: '/batch/correct',
        component: TaskBatchCorrectView,
        meta: {
          requireRole: Role.ROLE_TEACHER
        }
      },
      {
        path: '/batch/select',
        component: TaskBatchSelectView,
        meta: {
          requireRole: Role.ROLE_TEACHER
        }
      },
    ]
  },
  {
    path: '/plugin',
    redirect: '/plugin/frontend',
    component: PluginMainView,
    children: [
      {
        path: 'frontend',
        component: FrontendPluginView,
      },
      {
        path: 'backend',
        component: BackendPluginView,
      },
      {
        path: 'vue',
        component: VuePluginView,
      }
    ]
  },
  {
    // 404
    path: '/:pathMatch(.*)*',
    redirect: '/'
  }
];