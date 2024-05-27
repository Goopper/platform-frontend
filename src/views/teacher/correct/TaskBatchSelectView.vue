<template>
  <div>
    <div class="back-button">
      <custom-float-back-button />
    </div>
    <main>
      <div class="choose-table">
        <v-select
          v-model="groupSelected"
          class=" max-w-[256px]"
          label="小组"
          :items="groupList"
          item-title="name"
          item-value="id"
          density="compact"
          variant="outlined"
          theme="light"
          hide-details
          clearable
        />
        <div class="course-select">
          <v-select
            v-model="courseSelected"
            class="w-[168px]"
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
          <v-select
            v-model="sectionSelected"
            class="w-[184px]"
            label="章节"
            :items="sectionList"
            item-title="name"
            item-value="id"
            density="compact"
            variant="outlined"
            theme="light"
            hide-details
            clearable
            :disabled="!courseSelected"
          />
          <v-select
            v-model="taskSelected"
            class="w-[190px]"
            label="任务"
            :items="taskList"
            item-title="name"
            item-value="id"
            density="compact"
            variant="outlined"
            theme="light"
            hide-details
            clearable
            :disabled="!sectionSelected"
          />
        </div>
      </div>
      <div class="correct-list">
        <v-table
          density="comfortable"
          theme="light"
        >
          <thead>
            <tr>
              <th>
                <v-checkbox
                  density="compact" 
                  hide-details
                />
              </th>
              <th class="status-select">
                <v-select 
                  v-model="statusSelected"
                  :items="statusList"
                  item-title="name"
                  item-value="id"
                  variant="solo"
                  density="compact"
                  theme="light"
                  flat
                  hide-details
                />
              </th>
              <th>
                <p>小组</p>
              </th>
              <th>
                <p>学生/学号</p>
              </th>
              <th>
                <p>课程名称</p>
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
                  density="compact" 
                  hide-details
                />
              </td>
              <td :style="{ color: correctColor(correct.corrected) }">
                {{ correct.corrected }}
              </td>
              <td>{{ correct.groupName }}</td>
              <td>{{ correct.studentName }} {{ correct.number }}</td>
              <td>{{ correct.courseName }}-{{ correct.sectionName }}-{{ correct.taskName }}</td>
              <td>{{ correct.submitTime }}</td>
            </tr>
          </tbody>
        </v-table>
      </div>
    </main>
  </div>
</template>
<script>
import CustomFloatBackButton from '@/components/CustomFloatBackButton.vue';
import { getCourseList,getGroupList,getCourseTaskList } from '@/api/course';
export default {
  name: 'TaskBatchSelectView',
  components: {
    CustomFloatBackButton,
  },
  data() {
    return {
      groupList: [
        { id: -1, name: '全部'}
      ],
      courseList: [],
      sectionList: [],
      taskList: [],
      statusList: [
        { id:null , name:'全部' },
      ],
      correctList: [],
      courseSelected: null,
      sectionSelected: null,
      taskSelected: null,
      statusSelected: null,
      groupSelected:-1,
    };
  },
  watch: {
    courseSelected() {
      getCourseTaskList(this.courseSelected).then((res) => {
        this.sectionList = res.data;
      });
    },
    sectionSelected() {
      this.taskList = this.sectionList.find(obj => obj.id === this.courseSelected);
      
    },
  },
  created() {
    getCourseList().then((res) => {
      this.courseList = res.data;
    });
    getGroupList().then((res) => {
     this.groupList = this.groupList.concat(res.data);
    });
  },
  methods: {
    correctColor(corrected) {
      return corrected ? '#4CAF50' : '#FB8C00';
    }
  },
};
</script>
<style lang="scss" scoped>
main{
  background-color: white;
}
.choose-table{
  display: flex;
  justify-content: space-between;
  padding: 1em;
  border-bottom: 1px solid #e0e0e0;
}
.course-select{
  display: flex;
  > * {
    margin-left:1em;
  }
}

.status-select{
  width: 12vw;
}
</style>