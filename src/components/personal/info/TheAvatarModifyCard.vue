<template>
  <div class="border bg-secondary p-6 flex justify-between">
    <div class="h-auto flex flex-col justify-between">
      <p class="text-xl font-bold mt-0 mb-4">
        头像
      </p>
      <div>
        <p>
          这是你当前使用的头像
        </p>
        <p>
          如果想要修改头像，请点击头像并上传你的自定义完成头像的修改
        </p>
      </div>
    </div>
    <div class="flex justify-center items-center">
      <v-avatar
        class="cursor-pointer w-full"
        size="168"
        @click="handleAvatarClick"
      >
        <v-img
          lazy-src="/default.jpg"
          :src="user.avatar"
          cover
          alt="用户头像"
        >
          <template #placeholder>
            <div class="d-flex align-center justify-center fill-height">
              <v-progress-circular
                color="grey-lighten-4"
                indeterminate
              />
            </div>
          </template>
        </v-img>
      </v-avatar>
      <v-dialog
        v-model="dialog"
        persistent
        max-width="500"
      >
        <v-card
          color="white"
          title="上传用户头像"
        >
          <v-card-text>
            <v-file-input
              v-model="avatarFile"
              accept="image/*"
              prepend-icon="mdi-file-image"
              density="compact"
              label="点击此处上传文件"
              clearable
              :loading="uploading"
              variant="outlined"
            />
            <v-img
              class="m-auto rounded-full"
              width="300px"
              lazy-src="/default.jpg"
              :src="avatarUrl"
              cover
              alt="用户头像"
            >
              <template #placeholder>
                <div class="d-flex align-center justify-center fill-height">
                  <v-progress-circular
                    color="grey-lighten-4"
                    indeterminate
                  />
                </div>
              </template>
            </v-img>
          </v-card-text>

          <v-card-actions>
            <v-spacer />

            <v-btn
              variant="flat"
              text="保存"
              :loading="updating"
              :disabled="disableUpdate"
              @click="handleAvatarUpdateClick"
            />
            <v-btn
              variant="outlined"
              text="取消"
              :disabled="updating"
              @click="dialog = false"
            />
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
  </div>
</template>

<script>
import { updateAvatar, uploadAvatarFile } from '@/api/user';
import { useUserStore } from '@/store/user';
import mitt from '@/plugins/mitt';

export default {
  name: 'TheAvatarModifyCard',
  props: {
    user: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      dialog: false,
      avatarUrl: this.user.avatar,
      avatarFile: [],
      uploading: false,
      updating: false,
      userStore: useUserStore()
    };
  },
  computed: {
    disableUpdate() {
      return this.avatarUrl === this.user.avatar || this.avatarFile.length === 0;
    }
  },
  watch: {
    avatarFile: {
      async handler(newVal) {
        this.uploading = true;
        if (newVal.length == 1) {
          const res = await uploadAvatarFile(newVal[0]);
          if (res) {
            this.avatarUrl = res.data;
          } else {
            this.avatarFile = [];
          }
        }
        this.uploading = false;
      },
      deep: true
    }
  },
  methods: {
    handleAvatarClick() {
      this.dialog = true;
      this.avatarUrl = this.user.avatar;
    },
    async handleAvatarUpdateClick() {
      this.updating = true;
      const res = await updateAvatar(this.avatarUrl);
      if (res.data) {
        this.userStore.setAvatar(this.avatarUrl);
        this.dialog = false;
        mitt.emit('showToast', {
          title: '用户头像修改成功！',
          color: 'success',
          icon: '$success',
        });
      }
      this.updating = false;
    }
  }
};
</script>

<style scoped>

</style>