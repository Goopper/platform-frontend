<template>
  <div
    v-for="courseInfo in course"
    :key="courseInfo.id"
  >
    <!-- 一个课程卡片 @click是跳转到课程详情页面 -->
    <div
      class="using-card"
      @click="goToDetail(courseInfo.id,courseInfo.name)"
    >
      <img
        :src="courseInfo.cover"
        alt="课程图片"
      >
      <!-- 课程详细 -->
      <div class="course-info">
        <div class="title-more">
          <h2>{{ courseInfo.name }}</h2>
          <!-- 更多按钮 -->
          <v-menu open-on-click>
            <template #activator="{ props }">
              <div
                v-bind="props"
                class="cursor-pointer"
              >
                <v-icon> mdi-dots-horizontal </v-icon>
              </div>
            </template>
            <!-- 使用中的按钮 -->
            <v-list v-if="state.name === '使用中'">
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
                            applyGroupList(courseInfo.id),
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
                <v-btn @click="deactivate_course(courseInfo.id)">
                  🚫停用
                </v-btn>
              </v-list-item>
            </v-list>
            <!-- 草稿的按钮 -->
            <v-list v-else-if="state.name === '草稿'">
              <v-list-item>
                <v-btn
                  block
                  variant="text"
                  @click="publishCourse(courseInfo.id)"
                >
                  📤发布
                </v-btn>
                <v-list-item>
                  <v-btn
                    block
                    variant="text"
                    @click="copyCourse(courseInfo.id)"
                  >
                    ✒复制
                  </v-btn>
                </v-list-item>
                <v-list-item>
                  <router-link
                    :to="{ path: 'create', query: { id: courseInfo.id } }"
                  >
                    <v-btn
                      block
                      variant="text"
                    >
                      📃编辑
                    </v-btn>
                  </router-link>
                </v-list-item>
                <v-list-item>
                  <v-dialog
                    persistent
                    max-width="290"
                  >
                    <template #activator="{ props: activatorProps }">
                      <v-btn
                        block
                        variant="text"
                        v-bind="activatorProps"
                      >
                        🚫删除
                      </v-btn>
                    </template>
                    <template #default="{ isActive }">
                      <v-card
                        title="确认删除"
                        color="white"
                      >
                        <v-card-text>
                          你确定要删除
                          {{ courseInfo.name }} 吗？
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
                            id="delete-success"
                            text
                            @click="
                              deleteCourse(courseInfo.id), (isActive.value = false)
                            "
                          >
                            确定
                          </v-btn>
                        </v-card-actions>
                      </v-card>
                    </template>
                  </v-dialog>
                </v-list-item>
              </v-list-item>
            </v-list>
            <v-list v-else>
              <v-list-item>
                <v-btn
                  block
                  variant="text"
                  @click="enableCourse(courseInfo.id)"
                >
                  ⭕启用课程
                </v-btn>
              </v-list-item>
            </v-list>
          </v-menu>
        </div>
        <span
          v-if="state.name === '草稿'"
          class="draft-state"
        >
          {{ state.name }}
        </span>
        <span
          v-else-if="state.name === '使用中'"
          class="using-state"
        >
          {{ state.name }}
        </span>
        <span
          v-else
          class="deactivated-state"
        >
          {{ state.name }}
        </span>
        <p>{{ courseInfo.type }},{{ courseInfo.desc }}</p>
      </div>
    </div>
  </div>
</template>
<script>
import { getGroupList, applyGroup, deleteCourse,copyCourse,publishCourse,deactivateCourse,enableCourse } from '@/api/course';
export default {
  name: 'CustomCourseCard',
  props: {
    course: {
      type: Object,
      required: true,
    },
    state: {
      type: Object,
      required: true,
    },
  },
  data: () => ({
    // 小组列表
    groupList: null,
    // 添加小组
    applyGroups: [],
    //是否有课程
    isShow: true,

    isUsing: true,
    isDeactivated: false,
    isDraft: false,
  }),
  methods: {
    //获取所有小组
    getGroupList() {
      getGroupList().then((res) => {
        for (let i = 0; i < res.data.length; i++) {
          this.groupList.push(res.data[i]);
        }
      });
    },
    //跳转到课程详情页
    goToDetail(courseId,courseName) {
      this.$router.push({ path: 'detail', query: { id: courseId , name:courseName} });
    },
    //跳转到创建&修改课程页
    goToCreate(courseId) {
      this.$router.push({ path: 'create', query: { id: courseId } });
    },

    //复制课程
    copyCourse(id) {
      const courseId = new FormData();
      courseId.append('courseId', Number(id));
      copyCourse(courseId).then(() => {
        this.$router.go(0);
      });
    },
    //发布课程
    publishCourse(id) {
      publishCourse(id).then(() => {
        this.$router.go(0);
      });
    },
    //停用课程
    deactivate_course(id) {
      deactivateCourse(id).then(() => {
        this.$router.go(0);
      });
    },
    //启用课程
    enableCourse(id) {
      enableCourse(id).then(() => {
        this.$router.go(0);
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
      deleteCourse(courseId).then(() => {
        this.$router.go(0);
      });
    },
  },
};
</script>
<style lang="scss" scoped>
$warn: #fb8c00;
$success: #4caf50;
$error: red;

.using-card {
  width: 13em;
  height: 17em;
  border: 1px solid #e0e0e0;
  padding: 1em;
  background-color: white;
  border-radius: 0.25em;

  img {
    width: 14em;
    height: 9em;
    border-radius: 0.25em;
  }

  h2 {
    font-weight: 600;
    padding: 0.5em 0;
  }

  .title-more {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  span {
    color: white;
    font-size: 0.7em;
    padding: 0.25em 0.5em;
    border-radius: 10px;
  }

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
.using-card:hover {
  cursor: pointer;
}

.draft-state{
  background-color: $warn;
}

.using-state{
  background-color: $success;
}
.deactivated-state{
  background-color: $error;
}

.v-list {
  padding: 0;

  .v-list-item {
    padding: 0;
    padding-inline: 0.5em;
  }
}
@media (max-width: 720px) {
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
</style>