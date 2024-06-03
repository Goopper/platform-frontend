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
        <v-list-item class="checkAll h-14">
          <p class="text-xl">
            全选
          </p>
          <template #append>
            <v-checkbox
              v-model="checkAll"
              density="compact"
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
          :to="`/teacher/correct/batch/correct/${correct.answerId}`"
        >
          <v-list-item-title>
            <span>{{ correct.taskName }}</span>
          </v-list-item-title>
          <template #prepend>
            <div class="w-10">
              <v-checkbox
                v-model="checkCorrects"
                :value="correct.answerId"
                hide-details
                @click.stop
              />
            </div>
          </template>
        </v-list-item>
      </v-list>
    </div>
    <div class="correct">
      <router-view />
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
</template>
<script>
//修改列表添加单独多选功能后显示批量批改页面在有页面里添加多选的显示
import { getTaskNameByIds } from '@/api/correct';
import mitt from '@/plugins/mitt';
export default {
  name: 'TaskBatchSelectView',
  data() {
    return {
      correctsId: null,
      selectedId: null,
      checkAll:false,
      correctList: [],
      checkCorrects: [],
      loading: false
    };
  },
  watch: {
    checkAll(newVal) {
      if (newVal) {
        if(localStorage.getItem('IncompleteCorrects') !== null){
          let incompleteCorrects = JSON.parse(localStorage.getItem('IncompleteCorrects'));
          let ids = incompleteCorrects.map(item => item.answerId);
          this.checkCorrects = ids;
        } else {
          this.checkCorrects = this.correctsId;
        }
        localStorage.setItem('checkCorrects', JSON.stringify(this.checkCorrects));
      } else {
        this.checkCorrects = [];
        localStorage.removeItem('checkCorrects');
      }
    },
    checkCorrects() {
      localStorage.setItem('checkCorrects', JSON.stringify(this.checkCorrects));
    }
  },
  async created() {
    if (localStorage.getItem('correctsId') === null) {
      this.$router.push({
        path: '/teacher/correct/batch/select',
      });
    } else {
      this.correctsId = JSON.parse(localStorage.getItem('correctsId'));
      this.loading = true;
      const res = await getTaskNameByIds(this.correctsId);
      if (res && res.data) {
        this.correctList = res.data.filter(item => !item.corrected);
        localStorage.setItem('IncompleteCorrects', JSON.stringify(this.correctList));
        if(this.correctList.length > 0){
          this.$router.push({
            path: `/teacher/correct/batch/correct/${this.correctList[0].answerId}`,
          });
        }
      } else {
        mitt.emit('showToast', { title: '获取作业列表失败', color: 'error', icon: '$error' });
      }
      this.loading = false;
      if (this.$route.path === '/teacher/correct/batch/correct' && this.correctList.length > 0) {
        this.$router.push({
          path: `/teacher/correct/batch/correct/${this.correctList[0].answerId}`,
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
  widows: 100%;
  padding: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.list-item {
  display: flex;
  > * {
    display: flex;
  }
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
  display: flex;
  justify-content: space-between;
  p{
    font-weight: bold;
  }
}
//作业详情样式
.correct {
  width: 83%;
  background: white;
  border: 1px solid #e0e0e0;
  border-left: 0;
}
@media (max-width: 1200px) {
  .v-list-item--density-compact:not(.v-list-item--nav).v-list-item--one-line{
    padding-inline: 4px;
  }
.list-item{
  .v-list-item-title{
    padding-right: 0;
  }
}
}
</style>