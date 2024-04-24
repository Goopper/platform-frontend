<template>
  <div class="flex flex-col">
    <div class="mt-4 w-full md:hidden">
      <v-text-field
        v-model="title"
        label="消息标题筛选"
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
    <div class="mt-4 mb-4 w-full bmd:hidden">
      <v-text-field
        v-model="title"
        label="消息标题筛选"
        density="compact"
        append-inner-icon="mdi-magnify"
        variant="outlined"
        clearable
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
    <v-pagination
      v-model="page"
      :length="totalPage"
    />
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
            class="mt-2 whitespace-pre-wrap"
            v-text="targetMessage.content"
          />
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
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { getMessageList, receiveOneMessage } from '@/api/message';
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
    type: null,
    loading: true,
    dialog: false,
    targetMessage: {},
  }),
  computed: {
    sendDate() {
      return this.targetMessage.date.replace('T', ' ');
    }
  },
  created() {
    this.searchMessage();
  },
  methods: {
    searchMessage() {
      getMessageList(this.page, this.title, this.type).then(res => {
        this.messages = res.data;
        this.loading = false;
      });
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
      this.$router.push('/teacher/correct');
    }
  }
};
</script>

<style lang="scss" scoped>
.v-tab {
  font-size: 1.025em;
  font-weight: bold;
}
</style>