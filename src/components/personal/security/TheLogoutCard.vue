<template>
  <div class="border bg-secondary p-6">
    <p class="text-xl font-bold mt-0 mb-4">
      退出登陆
    </p>
    <p>
      退出当前登陆状态并前往登陆页
    </p>
    <div class="mt-4 flex justify-end">
      <v-btn
        color="error"
        variant="flat"
        @click="dialog=true"
      >
        退出登陆
      </v-btn>
    </div>
    <v-dialog
      v-model="dialog"
      persistent
      max-width="500"
    >
      <v-card
        color="white"
        title="退出登陆"
      >
        <v-card-text>
          确定要退出登陆吗
        </v-card-text>

        <v-card-actions>
          <v-spacer />

          <v-btn
            color="error"
            variant="flat"
            text="确认"
            :loading="loading"
            :disabled="loading"
            @click="handleLogoutClick"
          />
          <v-btn
            variant="outlined"
            text="取消"
            :disabled="loading"
            @click="dialog = false"
          />
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { logout } from '@/api/access';
import mitt from '@/plugins/mitt';

export default {
  name: 'TheLogoutCard',
  data: () => ({
    dialog: false,
    loading: false
  }),
  methods: {
    async handleLogoutClick() {
      this.loading = true;
      const result = logout();
      if (result) {
        mitt.emit('showToast', { title: '退出登陆成功！', color: 'success', icon: '$success' });
        mitt.emit('unauthorized');
        this.$router.push('/login');
      } else {
        mitt.emit('showToast', { title: '退出登陆失败！', color: 'error', icon: '$error' });
      }
      this.loading = false;
    }
  }
};
</script>

<style>

</style>