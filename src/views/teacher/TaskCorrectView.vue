<template>
  <div>
    <custom-float-back-button />
    <div class="flex flex-col border bg-secondary h-full">
      <div class="StudentInfo">
        <h1>{{ answer.studentName }}({{ answer.number }}) - {{ answer.groupName }}</h1>
        <p>
          分数 : <span :style="{ color: getScoreColor(correct.score) }">{{ correct.score }}</span>
        </p>
      </div>
      <div class="taskInfo">
        <h1>题目名称 : {{ answer.taskName }}</h1>
        <p>{{ answer.courseName }}-{{ answer.sectionName }}</p>
      </div>
      <div class="content">
        <p>题目内容 :</p>
        <span>{{ correct.taskContent }}</span>
      </div>
      <div class="answer-content">
        <p>答案 : </p>
        <span>{{ correct.answerContent }}</span>
      </div>
      <div class="time">
        提交时间 : {{ formatTime(answer.submitTime) }}
      </div>
      <div class="attachments">
        附件 :
        <div v-if="correct.attachments.length > 0">
          <custom-attachment-card
            v-for="attachment in correct.attachments"
            :key="attachment.id"
            class="attachment-card"
            :attachment="attachment"
          />
        </div>
        <div v-else>
          <p>当前作业无附件</p>
        </div>
      </div>
      <div class="comment">
        <div v-if="correct.comment">
          {{ correct.comment }}
        </div>
        <div v-else>
          <p>无评语</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { CorrectedAnswer } from '@/api/correct';
export default {
  name: 'TaskCorrectView',
  data: () => ({
    loading: true,
    answer: {},
    correct : null,
  }),
  created() {
    this.correctId = this.$route.params.id;
    this.loadAnswer();
  },
  methods: {
    async loadAnswer() {
      this.loading = true;
      const res = await CorrectedAnswer(this.correctId);
      if (res) {
        this.correct = res.data;
        this.answer = res.data.answer;
      }
      this.loading = false;
    },
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
      return date.toLocaleDateString('zh-CN', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' });
    },
  },
};
</script>
<style lang="scss" scoped>
.StudentInfo{
  height: 9%;
  display: flex;
  justify-content: space-between;
  padding: 1.25em;
  border-bottom: 1px solid #e0e0e0;
  h1{
    font-size: 1.25em;
    font-weight: bold;
  }
  p{
    font-weight: bold;
  }
}
.taskInfo{
  height: 6%;
  display: flex;
  justify-content: space-between;
  padding: 0.75em;
  border-bottom: 1px solid #e0e0e0;
  h1{
    font-weight: bold;
  }
}
.content,.answer-content{
  height: 18%;
  padding: 1em;
  border-bottom: 1px solid #e0e0e0;
  span{
     margin: 0.5em;
  }
}
.answer-content{
  border-bottom: 0;
  span{
    margin: 0.5em;
  }
}
.attachments{
  height: 24%;
  border-bottom: 1px solid #e0e0e0;
  padding: 1em 1.5em;
  overflow: auto;
  word-wrap: break-word;
  > * {
    margin: 0.5em;
  }
}
.attachment-card{
  margin-bottom: 0.5em;
}
.comment{
  padding: 1em;
}
.time{
  padding: 1em;
  text-align: right;
  border-bottom: 1px solid #e0e0e0;
}
</style>