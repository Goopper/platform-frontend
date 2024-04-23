<template>
  <div class="border bg-secondary p-6">
    <p class="text-xl font-bold mt-0 mb-4">
      密码
    </p>
    <p class="mb-4">
      此处可以修改登陆账户所需要的密码
    </p>
    <div class="w-auto flex justify-end">
      <v-btn
        variant="flat"
        @click="dialog = true"
      >
        修改密码
      </v-btn>
    </div>
    <v-dialog
      v-model="dialog"
      persistent
      max-width="500"
    >
      <v-card
        color="white"
        title="修改密码验证"
      >
        <v-card-text>
          <v-form ref="form">
            <div class="text-subtitle-1 font-weight-bold">
              旧密码 :
            </div>
            <v-text-field
              v-model="oldPassword"
              prepend-inner-icon="mdi-lock-outline"
              :rules="passwordRole"
              variant="outlined"
              type="password"
              clearable
              placeholder="请输入旧密码"
            />
            <div class="text-subtitle-1 font-weight-bold">
              新密码 :
            </div>
            <v-text-field
              v-model="newPassword"
              prepend-inner-icon="mdi-lock-outline"
              :rules="passwordRole"
              variant="outlined"
              type="password"
              clearable
              placeholder="请输入新密码"
            />
            <div class="text-subtitle-1 font-weight-bold">
              再次输入新密码 :
            </div>
            <v-text-field
              v-model="repeatNewPassword"
              prepend-inner-icon="mdi-lock-outline"
              :rules="passwordRole"
              variant="outlined"
              type="password"
              clearable
              placeholder="再次输入新密码"
            />
          </v-form>
        </v-card-text>

        <v-card-actions>
          <v-spacer />

          <v-btn
            variant="flat"
            text="确认"
            :loading="loading"
            :disabled="loading"
            @click="handleChangePassword"
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
import { useUserStore } from '@/store/user';
import mitt from '@/plugins/mitt';
import { updateMyPassword } from '@/api/user';

export default {
  name: 'ThePasswordModifyCard',
  data: () => ({
    userStore: useUserStore(),
    oldPassword: '',
    newPassword: '',
    repeatNewPassword: '',
    passwordRole: [
      value => {
        if (value?.length > 0) return true;
        return '密码不能为空';
      },
    ],
    dialog: false,
    loading: false
  }),
  methods: {
    async handleChangePassword() {
      this.loading = true;
      const { valid } = await this.$refs.form.validate();
      if (valid) { 
        if (this.newPassword !== this.repeatNewPassword) {
          mitt.emit('showToast', { title: '两次新密码输入不一致！', color: 'error', icon: '$error' });
          this.loading = false;
          return;
        }
        const res = await updateMyPassword(this.oldPassword, this.newPassword);
        if (res) {
          mitt.emit('showToast', { title: '修改密码成功！', color: 'success', icon: '$success' });
          this.dialog = false;
        } else {
          mitt.emit('showToast', { title: '修改密码失败，请检查旧密码是否正确！', color: 'error', icon: '$error' });
        }
      }
      this.loading = false;
    }
  }
};
</script>

<style>

</style>