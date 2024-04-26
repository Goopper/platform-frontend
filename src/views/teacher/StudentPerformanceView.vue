<template>
  <div class="flex flex-col">
    <custom-float-back-button />
    <div class="flex gap-6">
      <v-text-field
        v-model="studentName"
        variant="outlined"
        label="学生姓名模糊查询"
        density="compact"
      />
      <v-select
        v-model="selectedGroupId"
        flat
        :items="groups"
        item-title="name"
        item-value="id"
        no-data-text="没有小组"
        density="compact"
        label="小组"
        variant="outlined"
      />
      <v-select
        v-model="selectedCourseTypeId"
        flat
        :items="courseTypeList"
        item-title="name"
        item-value="id"
        no-data-text="没有课程类型"
        density="compact"
        label="课程类型"
        variant="outlined"
      >
        <template #append>
          <v-btn
            variant="flat"
            :loading="loading"
            @click="searchStudentPerformance"
          >
            搜索
          </v-btn>
        </template>
      </v-select>
    </div>
    <div class="flex-grow overflow-y-auto">
      <v-data-table
        class="h-full border"
        fixed-footer
        fixed-header
        theme="light"
        hover
        :headers="headers"
        items-per-page="10"
        :items="studentPerformanceList"
        :loading="loading"
      >
        <template #headers="{ columns }">
          <tr class="bg-primary-important text-white">
            <template
              v-for="column in columns"
              :key="column.key"
            >
              <td>
                <span
                  class="mr-2 text-lg font-black"
                >{{ column.title }}</span>
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
            class="border-t"
            :length="totalPage"
          />
        </template>
      </v-data-table>
    </div>
  </div>
</template>

<script>
import { getCourseType, getGroupList } from '@/api/course';
import { teacherGetStudentLearningPerformance } from '@/api/student';

export default {
  name: 'StudentPerformanceView',
  data: () => ({
    courseTypeList: [
      {
        id: null,
        name: '全部'
      }
    ],
    groups: [
      {
        id: null,
        name: '全部'
      }
    ],
    selectedCourseTypeId: null,
    selectedGroupId: null,
    studentName: '',
    currentPage: 1,
    totalPage: 1,
    studentPerformanceList: [],
    loading: true,
    headers: [
      {
        title: '学生姓名',
        value: 'name',
        sortable: false,
      },
      {
        title: '小组',
        value: 'groupName',
        sortable: false,
      },
      {
        title: '课程',
        value: 'courseName',
        sortable: false,
      },
      {
        title: '总任务',
        value: 'totalTask',
        sortable: false,
      },
      {
        title: '已完成的任务',
        value: 'finishedTask',
        sortable: false,
      }
    ]
  }),
  watch: {
    currentPage() {
      this.searchStudentPerformance();
    }
  },
  created() {
    getCourseType().then(res => {
      if (res) {
        this.courseTypeList = this.courseTypeList.concat(res.data);
      }
    });
    getGroupList().then(res => {
      if (res) {
        this.groups = this.groups.concat(res.data);
      }
    });
    this.searchStudentPerformance();
  },
  methods: {
    async searchStudentPerformance() {
      this.loading = true;
      const res = await teacherGetStudentLearningPerformance(this.studentName, this.currentPage, this.selectedGroupId, this.selectedCourseTypeId);
      if (res) {
        this.studentPerformanceList = res.data.list;
        this.totalPage = res.data.totalPage;
      }
      this.loading = false;
    }
  }
};
</script>

<style>

</style>