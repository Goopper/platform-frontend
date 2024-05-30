<template>
  <div>
    <div class="back-button">
      <custom-float-back-button />
    </div>
    <main>
      <div class="choose-table">
        <v-select
          v-model="courseSelected"
          class="max-w-[15vw]"
          label="课程"
          :items="courseList"
          item-title="name"
          item-value="id"
          density="compact"
          variant="outlined"
          theme="light"
          hide-details
          clearable
        />
        <v-text-field
          v-model="studentName"
          class="w-[4vw]"
          clearable
          variant="outlined"
          density="compact"
          placeholder="学生姓名(模糊查询)"
          hide-details
        />
        <v-text-field
          v-model="sectionName"
          class="w-[4vw]"
          variant="outlined"
          density="compact"
          placeholder="章节名称(模糊查询)"
          hide-details
          clearable
        />
        <v-text-field
          v-model="taskName"
          class="w-[4vw]"
          variant="outlined"
          density="compact"
          placeholder="任务名称(模糊查询)"
          hide-details
          clearable
        />
        <v-btn
          prepend-icon="mdi-magnify"
          @click="searchCorrect"
        >
          搜索
        </v-btn>
        <v-btn
          prepend-icon="mdi-pencil"
          :disabled="correctsId.length === 0"
          @click="toBatchCorrect"
        >
          前往批改选中作业
        </v-btn>
      </div>
      <div class="correct-list">
        <!-- 加载动画 -->
        <div
          v-if="isLoading"
          class="loader flex-grow overflow-y-auto"
        >
          <v-progress-circular
            indeterminate
            :size="80"
            :width="8"
            color="primary"
          />
        </div>
        <div v-else>
          <v-table>
            <thead
              density="comfortable"
              class="bg-primary-important text-white"
              hover
            >
              <tr>
                <th class="w-[3.5vw]">
                  <v-checkbox
                    v-model="checkAll"
                    density="compact"
                    hide-details
                  />
                </th>
                <th class="status-select">
                  <v-select
                    v-model="statusSelected"
                    class="bg-primary-important text-white"
                    :items="statusList"
                    item-title="name"
                    item-value="id"
                    variant="solo"
                    density="compact"
                    flat
                    hide-details
                  >
                    <template #prepend>
                      <span class="select-font">状态:</span>
                    </template>
                  </v-select>
                </th>
                <th class="group-select">
                  <v-select
                    v-model="groupSelected"
                    :items="groupList"
                    item-title="name"
                    item-value="id"
                    density="compact"
                    variant="solo"
                    flat
                    hide-details
                  >
                    <template #prepend>
                      <span class="select-font">小组:</span>
                    </template>
                  </v-select>
                </th>
                <th>
                  <p>学生/学号</p>
                </th>
                <th>
                  <p>课程名称</p>
                </th>
                <th>
                  <p>章节名称</p>
                </th>
                <th>
                  <p>任务名称</p>
                </th>
                <th>
                  <p>提交时间</p>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="correct in correctList"
                :key="correct.id"
              >
                <td>
                  <v-checkbox
                    v-model="correctsId"
                    :disabled="correct.corrected"
                    density="compact"
                    :value="correct.id"
                    hide-details
                  />
                </td>
                <td
                  :style="{ color: correctColor(correct.corrected) }"
                  class="corrected"
                >
                  {{ correctName(correct.corrected) }}
                </td>
                <td>{{ correct.groupName }}</td>
                <td>{{ correct.studentName }} / {{ correct.number }}</td>
                <td>{{ correct.courseName }}</td>
                <td>{{ correct.sectionName }}</td>
                <td>{{ correct.taskName }}</td>
                <td>{{ getDaysAgo(correct.submitTime) }}</td>
              </tr>
            </tbody>
          </v-table>
          <div v-if="correctList.length === 0">
            <div
              class="noData"
            >
              <v-icon
                size="120px"
                class="text-gray-400"
                icon="mdi-message-off-outline"
              />
              <p class="font-bold text-lg text-gray-400">
                无数据
              </p>
            </div>
          </div>
          <v-pagination
            v-if="!correctList.length === 0"
            v-model="currentPage"
            :length="pages"
          />
        </div>
      </div>
    </main>
  </div>
</template>
<script>
import CustomFloatBackButton from '@/components/CustomFloatBackButton.vue';
import { getCourseList, getGroupList } from '@/api/course';
import { getAnswer } from '@/api/correct';
export default {
  name: 'TaskBatchSelectView',
  components: {
    CustomFloatBackButton,
  },
  data() {
    return {
      groupList: [{ id: null, name: '全部' }],
      courseList: [],
      statusList: [
        { id: null, name: '全部' },
        { id: true, name: '已批改' },
        { id: false, name: '未批改' },
      ],
      correctList: [],
      correctsId:[],
      courseSelected: null,
      statusSelected: null,
      groupSelected: null,
      checkAll: false,
      isLoading: true,
      studentName: null,
      sectionName: null,
      taskName: null,
      currentPage: 1,
      pages: 1,
    };
  },
  watch: {
    courseSelected() {
      this.currentPage = 1;
      this.selectIdForCorrect();
    },
    statusSelected() {
      this.currentPage = 1;
      this.selectIdForCorrect();
    },
    groupSelected() {
      this.currentPage = 1;
      this.selectIdForCorrect();
    },
    studentName() {
      if (this.studentName === null && this.sectionName === null && this.taskName === null) {
        this.currentPage = 1;
        this.selectIdForCorrect();
      }
    },
    sectionName() {
      if (this.studentName === null && this.sectionName === null && this.taskName === null) {
        this.currentPage = 1;
        this.selectIdForCorrect();
      }
    },
    taskName() {
      if (this.studentName === null && this.sectionName === null && this.taskName === null) {
        this.currentPage = 1;
        this.selectIdForCorrect();
      }
    },
    currentPage() {
      this.selectIdForCorrect();
    },
    //全选
    checkAll(newVal) {
      if (newVal) {
        this.correctsId = this.correctList.filter(correct => !correct.corrected).map(correct => correct.id);
      } else {
        this.correctsId = [];
      }
    },
  },
  async created() {
    //获取老师的授课列表
    getCourseList().then((res) => {
      this.courseList = res.data;
    });
    //获取小组列表
    getGroupList().then((res) => {
      this.groupList = this.groupList.concat(res.data);
    });
    this.isLoading = true;
    const res = await getAnswer({ corrected: null });
    this.correctList = res.data.list;
    this.pages = res.data.totalPage;
    this.isLoading = false;
  },
  methods: {
    correctColor(corrected) {
      return corrected ? '#4CAF50' : '#FB8C00';
    },
    //跳转作业批改按钮
    toBatchCorrect() {
      this.$router.push({
        path: '/batch/correct',
      });
      console.log(this.correctsId);
      localStorage.setItem('correctsId', JSON.stringify(this.correctsId));
    },
    //计算时间
    getDaysAgo(submitTime) {
      const now = new Date();
      const submitDate = new Date(submitTime);
      const diffTime = Math.abs(now - submitDate);
      if (diffTime < 1000 * 60) {
        return Math.ceil(diffTime / 1000) + '秒前';
      } else if (diffTime < 1000 * 60 * 60) {
        return Math.ceil(diffTime / (1000 * 60)) + '分钟前';
      } else if ( diffTime < 1000 * 60 * 60 * 24) {
        return Math.ceil(diffTime / (1000 * 60 * 60)) + '小时前';
      } else {
        return Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + '天前';
      }
    },
    searchCorrect() {
      this.isLoading = true;
      getAnswer({
        courseId: this.courseSelected,
        studentName: this.studentName,
        sectionName: this.sectionName,
        taskName: this.taskName,
      }).then((res) => {
        this.correctList = res.data.list;
        this.pages = res.data.totalPage;
        this.isLoading = false;
      });
    },
    correctName(correct) {
      if (correct == false) {
        return '未批改';
      } else {
        return '已批改';
      }
    },
    selectIdForCorrect() {
      this.isLoading = true;
      getAnswer({
        courseId: this.courseSelected,
        corrected: this.statusSelected,
        groupId: this.groupSelected,
        page : this.currentPage,
      }).then((res) => {
        this.correctList = res.data.list;
        this.pages = res.data.totalPage;
        this.isLoading = false;
      });
    },
  },
};
</script>
<style lang="scss" scoped>
main {
  background-color: white;
}
.choose-table {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1em;
  border-bottom: 1px solid #e0e0e0;
  > * {
    margin: 0 0.5em;
  }
}
.course-select {
  display: flex;
  justify-content: space-between;
  > * {
    margin-left: 1em;
  }
}
p {
  font-size: 1.2em;
}
.status-select {
  width: 11vw;
}
.group-select {
  width: 12vw;
}
tbody {
  background: white;
  color: #383838;
  height: 100%;
  tr {
    td {
      max-width: 7em;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
}
.corrected {
  text-align: center;
}
.noData{
  display: flex;
  flex-direction: column;
  text-align: center;
  justify-content: center ;
  align-items: center;
  background: white;
  height: 56vh;
}
.loader {
  display: flex;
  justify-content: center;
  align-items: center;
  background: #fafafa;
  height: 68vh;
}
</style>