<template>
  <div class="main">
    <div class="back-button">
      <custom-float-back-button back-url="/teacher/correct/batch/select" />
    </div>
    <div class="correct-list">
      <v-list
        density="compact"
        theme="light"
      >
        <v-list-item class="checkAll">
          <template #prepend>
            全选
          </template>
          <template #append>
            <v-checkbox
              v-model="checkAll"
              value="correct.answerId"
              hide-details
            />
          </template>
        </v-list-item>
        <v-list-item
          v-for="correct in correctList"
          :key="correct.answerId"
          class="list-item"
          item-color="black"
          :to="`/batch/correct/${correct.answerId}`"
        >
          <v-list-item-title>
            {{ correct.taskName }}
          </v-list-item-title>
          <template #prepend>
            <v-checkbox
              v-model="checkCorrects"
              :value="correct.answerId"
              hide-details
              @click.stop
            />
          </template>
          <template #append>
            <v-icon
              v-if="correct.corrected"
              color="green"
            >
              mdi-check-circle-outline
            </v-icon>
          </template>
        </v-list-item>
      </v-list>
    </div>
    <div class="correct">
      <router-view />
    </div>
  </div>
</template>
<script>
//修改列表添加单独多选功能后显示批量批改页面在有页面里添加多选的显示
import { getTaskNameByIds } from '@/api/correct';
export default {
  name: 'TaskBatchSelectView',
  data() {
    return {
      correctsId: null,
      selectedId: null,
      checkAll:false,
      correctList: [],
      checkCorrects: [],
    };
  },
  watch: {
    checkAll(newVal) {
      if (newVal) {
        this.checkCorrects = this.correctsId;
        localStorage.setItem('checkCorrects', JSON.stringify(this.checkCorrects));
      } else {
        this.checkCorrects = [];
        localStorage.removeItem('checkCorrects');
      }
    },
    checkCorrects() {
      localStorage.setItem('checkCorrects',JSON.stringify(this.checkCorrects));
    }
  },
  async created() {
    if (localStorage.getItem('correctsId') === null) {
      this.$router.push({
        path: '/teacher/correct/batch/select',
      });
    } else {
      this.correctsId = JSON.parse(localStorage.getItem('correctsId'));
      const res = await getTaskNameByIds(this.correctsId);
      this.correctList = res.data;
       if (this.$route.path === '/batch/correct' && this.correctList.length > 0) {
      this.$router.push({
        path: `/batch/correct/${this.correctList[0].answerId}`,
      });
    }
    }
  },
};
</script>
<style lang="scss" scoped>
.main {
  display: flex;
}
.v-list {
  padding: 0;
}
.list-item {
  display: flex;
}
.v-list-item{
  display: flex;
}
.v-list-item-title {
  width: 7em;
  max-width: 8em;
}
.v-list-item--active {
  background-color: #383838; /* 你的颜色 */
  color: #ffffff;
}
.correct-list {
  height: 100%;
  width: 17%;
  background: white;
  border: 1px solid #e0e0e0;
  overflow: auto;
}
.checkAll{
  border-bottom: 1px solid #e0e0e0;
}
//作业详情样式
.correct {
  width: 83%;
  background: white;
  border: 1px solid #e0e0e0;
  border-left: 0;
}
</style>