import { createRouter, createWebHistory } from 'vue-router';
import { routes } from '@/routes';
import { useUserStore } from '@/store/user';
import Role from '@/utils/role';
import mitt from '@/plugins/mitt';
import { clearLoginState } from '@/utils/auth';
import { LOCAL_STORAGE_TOKEN_KEY } from '@/utils/key';
import nProgress from 'nprogress';
import 'nprogress/nprogress.css';
import { useSaveStore } from '@/store/common/save';

nProgress.configure({ showSpinner: false });

export const whiteList = [
  '/login',
  '/oauth/callback/github',
  '/plugin/backend',
  '/plugin/frontend',
  '/plugin/vue',
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});

// unauthorized
mitt.on('unauthorized', () => {
  clearLoginState();
  router.push('/login');
});

router.beforeEach(async (to, from) => {
  nProgress.start();

  // permission check
  if (!whiteList.includes(to.path)) {
    // need authentication
    const userStore = useUserStore();

    // localStorage don't have token
    if (!localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY)) {
      return '/login';
    }

    // unauthenticated and not in white list
    // if has localStorage token, try to load user info
    if (!userStore.isLoggedIn) {
      // try to load user info
      await userStore.loadUserInfo();
      nProgress.inc(0.5);
    }

    // role redirect
    const currentRole = userStore.roleInfo;
    if (currentRole) {
      let uri = currentRole.name;
      if (uri === 'admin') uri = 'teacher';
      if (to.path === '/') {
        return '/home/'+uri;
      }
      if (to.path === '/course') {
        return '/course/'+uri;
      }
    }

    // role check
    const requireRole = to.meta.requireRole;
    if (requireRole) {
      const roleId = userStore.roleId;
      // access denied (admin can access all pages)
      if (
        roleId !== requireRole.id &&
        roleId !== Role.ROLE_ADMIN.id
      ) {
        mitt.emit('showToast', { title: '无权访问！', color: 'error', icon: '$error' });
        return '/login'; 
      }
    }
  }

  // confirm check
  if (from.meta.routeConfirm) {
    const saveStore = useSaveStore();
    if (saveStore.isSaved) {
      return true;
    } else {
      const result = confirm('当前页面有未保存的内容，是否继续？');
      if (result) {
        saveStore.setAsSaved();
      } else {
        mitt.emit('course-item-selection-update');
        return false;
      }
    }
  }
});

router.afterEach(() => {
  nProgress.done();
});