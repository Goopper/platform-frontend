<template>
  <div class="border bg-secondary p-6">
    <p class="text-xl font-bold mt-0 mb-4">
      邮箱
    </p>
    <p class="mb-4">
      用于登陆平台的邮箱，如果想要修改请输入合法的邮箱并点击保存按钮
    </p>
    <v-form ref="form">
      <v-text-field
        v-model="email"
        density="compact"
        prepend-inner-icon="mdi-email"
        label="Email"
        :rules="emailRules"
        variant="outlined"
        clearable
      >
        <template #append>
          <v-btn
            :disabled="disableUpdate"
            variant="flat"
            :loading="updating"
            @click="handleUpdateEmail"
          >
            保存
          </v-btn>
        </template>
      </v-text-field>
    </v-form>
  </div>
</template>

<script>
import { updateEmail } from '@/api/user';
import { useUserStore } from '@/store/user';
import mitt from '@/plugins/mitt';

export default {
  name: 'TheEmailModifyCard',
  props: {
    user: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      email: this.user.email,
      userStore: useUserStore(),
      updating: false,
      emailRules: [
        value => {
          if (!value) {
            return '请输入邮箱';
          }
          if (!/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(value)) {
            return '请输入合法的邮箱';
          }
          return true;
        }
      ]
    };
  },
  computed: {
    disableUpdate() {
      return !this.email || this.email === this.user.email;
    },
  },
  methods: {
    async handleUpdateEmail() {
      this.updating = true;
      const { valid } = await this.$refs.form.validate();
      if (!valid) {
        this.updating = false;
        return;
      }
      const res = await updateEmail(this.user.email, this.email);
      if (res.data) {
        mitt.emit('showToast', {
          title: '用户邮箱修改成功！',
          color: 'success',
          icon: '$success',
        });
        this.userStore.setEmail(this.email);
      }
      this.updating = false;
    }
  }
};
</script>

<style scoped>

</style>