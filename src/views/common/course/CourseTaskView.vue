<template>
  <div
    v-if="loading"
    class="loader"
  >
    <v-progress-circular
      indeterminate
      :size="80"
      :width="8"
      color="primary"
    />
  </div>
  <main v-else>
    <!-- 任务名称 任务状态 任务内容 -->
    <div class="task-main">
      <div class="title-state">
        <h1>{{ task.name }}</h1>
        <p>{{ submitTypeName }}</p>
        <span>
          <v-icon
            v-if="task.status"
            color="green"
          >mdi-check-circle-outline</v-icon>
        </span>
      </div>
      <p>{{ task.content }}</p>
    </div>
    <!-- 答题区和附件 -->
    <div class="answer-attachment">
      <v-tabs
        v-model="tab"
        align-tabs="title"
      >
        <v-tab
          value="attachment"
          text="教学课件"
        />
        <v-tab
          v-if="isShowTab(task.submitTypeId)"
          value="answer"
          text="答题区"
          :disabled="task.status"
        >
          答题区
        </v-tab>
      </v-tabs>
      <v-window
        v-model="tab"
        class="window"
      >
        <v-window-item value="attachment">
          <div class="attachments">
            <custom-attachment-card
              v-for="attachment in task.attachment"
              :key="attachment.id"
              :attachment="attachment"
            />
            <!-- 没有附件的情况 -->
            <div
              v-if="task.attachment && task.attachment.length === 0"
              class="flex flex-col justify-center items-center"
            >
              <v-icon
                size="8vh"
                class="text-gray-400"
                icon="mdi-attachment"
              />
              <p class="font-bold text-lg text-gray-400">
                没有附件
              </p>
            </div>
          </div>
        </v-window-item>
        <!-- 答题区window -->
        <v-window-item value="answer">
          <div class="answer-input">
            <!-- 输入框 -->
            <v-textarea
              v-model="content"
              class="textarea"
              placeholder="输入答案..."
              variant="solo"
              bg-color="white"
              :maxlength="500"
              no-resize
              clearable
              flat
              hide-details
            />

            <!-- 上传附件 -->
            <div class="attachment-upload">
              <input
                ref="uploadAttach"
                type="file"
                hidden
                @change="handleSelectAttachment"
              >
              <!-- 附件大于0是显示附件 -->
              <div v-if="attachments.length > 0">
                <custom-attachment-card
                  v-for="(attachment, index) in attachments"
                  :key="index"
                  :attachment="attachment"
                  deletable
                  @delete-file="deleteClick"
                />
              </div>
              <div
                v-else
                class="flex flex-col justify-center items-center"
              >
                <v-icon
                  size="8vh"
                  class="text-gray-400"
                  icon="mdi-attachment"
                />
                <p class="font-bold text-lg text-gray-400">
                  没有附件
                </p>
              </div>
            </div>
          </div>
          <div class="btn-column">
            <v-btn
              variant="outlined"
              density="comfortable"
              :loading="uploadLoading"
              @click="handleUploadClick"
            >
              上传附件
            </v-btn>
            <v-dialog
              v-model="isActive"
              persistent
              max-width="360"
            >
              <template #activator="{ props: activatorProps }">
                <v-btn
                  variant="outlined"
                  density="comfortable"
                  color="white"
                  class="submit-btn"
                  v-bind="activatorProps"
                  :loading="uploadLoading"
                  :disabled="isAuthority()"
                >
                  提交
                </v-btn>
              </template>
              <v-card color="white">
                <v-card-title> 提交请求 </v-card-title>
                <v-card-text>
                  <p>是否要提交当前的答案?</p>
                  <span>提交后不能更改!</span>
                </v-card-text>
                <v-card-actions>
                  <v-spacer />
                  <v-btn
                    class="submit-btn"
                    variant="outlined"
                    color="white"
                    @click="submitAnswer(), (isActive = false)"
                  >
                    确定
                  </v-btn>
                  <v-btn
                    variant="outlined"
                    @click="isActive = false"
                  >
                    取消
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
            <v-dialog
              v-model="deleteAttachmentDialog"
              persistent
              max-width="360"
            >
              <v-card
                title="提示"
                color="white"
              >
                <v-card-text>
                  确定删除提交的
                  <span class="font-bold text-red-500">{{
                    targetAttachment.originalFilename
                  }}</span>
                  附件吗？
                </v-card-text>
                <v-card-actions>
                  <v-btn
                    variant="flat"
                    color="error"
                    class="ms-auto"
                    text="确认"
                    :loading="deleteLoading"
                    @click="deleteAttachment"
                  />
                  <v-btn
                    variant="outlined"
                    text="取消"
                    :disabled="deleteLoading"
                    @click="deleteAttachmentDialog = false"
                  />
                </v-card-actions>
              </v-card>
            </v-dialog>
          </div>
        </v-window-item>
      </v-window>
    </div>
    <!-- 离开弹窗 -->
    <v-dialog
      v-model="isLeaveDialog"
      persistent
      max-width="320"
    >
      <v-card color="white">
        <v-card-title>确认离开</v-card-title>
        <v-card-text>你有未提交的内容，确定要离开吗？</v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn
            color="red"
            @click="confirmLeave"
          >
            确定
          </v-btn>
          <v-btn @click="cancelLeave()">
            取消
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </main>
</template>
<script>
import mitt from '@/plugins/mitt';
import CustomAttachmentCard from '@/components/CustomAttachmentCard.vue';
import { submitTaskAnswer } from '@/api/correct';
import { uploadAttachment } from '@/api/attachment';
import { getTaskDetail } from '@/api/course';
import { deleteAttachment } from '@/api/attachment';
import { useUserStore } from '@/store/user';
export default {
  name: 'CourseTaskView',
  components: { CustomAttachmentCard },
  beforeRouteUpdate(to, from, next) {
    if (this.content || this.attachments.length > 0) {
      this.isLeaveDialog = true;
      this.nextRoute = next.bind(null, to);
    } else {
      this.tab = 'attachment';
      next();
    }
  },
  beforeRouteLeave(to, from, next) {
    if (this.content || this.attachments.length > 0) {
      this.isLeaveDialog = true;
      this.nextRoute = next.bind(null, to);
    } else {
      next();
    }
  },
  data() {
    return {
      taskId: null,
      task: [],
      selectedId: null,
      tab: null,
      content: '',
      submitTypeName:null,
      attachments: [],
      uploadLoading: false,
      isActive: false,
      deleteAttachmentDialog: false,
      targetAttachment: null,
      //删除加载
      deleteLoading: false,
      //离开加载
      isLeaveDialog: false,
      loading: true,
    };
  },
  watch: {
    $route: 'fetchData',
  },
  mounted() {
    window.addEventListener('beforeunload', this.beforeUnload);
  },
  beforeUnmount() {
    window.removeEventListener('beforeunload', this.beforeUnload);
  },
  async created() {
    await this.fetchData();
    this.loading = false;
  },
  methods: {
    refreshWithoutPrompt() {
      window.removeEventListener('beforeunload', this.beforeUnload);
      this.$router.go(0);
      this.$nextTick(() => {
        window.addEventListener('beforeunload', this.beforeUnload);
      });
    },
    beforeUnload(event) {
      if (this.content || this.attachments.length > 0) {
        event.preventDefault();
        event.returnValue = '';
      }
    },
    //查询当前task
    async fetchData() {
      if (localStorage.getItem('content') || localStorage.getItem('attachment')) {
        this.tab = 'answer';
        this.content = localStorage.getItem('content');
        this.attachments = JSON.parse(localStorage.getItem('attachment'));
        console.log( this.attachments);
        localStorage.removeItem('content');
        localStorage.removeItem('attachment');
      } else {
        if (this.content || this.attachments.length > 0) {
          this.content = '';
          this.attachments = [];
        }
      }
      this.taskId = this.$route.params.taskId;
      const res = await getTaskDetail(this.taskId);
      this.task = res.data;
      if (this.task.submitTypeId === 4) {
        this.submitTypeName = '文本与可选附件提交';
      } else {
        this.submitTypeName = '无需提交';
        if (!this.task.status && useUserStore().role.name == 'student') {
          submitTaskAnswer(this.task.id,'',[]);
        }
      }
    },
    //上传附件按钮
    handleUploadClick() {
      this.$refs.uploadAttach.click();
    },
    //上传附件确认
    async handleSelectAttachment() {
      const file = this.$refs.uploadAttach.files[0];
      if (file) {
        this.uploadLoading = true;
        const res = await uploadAttachment(file);
        if (res) {
          mitt.emit('showToast', {
            title: '上传附件成功！',
            color: 'success',
            icon: '$success',
          });
          this.attachments.push(res.data);
        } else {
          mitt.emit('showToast', {
            title: '上传附件失败！',
            color: 'error',
            icon: '$error',
          });
        }
        this.uploadLoading = false;
      }
    },
    // 提交答案
    submitAnswer() {
      if (!this.content) {
        mitt.emit('showToast', {
          title: '答案不能为空',
          color: 'error',
          icon: '$error',
        });
        return;
      } else {
        submitTaskAnswer(this.taskId, this.content, this.attachments).then(
          (res) => {
            if (res.code == '200') {
              mitt.emit('showToast', {
                title: '提交成功',
                color: 'success',
                icon: '$success',
              });
              this.tab='attachment';
              this.fetchData();
            } else {
              mitt.emit('showToast', {
                title: '提交失败',
                color: 'error',
                icon: '$error',
              });
            }
          }
        );
      }
    },
    //删除附件弹窗按钮
    deleteClick(attachment) {
      this.targetAttachment = attachment;
      this.deleteAttachmentDialog = true;
    },
    //删除附件确认按钮
    async deleteAttachment() {
      this.deleteLoading = true;
      const res = await deleteAttachment(this.targetAttachment.filename);
      if (res) {
        mitt.emit('showToast', {
          title: '删除附件成功！',
          color: 'success',
          icon: '$success',
        });
        this.attachments = this.attachments.filter(
          (item) => item.filename !== this.targetAttachment.filename
        );
        this.deleteAttachmentDialog = false;
      } else {
        mitt.emit('showToast', {
          title: '删除附件失败！',
          color: 'error',
          icon: '$error',
        });
      }
      this.deleteLoading = false;
    },
    //权限判断
    isAuthority() {
      const role = useUserStore().role.name;
      if (role == 'student') {
        return false;
      } else {
        return true;
      }
    },
    //判断是否显示答题区
    isShowTab(submitTypeId) {
      const role = useUserStore().role.name;
      if (submitTypeId === 3 || role == 'teacher') {
        return false;
      } else {
        return true;
      }
    },
    confirmLeave() {
      this.content = '';
      this.attachments = [];
      this.isLeaveDialog = false;
      if (this.nextRoute) {
        this.nextRoute();
        this.nextRoute = null;
        this.tab = 'attachment';
      }
      localStorage.setItem('taskId', this.taskId);
    },
    cancelLeave() {
      this.isLeaveDialog = false;
      this.nextRoute = null;
      this.selectedId = this.taskId;
      localStorage.setItem('content', this.content);
      localStorage.setItem('attachment', JSON.stringify(this.attachments));
      this.refreshWithoutPrompt();
    },
  },
};
</script>
<style lang="scss" scoped>
main {
  background-color: white;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.task-main {
  padding: 2em;
  > p {
    margin: 2em 0;
    height: 56%;
    overflow: auto;
  }
  .title-state {
    display: flex;
    align-items: center;
    height: 12%;
    h1 {
      font-size: 1em;
      font-weight: bold;
    }
    span {
      margin-left: 2em;
    }
    p{
      font-size: 0.75em;
      padding: 0.1em 0.5em;
      margin-left: 1em;
      color: white;
      background-color: #383838;
      border-radius: 1em;
    }
  }
}
.window {
  height: 32vh;
  border-top: 1px solid #e0e0e0;
  .attachments {
    height: 30vh;
    padding: 1em 2em;
    overflow: auto;
    > * {
      margin: 0.5em 0;
    }
  }
  .answer-input {
    display: flex;
    height: 26vh;
    .v-textarea {
      flex: 1;
      border-right: 1px solid #e0e0e0;
    }
    .attachment-upload {
      height: 24vh;
      flex: 1;
      padding: 1em;
      overflow: auto;
      //单个附件
      > div > * {
        margin: 0.5em 0;
      }
    }
  }
}

//答题区样式
.btn-column {
  height: 6vh;
  border-top: 1px solid #e0e0e0;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  background-color: #fafafa;
  .v-btn {
    margin-right: 1em;
  }
  .submit-btn {
    background-color: #383838;
  }
}
//弹框样式
.v-card-text {
  display: flex;
  flex-direction: column;
  span {
    color: red;
  }
}
//确认按钮样式
.submit-btn {
  background-color: #fb8c00;
}
//加载样式
.loader {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50vh;
}
</style>