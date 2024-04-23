import { createRouter, createWebHistory } from 'vue-router';
import { routes } from '@/routes';
import { useUserStore } from '@/store/user';
import Role from '@/utils/role';
import mitt from '@/plugins/mitt';
import { clearLoginState } from '@/utils/auth';

export const whiteList = [
  '/login',
  '/oauth/callback/github'
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
  if (!whiteList.includes(to.path)) {
    const userStore = useUserStore();
    
    // unauthenticated and not in white list
    if (!userStore.isLoggedIn) {
      // try to load user info
      await userStore.loadUserInfo();
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
});