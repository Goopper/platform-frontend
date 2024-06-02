<template>
  <div class="flex flex-col h-full w-full">
    <custom-float-back-button />
    <main class="flex-grow h-0 flex flex-col">
      <div class="choose-table">
        <v-select
          v-model="courseSelected"
          class="class-select max-w-[16vw]"
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
          class="to-correct"
          prepend-icon="mdi-pencil"
          :disabled="selectedItem.length === 0"
          @click="toBatchCorrect"
        >
          前往批改选中作业
        </v-btn>
      </div>
      <div class="flex-grow h-0 flex">
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
        <div
          v-else
          class="table-container flex-grow overflow-y-auto"
        >
          <v-data-table
            v-model="correctsId"
            item-value="id"
            class="h-full border overflow-auto"
            fixed-footer
            fixed-header
            theme="light"
            hover
            :loading="isLoading"
            :headers="headers"
            items-per-page="10"
            :items="correctList"
            return-object
          >
            <template #headers="{ columns,allSelected, selectAll, someSelected }">
              <tr class="text-white">
                <td>
                  <v-checkbox-btn
                    :indeterminate="someSelected && !allSelected"
                    :model-value="allSelected"
                    @update:model-value="selectAll(!allSelected)"
                  />
                </td>
                <td>
                  <v-select
                    v-model="statusSelected"
                    theme="dark"
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
                </td>
                <td>
                  <v-select
                    v-model="groupSelected"
                    theme="dark"
                    :items="groupList"
                    item-title="name"
                    item-value="id"
                    density="compact"
                    variant="solo"
                    flat
                    show-select
                    hide-details
                  >
                    <template #prepend>
                      <span class="select-font">小组:</span>
                    </template>
                  </v-select>
                </td>
                <template
                  v-for="column in columns"
                  :key="column.key"
                >
                  <td
                    v-show="column.title"
                    class="min-w-[150px]"
                  >
                    <span class="mr-2 text-lg font-black">{{ column.title }}</span>
                  </td>
                </template>
              </tr>
            </template>
            <template #loading>
              <v-skeleton-loader type="table-row@10" />
            </template>
            <template #no-data>
              <v-icon
                size="100px"
                class="text-gray-400 mt-8"
                icon="mdi-sort-variant-off"
              />
              <p class="font-bold text-lg text-gray-400">
                暂时没有学生成绩数据
              </p>
            </template>
            <template #bottom>
              <v-pagination
                v-model="currentPage"
                class="pagination"
                :length="pages"
              />
            </template>
            <template #item.check="{ internalItem, isSelected, toggleSelect,item }">
              <v-checkbox-btn
                :model-value="isSelected(internalItem) && !item.corrected"
                @update:model-value="showItem(internalItem,toggleSelect)"
              />
            </template>
            <template #item.corrected="{ item }">
              <span :style="{ color: getColor(item) }">
                {{ getCorrected(item.corrected) }}
              </span>
            </template>
            <template #item.group="{item}">
              {{ item.groupName }}
            </template>
            <template #item.student="{item}">
              {{ item.studentName }} ({{ item.number }})
            </template>
            <template #item.course="{item}">
              {{ item.courseName }}
            </template>
            <template #item.section="{item}">
              {{ item.sectionName }}
            </template>
            <template #item.task="{item}">
              {{ item.taskName }}
            </template>
            <template #item.time="{item}">
              {{ getDaysAgo(item.submitTime) }}
            </template>
            <template #item.goto="{item}">
              <v-btn
                v-show="item.corrected"
                class="text-green-500"
                variant="text"
                @click="ToCorrectedAnswer(item.id)"
              >
                查看批改结果
              </v-btn>
            </template>
          </v-data-table>
        </div>
      </div>
    </main>
  </div>
</template>
<script>
import CustomFloatBackButton from '@/components/CustomFloatBackButton.vue';
import { getCourseList, getGroupList } from '@/api/course';
import { getAnswer } from '@/api/correct';
import mitt from '@/plugins/mitt';

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
      headers: [
        {
          title: '',
          key:'check'
        },
        {
          title: '',
          value: item => {
            if (item.corrected) {
              return '已批改';
            } else {
              return '未批改';
            }
          },
          key: 'corrected',
          sortable: false,

        },
        {
          title: '',
          value: 'groupName',
          key : 'group',
          sortable: false,
        },
        {
          title: '姓名(学号)',
          value: item => {
            return item.studentName + (item.number);
          },
          key : 'student',
          sortable: false,
        },
        {
          title: '课程名称',
          value: 'courseName',
          key:'course',
          sortable: false,
        },
        {
          title: '章节名称',
          value: 'sectionName',
          key:'section',
          sortable: false,
        },
        {
          title: '任务名称',
          value: 'taskName',
          key:'task',
          sortable: false,
        },
        {
          title: '提交时间',
          value: 'submitTime',
          key:'time',
          sortable: false,
        },
        {
          title: '操作',
          key: 'goto',
          sortable: false,
        }
      ],
      correctList: [],
      correctsId: [],
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
  computed: {
    selectedItem() {
      return this.correctsId.filter(this.filterItem);
    }
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
      if (
        this.studentName === null &&
        this.sectionName === null &&
        this.taskName === null
      ) {
        this.currentPage = 1;
        this.selectIdForCorrect();
      }
    },
    sectionName() {
      if (
        this.studentName === null &&
        this.sectionName === null &&
        this.taskName === null
      ) {
        this.currentPage = 1;
        this.selectIdForCorrect();
      }
    },
    taskName() {
      if (
        this.studentName === null &&
        this.sectionName === null &&
        this.taskName === null
      ) {
        this.currentPage = 1;
        this.selectIdForCorrect();
      }
    },
    currentPage() {
      this.selectIdForCorrect();
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
      const ids=this.selectedItem.map(item=> item.id);
      this.$router.push({
        path: '/teacher/correct/batch/correct',
      });
      localStorage.setItem('correctsId', JSON.stringify(ids));
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
      } else if (diffTime < 1000 * 60 * 60 * 24) {
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
        page: this.currentPage,
      }).then((res) => {
        this.correctList = res.data.list;
        this.pages = res.data.totalPage;
        this.isLoading = false;
      });
    },
    ToCorrectedAnswer(id) {
      this.$router.push({
        path: `/teacher/correct/${id}`,
      });
    },
    getCorrected(item) {
      if (item) {
        return '已批改';
      } else {
        return '未批改';
      }
    },
    getColor(item) {
      if (item.corrected) {
        return 'green';
      } else {
        return 'orange';
      }
    },
    showItem(item, toggleSelect) {
      if (item.raw.corrected) {
        mitt.emit('showToast', { title: '作业已批改', color: 'warning', icon: '$warning' });
        return;
      }
      toggleSelect(item);
    },
    filterItem(item) {
      return !item.corrected;
    }
  },
};
</script>
<style lang="scss" scoped>
.choose-table {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1em 0;
  > * {
    margin-left: 1em;
  }
  .class-select {
    margin: 0;
  }
}
.text-white{
  background: #212121;
}
.status-select {
  width: 11vw;
}
.group-select {
  width: 12vw;
}
</style>