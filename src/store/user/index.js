import { defineStore } from 'pinia';
import { getMyBasicInfo } from '@/api/user';
import mitt from '@/plugins/mitt';
import Role from '@/utils/role';

export const useUserStore = defineStore('user', {
    state: () => ({
        user: null,
        role: null,
    }),
    actions: {
        setUser(user) {
            this.user = user;
        },
        setRole(role) {
            this.role = role;
        },
        async loadUserInfo() {
            const me = (await getMyBasicInfo());
            if (me) {
                this.setUser(me.data);
                const currentRole = Role.getRoleById(me.data.roleId);
                this.setRole(currentRole);
            } else {
                mitt.emit('showToast', {
                    title: '获取用户信息失败！请重新登录。',
                    color: 'error',
                    icon: '$error',
                });
                // clear login state, redirect to login page
                mitt.emit('unauthorized');
            }
        }
    },
    getters: {
        isLoggedIn(state) {
            return !!state.user;
        },
        roleId(state) {
            if (state.user) {
                return state.user.roleId;
            }
            return null;
        },
        roleInfo(state) {
            return state.role;
        },
        userInfo(state) {
            return state.user;
        }
    },
});