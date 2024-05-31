<template>
  <div>
    <custom-float-back-button />
    <div
      class="flex flex-col h-full"
    >
      <div class="correct-detail">
        <div class="task-title">
          {{ answer.taskName }}<p>({{ answer.courseName }}-{{ answer.sectionName }})</p>
        </div>
        <div class="correct-content">
          {{ correct.taskContent }}
        </div>
      </div>
      <div class="student">
        <div class="student-answer">
          <p>学生答案:</p>
          <div class="answer-content">
            {{ correct.answerContent }}
          </div>
          <div class="time">
            {{ formatTime(answer.submitTime) }}
          </div>
        </div>
        <div class="student-info-comment">
          <div class="student-info">
            <p>{{ answer.number }} - {{ answer.studentName }}</p>
            <p>{{ answer.groupName }}</p>
          </div>
          <div class="comment">
            <p><span>评语:</span> <span>分数 : <span :style="{ color: getScoreColor(correct.score) }">{{ correct.score }}</span></span></p>
            <div v-if="correct.comment">
              {{ correct.comment }}
            </div>
            <div v-else>
              <h1>无评语</h1>
            </div>
          </div>
          <div class="attachments">
            <div>
              <div v-if="correct.attachments">
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
          </div>
        </div>
      </div>
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
  async created() {
    this.correctId = this.$route.params.id;
    this.loading = true;
    const res = await CorrectedAnswer(this.correctId);
    this.correct = res.data;
    this.answer = res.data.answer;
    console.log(this.correct);
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
  },
};
</script>
<style lang="scss" scoped>
.correct-detail{
  height: 24%;
  border: 1px solid #e0e0e0;
  .task-title{
    height: 35%;
    display: flex;
    align-items: center;
    font-weight: bold;
    font-size: large;
    background-color: #383838;
    color:white;
    padding: 0 1em;
    p{
      padding: 0 1em;
      font-size: 16px;
      font-weight: normal;
    }
  }
  .correct-content{
    height: 65%;
    display: flex;
    overflow: auto;
    padding: 0.5em 1.5em;
    background: white;
  }
}
.student{
  height: 70%;
  display: flex;
  margin-top: 2em;
  .student-answer{
    margin-right: 2em;
    width: 50%;
    border: 1px solid #e0e0e0;
    background: white;
    .answer-content{
      height: 84%;
      overflow: auto;
      padding: 1em 1em 0 1em;
    }
    p{
      display: flex;
      align-items: center;
      height: 8%;
      padding: 0 1em;
      font-weight: bold;
      font-size: large;
    }
    .time{
      height: 6%;
      text-align: right;
      padding-right: 1.25em;
    }
  }
  .student-info-comment{
    width: 50%;
    display: flex;
    flex-direction: column;
    background: white;
    border: 1px solid #e0e0e0;
    .student-info{
      height: 10%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid #e0e0e0;
      background: #383838;
      color:white;
      padding: 0 1em;
    }
    .comment{
      height: 45%;
      overflow: auto;
      padding: 1em;
      border-bottom: 1px solid #e0e0e0;
      p{
        display: flex;
        justify-content: space-between;
        font-weight: bold;
        margin: 0;
      }
      div{
        padding: 1em 0;
      }
    }
    .attachments{
      height: 45%;
      overflow: auto;
      padding: 1em;
      .attachment-card{
        margin: 0.5em 0;
      }
    }
  }
}
</style>