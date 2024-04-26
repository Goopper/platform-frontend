<template>
  <div>
    <custom-float-back-button />
    <div class="flex flex-col border bg-secondary h-full">
      <div class="border-b p-4 flex justify-between items-center">
        <p class="text-lg">
          <span>{{ answer.studentName }} ({{ answer.groupName }})</span>
        </p>
        <div
          v-if="answer.nextAnswerUserMessageId"
          class="flex items-center justify-center"
        >
          <div class="text-end text-gray-500">
            <p>
              下一份：{{ answer.nextAnswerTaskName }}
            </p>
            <p>
              {{ answer.nextAnswerStudentName }} ({{ answer.nextAnswerGroupName }})
            </p>
          </div>
          <v-btn
            id="next-answer-btn"
            class="ml-4"
            density="comfortable"
            variant="outlined"
            icon="mdi-arrow-right"
            @click="handleNextButtonClick"
          />
          <v-tooltip
            activator="#next-answer-btn"
            location="top"
          >
            点击前往下一份需要批改的作业
          </v-tooltip>
        </div>
      </div>
      <!-- answer content area -->
      <div class="border-b p-4 overflow-y-auto">
        <p class="font-bold">
          {{ answer.taskName }}
        </p>
        <p>
          {{ answer.content }}
        </p>
      </div>
      <!-- attachments area -->
      <div class="flex-grow border-b p-4">
        <div
          v-if="answer.attachments && answer.attachments.length===0"
          class="flex flex-col justify-center items-center"
        >
          <v-icon
            size="50px"
            class="text-gray-400"
            icon="mdi-message-off-outline"
          />
          <p class="font-bold text-lg text-gray-400">
            无附件
          </p>
        </div>
        <div v-else>
          attachments
        </div>
      </div>
      <!-- comment area -->
      <div class="border-b p-4">
        <v-textarea
          v-model="comment"
          no-resize
          rows="2"
          density="compact"
          hide-details
          clearable
          :maxlength="200"
          variant="outlined"
          label="评语（最多200字）"
        />
      </div>
      <!-- actions area -->
      <div class="border-b flex p-4 bg-background-important">
        <div class="flex-grow" />
        <v-text-field
          v-model="score"
          class="max-w-[200px]"
          color="background-secondary-actions"
          variant="outlined"
          density="compact"
          type="number"
          min="0"
          max="100"
          hide-details
          bg-color="white"
          label="分数"
        >
          <template #append>
            <v-btn
              variant="flat"
              @click="handleSubmitCorrect"
            >
              提交
            </v-btn>
          </template>
        </v-text-field>
      </div>
    </div>
    <!-- dialog -->
    <v-dialog
      v-model="confirmDialog"
      persistent
      max-width="500"
    >
      <v-card
        title="提交批改"
        color="white"
      >
        <v-card-text>
          确定要提交批改吗？提交之后无法修改。
        </v-card-text>
        <v-card-actions>
          <v-btn
            variant="flat"
            class="ms-auto"
            text="确认"
            :loading="loading"
            @click="clickSubmitCorrect"
          />
          <v-btn
            variant="outlined"
            text="取消"
            :disabled="loading"
            @click="confirmDialog = false"
          />
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog
      v-model="nextConfirmDialog"
      persistent
      max-width="500"
    >
      <v-card
        title="提示"
        color="white"
      >
        <v-card-text>
          作业批改完毕，要前往下一份作业吗？
        </v-card-text>
        <v-card-actions>
          <v-btn
            variant="flat"
            class="ms-auto"
            text="确认"
            :loading="loading"
            @click="handleNextButtonClick"
          />
          <v-btn
            variant="outlined"
            text="取消"
            :disabled="loading"
            @click="handleNextCancelButtonClick"
          />
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { getAnswerByMessageId, submitCorrect } from '@/api/correct';
import { receiveOneMessage } from '@/api/message';
import mitt from '@/plugins/mitt';

export default {
  name: 'TaskCorrectView',
  data: () => ({
    messageId: null,
    loading: true,
    answer: {},
    rawScore: 0,
    comment: '',
    confirmDialog: false,
    nextConfirmDialog: false
  }),
  computed: {
  },
  computed: {
    score: {
      get() {
        return this.rawScore;
      },
      set(value) {
        if (value < 0) {
          this.rawScore = 0;
        } else if (value > 100) {
          this.rawScore = 100;
        } else {
          this.rawScore = value;
        }
      },
    },
  },
  created() {
    this.messageId = this.$route.params.messageId;
    this.loadAnswer();
  },
  methods: {
    async loadAnswer() {
      this.loading = true;
      const res = await getAnswerByMessageId(this.messageId);
      if (res) {
        this.answer = res.data;
      }
      this.loading = false;
    },
    handleNextButtonClick() {
      const nextId = this.answer.nextAnswerUserMessageId;
      this.messageId = nextId;
      this.$router.replace({ path: `/teacher/correct/${nextId}` });
      this.loadAnswer();
      this.nextConfirmDialog = false;
    },
    handleSubmitCorrect() {
      this.confirmDialog = true;
    },
    async clickSubmitCorrect() {
      this.loading = true;
      const res = await submitCorrect(this.answer.answerId, this.comment, this.score);
      await receiveOneMessage(this.messageId);
      if (res) {
        mitt.emit('showToast', {
          title: '提交成功！',
          color: 'success',
          icon: '$success',
        });
        this.confirmDialog = false;
        if (this.answer.nextAnswerUserMessageId) {
          this.nextConfirmDialog = true;
        } else {
          this.$router.push('/personal/message');
        }
      } else {
        mitt.emit('toast', {
          type: 'error',
          message: '提交失败'
        });
      }
      this.loading = false;
    },
    handleNextCancelButtonClick() {
      this.nextConfirmDialog = false;
      this.$router.go(-1);
    },
  },
};
</script>