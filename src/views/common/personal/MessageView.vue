<template>
  <div class="flex flex-col">
    <!-- md -->
    <div class="mt-4 w-full md:hidden">
      <v-text-field
        v-model="title"
        label="消息标题筛选(点击搜索图标进行搜索)"
        :loading="loading"
        density="compact"
        append-inner-icon="mdi-magnify"
        variant="outlined"
        clearable
        @click:append-inner="searchMessage"
      >
        <template #append>
          <v-tabs
            v-model="type"
          >
            <v-tab
              :value="null"
              @click="searchMessage"
            >
              全部
            </v-tab>
            <v-tab
              v-for="messageType in types"
              :key="messageType.id"
              :value="messageType.id"
              @click="searchMessage"
            >
              {{ messageType.name }}
            </v-tab>
          </v-tabs>
        </template>
      </v-text-field>
    </div>
    <!-- bmd -->
    <div class="mt-4 mb-4 w-full bmd:hidden">
      <v-text-field
        v-model="title"
        label="消息标题筛选(点击搜索图标进行搜索)"
        :loading="loading"
        density="compact"
        append-inner-icon="mdi-magnify"
        variant="outlined"
        clearable
        hide-details
        @click:append-inner="searchMessage"
      />
      <v-tabs
        v-model="type"
      >
        <v-tab
          :value="null"
          @click="searchMessage"
        >
          全部
        </v-tab>
        <v-tab
          v-for="messageType in types"
          :key="messageType.id"
          :value="messageType.id"
          @click="searchMessage"
        >
          {{ messageType.name }}
        </v-tab>
      </v-tabs>
    </div>
    <!-- messages -->
    <div class="flex-grow overflow-y-auto">
      <div
        v-if="messages.length>0 && !loading"
        class="flex flex-col"
      >
        <custom-message-card
          v-for="message in messages"
          :key="message.id"
          class="h-16 w-full border mb-2"
          :message="message"
          @message-card-click="handleMessageCardClick"
        />
      </div>
      <div
        v-else-if="messages.length===0 && !loading"
        class="flex flex-col justify-center items-center"
      >
        <v-icon
          size="10vw"
          class="text-gray-400"
          icon="mdi-message-off-outline"
        />
        <p class="font-bold text-lg text-gray-400">
          暂时没有消息
        </p>
      </div>
      <v-skeleton-loader
        v-if="loading"
        type="paragraph"
      />
    </div>
    <!-- pager -->
    <v-pagination
      v-model="page"
      :length="totalPage"
    />
    <!-- dialog -->
    <v-dialog
      v-model="dialog"
      persistent
      max-width="500"
    >
      <v-card
        color="white"
      >
        <div class="m-4 mb-0 flex justify-between items-center">
          <!-- user info -->
          <div class="flex items-center">
            <v-avatar 
              id="avatar"
              class="cursor-pointer"
              size="32"
            >
              <v-img
                lazy-src="/default.jpg"
                :src="targetMessage.sender.avatar"
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
            <span class="text-gray-500 ml-2 text-lg">
              {{ targetMessage.sender.name }}
            </span>
          </div>
          <!-- close icon -->
          <v-icon
            icon="mdi-close"
            @click="handleMessageClose"
          />
        </div>
        <v-card-text>
          <p class="font-bold text-lg">
            {{ targetMessage.title }}
          </p>
          <p
            v-if="targetMessage.typeId !== typeCorrectResultId"
            class="mt-2 whitespace-break-spaces"
            v-text="targetMessage.content"
          />
          <p
            v-else
            class="mt-2 whitespace-break-spaces"
          >
            您的作业已经被批改，请查看批改结果
          </p>
          <p class="text-sm mt-4 mb-2 text-gray-500">
            发送日期：{{ sendDate }}
          </p>
        </v-card-text>
        <v-card-actions v-if="targetMessage.typeId === typeCorrectId">
          <v-btn
            variant="flat"
            class="ms-auto"
            text="前往批改作业"
            @click="handleMessageToCorrect"
          />
        </v-card-actions>
        <v-card-actions v-else-if="targetMessage.answerId !== null">
          <v-btn
            variant="flat"
            class="ms-auto"
            text="查看具体批改结果"
            @click="handleMessageToCorrectResult"
          />
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { getMessageList, getMessageTypes, receiveOneMessage } from '@/api/message';
import MessageType from '@/utils/message-type';

export default {
  name: 'MessageView',
  data: () => ({
    page: 1,
    totalPage: 1,
    messages: [],
    title: '',
    types: MessageType.ALL,
    typeCorrectId: MessageType.CORRECT.id,
    typeCorrectResultId: MessageType.CORRECT_RESULT.id,
    type: null,
    loading: false,
    dialog: false,
    targetMessage: {},
  }),
  computed: {
    sendDate() {
      return this.targetMessage.date.replace('T', ' ');
    }
  },
  watch: {
    page() {
      this.searchMessage();
    }
  },
  created() {
    this.searchMessage();
    getMessageTypes().then(res => {
      this.types = res.data;
    });
  },
  methods: {
    async searchMessage() {
      this.loading = true;
      const res = await getMessageList(this.page, this.title, this.type);
      if (res && res.data) {
        this.messages = res.data.list;
        this.page = res.data.page;
        this.totalPage = res.data.totalPage;
      } else {
        this.messages = [];
        this.page = 1;
        this.totalPage = 1;
        mitt.emit('showToast', { title: '获取消息失败', color: 'error', icon: '$error' });
      }
      this.loading = false;
    },
    handleMessageCardClick(message) {
      this.targetMessage = message;
      this.dialog = true;
    },
    handleMessageClose() {
      this.dialog = false;
      const targetId = this.targetMessage.id;
      receiveOneMessage(targetId).then(() => {
        this.targetMessage.isRead = true;
      });
    },
    handleMessageToCorrect() {
      const targetId = this.targetMessage.id;
      receiveOneMessage(targetId).then(() => {
        this.targetMessage.isRead = true;
      });
      this.$router.push('/teacher/correct/batch/select');
    },
    handleMessageToCorrectResult() {
      const targetId = this.targetMessage.answerId;
      const messageId = this.targetMessage.id;
      receiveOneMessage(messageId).then(() => {
        this.targetMessage.isRead = true;
      });
      this.$router.push(`/teacher/correct/${targetId}`);
    },
  }
};
</script>

<style lang="scss" scoped>
.v-tab {
  font-size: 1.025em;
  font-weight: bold;
}
</style>