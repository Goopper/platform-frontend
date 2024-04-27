<template>
  <div class="border bg-secondary p-6">
    <p class="text-xl font-bold mt-0 mb-4">
      账号关联
    </p>
    <p class="mb-4">
      将账户关联至第三方平台，您可以随时更改此设置
    </p>
    <div
      v-for="bind in binds"
      :key="bind.bind.id"
      class="flex justify-between items-center"
    >
      <div class="text-lg flex justify-center items-center">
        <v-icon
          class="mr-2"
          :icon="bind.provider.icon"
          size="x-large"
        />
        {{ bind.provider.name }}
      </div>
      <div
        v-if="bind.bind.bind"
        class="flex justify-center items-center"
      >
        <p class="mr-4">
          {{ bind.bind.bindUsername }}
        </p>
        <v-btn
          variant="flat"
          color="#fb8c00"
          :loading="loading"
          @click="handleUnbindClick(bind.bind)"
        >
          取消关联
        </v-btn>
      </div>
      <div v-else>
        <v-btn
          variant="flat"
          color="primary"
          :disabled="binding"
          @click="handleBind(bind.bind)"
        >
          关联
        </v-btn>
      </div>
    </div>
    <v-dialog
      v-model="dialog"
      persistent
      max-width="500"
    >
      <v-card
        title="提示"
        color="white"
      >
        <v-card-text>
          确定要取消绑定选定账户吗？
        </v-card-text>
        <v-card-actions>
          <v-btn
            variant="flat"
            class="ms-auto"
            text="确认"
            :loading="loading"
            @click="handleUnbindConfirmClick"
          />
          <v-btn
            variant="outlined"
            text="取消"
            :disabled="loading"
            @click="dialog=false"
          />
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { getOAuthURL, unbindOAuth } from '@/api/oauth';
import { getAllUserBindsInfo } from '@/api/user';
import mitt from '@/plugins/mitt';
import OAuthProvider from '@/utils/oauth-provider';

export default {
  name: 'TheAccountBindCard',
  props: {
    user: {
      type: Object,
      required: true
    }
  },
  data: () => ({
    binds: [],
    binding: false,
    dialog: false,
    loading: false,
    targetProviderName: undefined
  }),
  created() {
    this.loadBinds();
  },
  methods: {
    async handleBind(bind) {
      this.binding = true;
      const res = await getOAuthURL(bind.name);
      if (res.data) {
        window.location.href = res.data;
      }
      this.binding = false;
    },
    handleUnbindClick(bind) {
      this.targetProviderName = bind.name;
      this.dialog = true;
    },
    async handleUnbindConfirmClick() {
      this.loading = true;
      // unbind
      const res = await unbindOAuth(this.targetProviderName);
      if (res) {
        mitt.emit('showToast', {
          title: '解绑成功！',
          color: 'success',
          icon: '$success',
        });
        await this.loadBinds();
        this.dialog = false;
      } else {
        mitt.emit('showToast', {
          title: '解绑失败！',
          color: 'error',
          icon: '$error',
        });
      }
      this.loading = false;
    },
    async loadBinds() {
      this.loading = true;
      this.binds = [];
      const res = await getAllUserBindsInfo();
      for (let i = 0; i < res.data.length; i++) {
        const binds = res.data;
        for (let i = 0; i < binds.length; i++) {
          const bind = binds[i];
          const provider = OAuthProvider.getOAuthProviderById(bind.id);
          this.binds.push({
            bind,
            provider
          });
        }
      }
      this.loading = false;
    }
  }
};
</script>

<style scoped>

</style>