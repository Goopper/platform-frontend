<template>
  <div
    v-if="!loading"
    class="flex flex-col h-full"
  >
    <div class="bg-primary text-white font-bold flex justify-between items-center px-4 py-3.5 text-lg">
      <h3
        :title="answer.taskName"
        class="break-all truncate max-w-[15rem]"
      >
        <v-tooltip
          activator="parent"
          location="top"
          :text="answer.taskName"
        />
        {{ answer.taskName }}
      </h3>
      <p
        :title="answer.courseName + ' - ' + answer.sectionName"
        class="break-all truncate max-w-[15rem]"
      >
        <v-tooltip
          activator="parent"
          location="top"
          :text="answer.courseName+' - '+answer.sectionName"
        />
        <span>{{ answer.courseName }}</span> -
        <span>{{ answer.sectionName }}</span>
      </p>
    </div>
    <div class="p-4 flex-grow">
      <p class="font-bold">
        题目内容 :
      </p>
      <p class="break-all whitespace-break-spaces max-h-16 overflow-y-auto">
        {{ correct.taskContent }}
      </p>
    </div>
    <div class="border-t p-4 flex-grow">
      <p class="font-bold">
        学生提交的答案 :
      </p>
      <p class="break-all whitespace-break-spaces max-h-16 overflow-y-auto">
        {{ correct.answerContent }}
      </p>
    </div>
    <div class="border-t p-2 overflow-y-auto">
      <div
        v-if="correct.attachments.length > 0"
        class="gap-2 flex flex-col"
      >
        <custom-attachment-card
          v-for="attachment in correct.attachments"
          :key="attachment.id"
          class="attachment-card"
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
    <div class="p-4 flex flex-col border-t overflow-auto">
      <v-textarea
        v-model="comment"
        theme="light"
        no-resize
        density="compact"
        clearable
        flat
        hide-details
        auto-grow
        :maxlength="200"
        variant="solo"
        label="评语（最多200字）"
      />
    </div>
    <div class="flex p-2 bg-background-important h-auto border-t">
      <div class="flex-grow" />
      <v-text-field
        v-model="score"
        class="max-w-[360px]"
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
            variant="outlined"
            :disabled="disable"
            class="mr-4"
            flat
            @click="handleSubmitCorrect"
          >
            单独批改
          </v-btn>
          <v-btn
            class="batch-correction"
            :disabled="disable"
            flat
            @click="handleSubmitBatchCorrect"
          >
            批量批改
          </v-btn>
        </template>
      </v-text-field>
    </div>
  </div>
  <div
    v-else
    class="flex flex-col justify-center items-center h-full"
  >
    <v-progress-circular
      indeterminate
      :size="80"
      :width="8"
      color="primary"
    />
  </div>
  <!-- 单选 -->
  <v-dialog
    v-model="confirmDialog"
    persistent
    max-width="500"
  >
    <v-card
      title="提交批改"
      color="white"
    >
      <v-card-text> 确定要提交批改吗？提交之后无法修改。 </v-card-text>
      <v-card-actions>
        <v-btn
          variant="flat"
          class="ms-auto"
          text="确认"
          @click="clickSubmitCorrect"
        />
        <v-btn
          variant="outlined"
          text="取消"
          @click="confirmDialog = false"
        />
      </v-card-actions>
    </v-card>
  </v-dialog>
  <!-- 多选 -->
  <v-dialog
    v-model="confirmBatchDialog"
    persistent
    max-width="500"
  >
    <v-card
      title="确认多份作业"
      color="white"
    >
      <v-card-text>
        点击作业可跳转到对应作业批改页面(保存分数和评语)
        <v-list theme="light">
          <v-list-item
            v-for="correctSimple in correctList"
            :key="correctSimple.answerId"
            :to="`/teacher/correct/batch/correct/${correctSimple.answerId}`"
          >
            {{ correctSimple.taskName }}
            <template #append>
              <p
                v-if="correctSimple.answerId == Number($route.params.correctId)"
              >
                当前
              </p>
            </template>
          </v-list-item>
        </v-list>
      </v-card-text>
      <v-card-actions>
        <v-btn
          variant="flat"
          class="ms-auto"
          text="确认"
          @click="(clickSubmitBatchCorrect(),confirmBatchDialog = false)"
        />
        <v-btn
          variant="outlined"
          text="取消"
          @click="(confirmBatchDialog = false,batchDialogStatus = false)"
        />
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
import {
  getAnswerByCorrectId,
  getTaskNameByIds,
  TaskIndividualCorrection,
  TaskBatchCorrection,
} from '@/api/correct';
import CustomAttachmentCard from '@/components/CustomAttachmentCard.vue';
import mitt from '@/plugins/mitt';
import { useSaveStore } from '@/store/common/save';

export default {
  name: 'CorrectDetailView',
  components: {
    CustomAttachmentCard,
  },
  data() {
    return {
      correctId: null,
      correct: null,
      answer: null,
      rawScore: null,
      comment: '',
      //多选的作业列表
      checkCorrects: [],
      //在批量批改里面选中的多选列表
      correctList: [],
      loading: false,
      //两个确认框
      confirmDialog: false,
      confirmBatchDialog: false,
      //批量批改的状态
      batchDialogStatus: false,
      //批改完的作业
      finishCounts: 0,
      saveStore: useSaveStore(),
    };
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
    disable() {
      const isChanged = this.score !== null || this.comment !== '';
      if (this.checkCorrects  != null && this.batchDialogStatus) {
        this.saveStore.setSaveState(isChanged);
        return isChanged;
      } else {
        this.saveStore.setSaveState(!isChanged);
        return !isChanged;
      }
    },
  },
  //使用watch在切换路由时切换作业详情
  watch: {
    $route: {
      async handler() {
        this.loading = true;
        this.score = null;
        this.comment = '';
        this.correctId = this.$route.params.correctId;
        
        const res = await getAnswerByCorrectId(this.correctId);
        if (res && res.data) {
          this.correct = res.data;
          this.answer = res.data.answer;
        } else {
          mitt.emit('showToast', {
            title: '获取作业详情失败',
            color: 'error',
            icon: '$error',
          });
          this.$router.push('/teacher/correct/batch/select');
        }
        if (JSON.parse(localStorage.getItem('checkCorrects')) != null && this.batchDialogStatus) {
          this.score = localStorage.getItem('score');
          this.comment = localStorage.getItem('comment');
        } else {
          this.score = null;
          this.comment = '';
        }
        this.loading = false;
      },
      immediate: true,
    },
  },
  //刷新页面的时候清空checkCorrects
  beforeUnmount() {
    localStorage.removeItem('checkCorrects');
  },
  methods: {
    //返回到查看批改作业页面
    backToSelect() {
      if (JSON.parse(localStorage.getItem('IncompleteCorrects')).length === this.finishCounts) {
        this.saveStore.setSaveState(this.batchDialogStatus=true);
        mitt.emit('showToast', {
          title: '批改完成',
          color: 'success',
          icon: '$success',
        });
        mitt.emit('refreshAnswerList');
        this.$router.push('/teacher/correct/batch/select');
        localStorage.removeItem('checkCorrects');
        localStorage.removeItem('IncompleteCorrects');
      } else {
        localStorage.removeItem('checkCorrects');
        setTimeout(() => {
          this.$router.go(0);
        }, 1000);
        return;
      }
    },
    //展开确认框
    handleSubmitCorrect() {
      if (this.score === null) {
        mitt.emit('showToast', {
          title: '请输入分数',
          color: 'error',
          icon: '$error',
        });
        return;
      }
      this.confirmDialog = true;
    },
    //展开多选确认框
    async handleSubmitBatchCorrect() {
      this.checkCorrects = JSON.parse(localStorage.getItem('checkCorrects'));
      if (this.checkCorrects === null || this.checkCorrects.length == 0) {
        mitt.emit('showToast', {
          title: '请选择作业',
          color: 'error',
          icon: '$error',
        });
        return;
      } else if (!this.checkCorrects.includes(Number(this.correctId))) {
        // 如果 correctId 不在 checkCorrects 列表中，那么就显示一个提示，并返回
        mitt.emit('showToast', {
          title: '当前任务不在批量批改列表里',
          color: 'error',
          icon: '$error',
        });
        return;
      } else {
        const res = await getTaskNameByIds(this.checkCorrects);
        this.correctList = res.data;
        this.batchDialogStatus = true;
        this.confirmBatchDialog = true;
        localStorage.setItem('score', this.score);
        localStorage.setItem('comment', this.comment);
      }
    },
    //提交单独批改
    clickSubmitCorrect() {
      TaskIndividualCorrection(this.correctId, this.comment, this.score);
      this.confirmDialog = false;
      this.finishCounts++;
      this.backToSelect();
    },
    //提交多选批改
    clickSubmitBatchCorrect() {
      TaskBatchCorrection(this.checkCorrects, this.comment, this.score);
      this.confirmBatchDialog = false;
      this.finishCounts += this.checkCorrects.length;
      console.log(this.finishCounts);
      this.backToSelect();
    },
  },
};
</script>