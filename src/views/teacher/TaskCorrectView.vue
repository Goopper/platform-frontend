<template>
  <div>
    <custom-float-back-button />
    <div
      class="flex flex-col h-full bsm:gap-8 sm:gap-2"
    >
      <div class="flex flex-col border bg-white">
        <span class="p-4 font-bold text-white bg-primary text-xl leading-4">
          {{ answer.taskName }}<span>（{{ answer.courseName }}-{{ answer.sectionName }}）</span>
        </span>
        <div class="p-4 max-h-20 overflow-y-auto">
          {{ correct.taskContent }}
        </div>
      </div>
      <div class="flex bsm:gap-8 sm:gap-2 flex-grow md:flex-col ">
        <div class="flex-grow border bg-white md:w-full bmd:w-0 p-4 flex flex-col md:h-64">
          <div class="flex flex-col gap-4 flex-grow h-0">
            <p class="font-bold">
              学生答案:
            </p>
            <div class="h-0 flex-grow overflow-y-auto break-words">
              {{ correct.answerContent }}
            </div>
          </div>
          <div class="text-end text-gray-500">
            {{ formatTime(answer.submitTime) }}
          </div>
        </div>
        <div class="flex-grow border bg-white md:w-full bmd:w-0 flex flex-col md:h-96 md:mb-8 sm:mb-2">
          <div class="flex justify-between bg-primary text-white p-4 font-bold text-xl leading-4">
            <span>{{ answer.number }} - {{ answer.studentName }}</span>
            <span>{{ answer.groupName }}</span>
          </div>
          <div class="p-4 h-0 flex-grow font-bold flex flex-col overflow-y-auto">
            <div class="flex justify-between mb-4">
              <span>评语:</span>
              <span>分数 : 
                <span :style="{ color: getScoreColor(correct.score) }">{{ correct.score }}</span>
              </span>
            </div>
            <div
              v-if="correct.comment"
              class="overflow-y-auto h-0 flex-grow break-words"
            >
              {{ correct.comment }}
            </div>
            <div
              v-else
              class="flex justify-center items-center"
            >
              <v-icon
                size="50px"
                class="text-gray-400"
                icon="mdi-text-box-remove-outline"
              />
              <p class="font-bold text-lg text-gray-400">
                无评语
              </p>
            </div>
          </div>
          <div class="p-4 border-t h-0 flex-grow overflow-y-auto">
            <div
              v-if="correct.attachments && correct.attachments.length > 0"
              class="flex flex-col gap-4"
            >
              <custom-attachment-card
                v-for="attachment in correct.attachments"
                :key="attachment.id"
                :attachment="attachment"
              />
            </div>
            <div
              v-else
              class="flex justify-center items-center"
            >
              <v-icon
                size="50px"
                class="text-gray-400"
                icon="mdi-attachment-off"
              />
              <p class="font-bold text-lg text-gray-400">
                无附件
              </p>
            </div>
          </div>
        </div>
      </div>
      <v-overlay
        v-model="loading"
        class="align-center justify-center"
        persistent
        contained
      >
        <v-progress-circular
          color="primary"
          size="100"
          indeterminate
        />
      </v-overlay>
    </div>
  </div>
</template>

<script>
import { CorrectedAnswer } from '@/api/correct';
export default {
  name: 'TaskCorrectView',
  data() {
    return{
      loading: true,
      answer: {},
      correct : {},
    };
  },
  created() {
    this.correctId = this.$route.params.id;
    this.loadAnswer();
  },
  methods: {
    getScoreColor(score) {
      if (score >= 90) {
        return 'green';
      } else if (score >= 60) {
        return 'orange';
      } else {
        return 'red';
      }
    },
    formatTime(timeString) {
      const date = new Date(timeString);
      return date.toLocaleDateString('zh-CN', { year: 'numeric', month: '2-digit', day: '2-digit' });
    },
    async loadAnswer() {
      this.loading = true;
      const res = await CorrectedAnswer(this.correctId);
      if (res && res.data) {
        this.correct = res.data;
        this.answer = res.data.answer;
      } else {
        mitt.emit('showToast', { title: '获取题目答案信息失败', color: 'error', icon: '$error' });
        this.$router.go(-1);
      }
      this.loading = false;
    }
  },
};
</script>