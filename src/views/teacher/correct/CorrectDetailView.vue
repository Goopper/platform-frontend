<template>
  <div
    v-if="correct"
    class="main"
  >
    <div class="title">
      <h3 :title="answer.taskName">
        {{ answer.taskName }}
      </h3>
      <p :title="answer.courseName + ' - ' + answer.sectionName">
        <span>{{ answer.courseName }}</span> -
        <span>{{ answer.sectionName }}</span>
      </p>
    </div>
    <div class="content">
      <p>题目内容 :</p>
      {{ correct.taskContent }}
    </div>
    <div class="answer">
      <p>学生提交的答案 :</p>
      {{ correct.answerContent }}
    </div>
    <div class="attachments">
      <div v-if="correct.attachments.length > 0">
        <custom-attachment-card
          v-for="attachment in correct.attachments"
          :key="attachment.id"
          class="attachment-card"
          :attachment="attachment"
        />
      </div>
      <div v-else>
        <p>无附件</p>
      </div>
    </div>
    <div class="comment border-b p-4">
      <v-textarea
        v-model="comment"
        theme="light"
        no-resize
        rows="2"
        density="compact"
        clearable
        flat
        hide-details
        :maxlength="200"
        variant="solo"
        label="评语（最多200字）"
      />
    </div>
    <div class="bottom-bar flex p-4 bg-background-important">
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
            class="individual-correction"
            color="white"
            variant="flat"
            :disabled="disable"
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
    class="loader"
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
            :to="`/batch/correct/${correctSimple.answerId}`"
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
          @click="(clickSubmitBatchCorrect(),inBatchDialog = false,confirmBatchDialog = false)"
        />
        <v-btn
          variant="outlined"
          text="取消"
          @click="(confirmBatchDialog = false,inBatchDialog = false)"
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
import { useSaveStore } from '@/store/common/save';
import mitt from '@/plugins/mitt';
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
      comment: '',
      rawScore: null,
      checkCorrects: [],
      correctList: [],
      confirmDialog: false,
      confirmBatchDialog: false,
      inBatchDialog : false,
      saveStore: useSaveStore(),
      finishCorrectedCount: 0,
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
      const isChanged = this.score !== null;
      if (this.checkCorrects.length > 1 && this.inBatchDialog) {
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
        this.score = null;
        this.correctId = this.$route.params.correctId;
        const res = await getAnswerByCorrectId(this.correctId);
        console.log(res.data);
        this.correct = res.data;
        this.answer = res.data.answer;
        if (JSON.parse(localStorage.getItem('checkCorrects')).length > 1 && this.inBatchDialog) {
          this.score = localStorage.getItem('score');
          this.comment = localStorage.getItem('comment');
        }
      },
      immediate: true,
    },
  },
  methods: {
    //返回到查看批改作业页面
    backToSelect() {
      if (
        this.finishCorrectedCount ===
        JSON.parse(localStorage.getItem('correctsId')).length
      ) {
        localStorage.removeItem('score');
        localStorage.removeItem('comment');
        this.saveStore.setSaveState(this.inBatchDialog=true);
        this.$router.push('/batch/select');
      } else {
        return;
      }
    },
    //展开确认框
    handleSubmitCorrect() {
      this.confirmDialog = true;
    },
    //展开多选确认框
    async handleSubmitBatchCorrect() {
      let id = this.$route.params.correctId;
      this.checkCorrects = JSON.parse(localStorage.getItem('checkCorrects'));
      if (this.checkCorrects.length === 0) {
        mitt.emit('showToast', {
          title: '请选择作业',
          color: 'error',
          icon: '$error',
        });
        return;
      } else if (this.checkCorrects.includes(id)) {
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
        this.inBatchDialog = true;
        this.confirmBatchDialog = true;
        localStorage.setItem('score', this.score);
        localStorage.setItem('comment', this.comment);
      }
    },
    //提交单独批改
    clickSubmitCorrect() {
      TaskIndividualCorrection(this.correctId, this.comment, this.score);
      this.confirmDialog = false;
      this.finishCorrectedCount += 1;
      this.backToSelect();
    },
    //提交多选批改
    clickSubmitBatchCorrect() {
      TaskBatchCorrection(this.checkCorrects, this.comment, this.score);
      this.confirmBatchDialog = false;
      this.finishCorrectedCount += this.checkCorrects.length;
      this.backToSelect();
    },
  },
};
</script>
<style lang="scss" scoped>
//主内容
.main {
  height: 100%;
  display: flex;
  flex-direction: column;
}
//标题和按钮的样式
.title,.bottom-bar{
  display: flex;
  justify-content: space-between;
  align-items: center;
}
//标题样式
.title {
  background: #383838;
  padding: 0.5em 1.5em;
  height: 65px;
  > * {
    color: white;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  h3 {
    font-size: 1.25em;
  }
  p {
    width: 30vw;
    text-align: right;
  }
  span {
    font-size: 0.9em;
    width: 5vw;
  }
}
//底部按钮样式
.bottom-bar {
  height: 8%;
  background: #f5f5f5;
  .batch-correction {
    margin-left: 1em;
  }
}
//内容,提交答案,附件公共样式
.content,.answer,.attachments{
  border-bottom: 1px solid #e0e0e0;
  padding: 1em 1.5em;
  overflow: auto;
  word-wrap: break-word;
}
//提交答案和附件公共样式
.answer,
.attachments {
  height: 20%;
  p {
    font-weight: bold;
  }
}
//内容样式
.content {
  height: 17%;
  p {
    font-weight: bold;
  }
}
//评语样式
.comment {
  border-bottom: 1px solid #e0e0e0;
  padding: 0.75em 0.5em;
  height: 28%;
}
//单附件样式
.attachment-card{
  margin-bottom: 0.5em;
}
//禁用的按钮样式
.individual-correction.v-btn--disabled {
  background-color: white !important; /* 修改禁用时的背景色 */
  color: #7d7d7d !important; /* 修改禁用时的文本颜色 */
}
//多选弹框list样式
.v-list {
  border: 1px solid #e0e0e0;
  border-bottom: 0;
  padding: 0;
  height: 10em;
  overflow: auto;
  .v-list-item {
    border-bottom: 1px solid #e0e0e0;
  }
}
//加载样式
.loader {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50vh;
}
</style>