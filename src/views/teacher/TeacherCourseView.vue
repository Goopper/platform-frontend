<template>
  <main>
    <!-- 导航栏 -->
    <nav>
      <v-text-field
        v-model="searchCourseName"
        class="course-input"
        label="课程名称"
        variant="outlined"
        density="compact"
        hide-details
      />
      <v-select
        v-model="selectedState"
        class="state-select"
        label="状态"
        :items="['所有', '使用中', '草稿']"
        variant="outlined"
        density="compact"
        hide-details
      />
      <router-link to="create">
        <v-btn prepend-icon="mdi-pencil">
          创建课程
        </v-btn>
      </router-link>
    </nav>
    <!-- 使用课程 -->
    <h1>使用中</h1>
    <div
      v-if="isShowUsing"
      id="using-course"
    >
      <!-- 课程卡片 -->
      <div class="using-box">
        <div
          v-for="usingCourse in usingCourseList"
          :key="usingCourse.id"
        >
          <!-- 一个课程卡片 -->
          <div
            class="using-card"
            @click="goToDetail(usingCourse.id)"
          >
            <img
              :src="usingCourse.cover"
              alt=""
            >
            <!-- 课程详细 -->
            <div class="course-info">
              <div class="title-more">
                <h2>{{ usingCourse.name }}</h2>
                <v-menu
                  open-on-click
                >
                  <template #activator="{ props }">
                    <div
                      v-bind="props"
                      class="cursor-pointer"
                    >
                      <v-icon> mdi-dots-horizontal </v-icon>
                    </div>
                  </template>
                  <v-list>
                    <!-- 应用小组 -->
                    <v-list-item>
                      <v-dialog
                        persistent
                        max-width="360"
                      >
                        <template #activator="{ props: activatorProps }">
                          <v-btn v-bind="activatorProps">
                            🔮应用到小组
                          </v-btn>
                        </template>
                        <template #default="{ isActive }">
                          <v-card
                            title="选择小组"
                            color="white"
                          >
                            <v-card-text>
                              <v-combobox
                                v-model="applyGroups"
                                variant="outlined"
                                :items="groupList"
                                item-title="name"
                                item-value="id"
                                label="选择小组"
                                multiple
                                clearable
                              />
                            </v-card-text>
                            <v-card-actions>
                              <v-spacer />
                              <v-btn
                                text
                                @click="isActive.value = false"
                              >
                                取消
                              </v-btn>
                              <v-btn
                                id="apply-success"
                                text
                                @click="
                                  applyGroupList(usingCourse.id),
                                  (isActive.value = false)
                                "
                              >
                                确定
                              </v-btn>
                            </v-card-actions>
                          </v-card>
                        </template>
                      </v-dialog>
                    </v-list-item>
                    <!-- 停用 -->
                    <v-list-item class="d-flex justify-center">
                      <v-btn> 🚫停用 </v-btn>
                    </v-list-item>
                  </v-list>
                </v-menu>
              </div>
              <span class="using-type">{{ courseState[2] }}</span>
              <p>{{ usingCourse.type }} {{ usingCourse.desc }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      v-else
      class="p-4 flex flex-col justify-center items-center"
    >
      <v-icon
        size="100px"
        class="text-gray-400 mt-8"
        icon="mdi-signal-off"
      />
      <p class="font-bold text-lg text-gray-400">
        无课程
      </p>
    </div>
    <!-- 待发布课程 -->
    <h1>草稿</h1>
    <div
      v-if="isShowDraft"
      id="draft-course"
    >
      <div class="using-box">
        <div
          v-for="draftCourse in draftCourseList"
          :key="draftCourse.id"
          class="course-cards"
        >
          <div
            class="using-card"
            @click="goToDetail(draftCourse.id)"
          >
            <img
              :src="draftCourse.cover"
              alt=""
            >
            <div class="course-info">
              <div class="title-more">
                <h2>{{ draftCourse.name }}</h2>
                <!-- 更多框 -->
                <v-menu open-on-click>
                  <!-- 按钮展示更多框 -->
                  <template #activator="{ props }">
                    <div
                      v-bind="props"
                      class="cursor-pointer"
                    >
                      <v-icon> mdi-dots-horizontal </v-icon>
                    </div>
                  </template>
                  <!-- 更多框 -->
                  <v-list>
                    <!-- 复制 -->
                    <v-list-item>
                      <v-btn @click="copyCourse(draftCourse.id)">
                        ✒复制
                      </v-btn>
                    </v-list-item>
                    <!-- 编辑 -->
                    <v-list-item>
                      <router-link
                        :to="{ path: 'create', query: { id: draftCourse.id } }"
                      >
                        <v-btn> 📃编辑 </v-btn>
                      </router-link>
                    </v-list-item>
                    <!-- 删除的按钮事件 -->
                    <v-list-item>
                      <v-dialog
                        persistent
                        max-width="290"
                      >
                        <template #activator="{ props: activatorProps }">
                          <v-btn v-bind="activatorProps">
                            🚫删除
                          </v-btn>
                        </template>
                        <!-- 弹框样式 -->
                        <template #default="{ isActive }">
                          <v-card
                            title="确认删除"
                            color="white"
                          >
                            <v-card-text>
                              你确定要删除
                              {{ draftCourse.name }} 吗？
                            </v-card-text>
                            <v-card-actions>
                              <v-spacer />
                              <!-- 取消 -->
                              <v-btn
                                text
                                @click="isActive.value = false"
                              >
                                取消
                              </v-btn>
                              <!-- 确认 -->
                              <v-btn
                                id="delete-success"
                                text
                                @click="
                                  deleteCourse(draftCourse.id),
                                  (isActive.value = false)
                                "
                              >
                                <!-- deleteCourse(DraftCourse.id) -->
                                确定
                              </v-btn>
                            </v-card-actions>
                          </v-card>
                        </template>
                      </v-dialog>
                    </v-list-item>
                  </v-list>
                </v-menu>
              </div>
              <span class="draft-type">{{ courseState[1] }}</span>
              <p>{{ draftCourse.type }} {{ draftCourse.desc }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      v-else
      class="p-4 flex flex-col justify-center items-center"
    >
      <v-icon
        size="100px"
        class="text-gray-400 mt-8"
        icon="mdi-signal-off"
      />
      <p class="font-bold text-lg text-gray-400">
        无课程
      </p>
    </div>
  </main>
</template>

<script>
import {
  getTeacherCourseList,
  deleteCourse,
  applyGroup,
  getGroupList,
  getCourseInfo,
  createCourse,
} from '@/api/course';
import mitt from 'mitt';
export default {
  name: 'TeacherCourseView',
  data() {
    return {
      courseList: [],
      groupList: [],
      applyGroups: [],
      usingCourseList: [],
      draftCourseList: [],
      stateNameList: [],
      courseState: {
        2: '使用中',
        1: '草稿',
      },
      course: [],
      searchCourseName: null,
      selectedState: null,
      //展示使用中和待发布
      isShowUsing: true,
      isShowDraft: true,
      isShowCourse: false,
    };
  },
  // 监听两个输入框
  watch: {
    searchCourseName() {
      getTeacherCourseList(2, this.searchCourseName).then((res) => {
        console.log(this.searchCourseName);
        this.usingCourseList = res.data;
        if (this.usingCourseList.length === 0) {
          this.isShowUsing = false;
        } else {
          this.isShowUsing = true;
        }
      });

      getTeacherCourseList(1, this.searchCourseName).then((res) => {
        this.draftCourseList = res.data;
        if (this.draftCourseList.length === 0) {
          this.isShowDraft = false;
        } else {
          this.isShowDraft = true;
        }
      });
    },
    selectedState() {
      if (this.selectedState === '使用中') {
        this.isShowUsing = true;
        this.isShowDraft = false;
      } else if (this.selectedState === '草稿') {
        this.isShowDraft = true;
        this.isShowUsing = false;
      } else {
        this.isShowDraft = true;
        this.isShowUsing = true;
      }
    },
  },
  created() {
 //待发布课程
    getTeacherCourseList(1, '').then((res) => {
      if(res.data.length.length === 0){
        this.isShowDraft = false;
      }else{
        this.draftCourseList = res.data;
      }
    });
    //使用中课程
    getTeacherCourseList(2, '').then((res) => {
      
      if(res.data.length.length === 0){
        this.isShowUsing = false;
      } else {
        this.usingCourseList = res.data;
      }
    });
    
    getGroupList().then((res) => {
      for (let i = 0; i < res.data.length; i++) {
        this.groupList.push(res.data[i]);
      }
    });
    
  },
  methods: {
    //跳转到课程详情页
    goToDetail(courseId) {
      this.$router.push({ path: 'detail', query: { id: courseId } });
    },
    //跳转到创建&修改课程页
    goToCreate(courseId) {
      this.$router.push({ path: 'create', query: { id: courseId } });
    },
    //复制课程
    copyCourse(courseId) {
      console.log(this.course);
      getCourseInfo(courseId).then((res) => {
        this.Course = res.data;
      });

      console.log(this.courseId);
      createCourse(this.course).then((res) => {
        console.log(res);
      });
    },
    //应用到小组
    applyGroupList(courseId) {
      const groups = new FormData();
      const groupsId = [];
      this.applyGroups.forEach((group) => {
        groupsId.push(group.id.toString());
      });
      if (this.applyGroups.length == 0) {
        mitt.emit('showToast', {
          title: '输入组为空',
          color: 'error',
          icon: '$error',
        });
      } else {
        groups.append('groupIds', groupsId);
        applyGroup(courseId, groups);
      }
    },
    //删除课程
    deleteCourse(courseId) {
      // console.log('删除课程', courseId);
      deleteCourse(courseId);
    },
  },
};
</script>

<style lang="scss" scoped>
$warn: #fb8c00;
$success: #4caf50;

main {
  width: 100%;
  height: 100%;
}

//导航栏
nav {
  display: flex;

  .course-input {
    flex: 4;
    background-color: white;
  }

  .state-select {
    margin: 0 1em;
    background-color: white;
    flex: 1;
  }
}

//标签
h1 {
  font-size: 1.1em;
  margin: 1em 0;
}

// 使用中的所有课程卡片
.using-box {
  overflow: auto;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
  grid-gap: 1em;
  height: 18em;

  //一个课程卡片
  .using-card {
    width: 13em;
    border: 1px solid #e0e0e0;
    padding: 1em;
    // margin: 0 0.5em;
    background-color: white;
    border-radius: 0.25em;

    //课程中的图片
    img {
      width: 14em;
      height: 9em;
      border-radius: 0.25em;
    }

    h2 {
      font-weight: 600;
      padding: 0.5em 0;
    }

    //名称和更多
    .title-more {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    //状态的样式
    span {
      color: white;
      font-size: 0.7em;
      padding: 0.25em;
      border-radius: 10px;
    }

    //课程说明
    p {
      padding-top: 0.75em;
      font-size: 0.8em;
      color: #666666;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      line-height: 1em;
      max-width: 100%;
    }
  }
}

.using-card:hover {
  cursor: pointer;
}

//两种状态的颜色
.draft-type {
  background-color: $warn;
}

.using-type {
  background-color: $success;
}

.v-list {
  padding: 0;

  .v-list-item {
    padding: 0;
    padding-inline: 0.5em;
  }
}

// 响应式
@media (max-width: 1600px) {
  .using-box {
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  }
}

@media (max-width: 1200px) {
  .using-box {
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }
}

@media (max-width: 950px) {
  .using-box {
    grid-template-columns: 1fr 1fr 1fr;
  }
}

@media (max-width: 720px) {
  nav {
    .course-input {
      flex: 1;
    }

    .state-select {
      margin: 0 0.25em;
    }
  }

  .using-box {
    grid-template-columns: 1fr;

    .using-card {
      display: flex;
      width: auto;
    }

    .title-more {
      display: flex;
      justify-content: space-between;
    }

    .course-info {
      padding: 0 0.5em;
      width: 80%;
    }

    p {
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 3;
      /* 修改这里 */
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: pre-wrap;
      word-wrap: break-word;
      max-width: 80%;
    }
  }

  .v-btn {
    display: none;
  }
}
</style>