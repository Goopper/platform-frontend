<template>
  <div
    v-for="courseInfo in course"
    :key="courseInfo.id"
  >
    <!-- 一个课程卡片 @click是跳转到课程详情页面 -->
    <div
      class="using-card"
      @click="goToDetail(courseInfo.id, courseInfo.name)"
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
                    <v-btn
                      block
                      variant="text"
                      v-bind="activatorProps"
                    >
                      🔮应用到小组
                    </v-btn>
                  </template>
                  <template #default="{ isActive }">
                    <v-card
                      :title="`应用到${courseInfo.name}`"
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
                <v-dialog
                  persistent
                  max-width="300"
                >
                  <template #activator="{ props: activatorProps }">
                    <v-btn
                      block
                      variant="text"
                      v-bind="activatorProps"
                    >
                      🚫停用
                    </v-btn>
                  </template>
                  <template #default="{ isActive }">
                    <v-card
                      title="是否停用" 
                      color="white"
                    >
                      <v-card-text>
                        你确定要停用"{{ courseInfo.name }}"吗？
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
                            deactivate_course(courseInfo.id),
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
            </v-list>
            <!-- 草稿的按钮 -->
            <v-list v-else-if="state.name === '草稿'">
              <v-dialog
                persistent
                max-width="290"
              >
                <template #activator="{ props: activatorProps }">
                  <v-btn
                    block
                    variant="text"
                    v-bind="activatorProps"
                    @click="dialogTitle = '发布课程', dialogText = '需发布',calledInterface=() => publishCourse(courseInfo.id)"
                  >
                    📤发布
                  </v-btn>
                  <v-btn
                    block
                    variant="text"
                    v-bind="activatorProps"
                    @click="dialogTitle = '复制课程', dialogText = '是否需要复制',calledInterface=() => copyCourse(courseInfo.id)"
                  >
                    ✒复制
                  </v-btn>
                  <router-link :to="{ path: 'create', query: { id: courseInfo.id } }">
                    <v-btn
                      block
                      variant="text"
                    >
                      📃编辑
                    </v-btn>
                  </router-link>
                  <v-btn
                    block
                    variant="text"
                    v-bind="activatorProps"
                    @click="dialogTitle = '删除课程', dialogText = '确认是否删除',calledInterface=() => deleteCourse(courseInfo.id)"
                  >
                    🚫删除
                  </v-btn>
                </template>
                <template #default="{ isActive }">
                  <v-card
                    :title="dialogTitle"
                    color="white"
                  >
                    <v-card-text>
                      {{ dialogText }}"{{ courseInfo.name }}"课程吗？
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
                        text
                        @click="
                          calledInterface() , (isActive.value = false)
                        "
                      >
                        确定
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </template>
              </v-dialog>
            </v-list>
            <!-- 已禁用的按钮 -->
            <v-list v-else>
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
                      @click="dialogTitle = '启用课程', dialogText = '确认要启用',calledInterface=() => enableCourse(courseInfo.id)"
                    >
                      ⭕启用课程
                    </v-btn>
                    <v-btn
                      block
                      variant="text"
                      v-bind="activatorProps"
                      @click="dialogTitle = '删除课程', dialogText = '确认是否删除',calledInterface=() => deleteCourse(courseInfo.id)"
                    >
                      🚫删除
                    </v-btn>
                  </template>
                  <template #default="{ isActive }">
                    <v-card
                      :title="dialogTitle"
                      color="white"
                    >
                      <v-card-text>
                        {{ dialogText }}"{{ courseInfo.name }}"课程吗？
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
                          text
                          @click="
                            calledInterface(), (isActive.value = false)
                          "
                        >
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
        <span>
          {{ courseInfo.type }}
        </span>
        <p>{{ courseInfo.desc }}</p>
      </div>
    </div>
  </div>
</template>
<script>
import {
  getGroupList,
  applyGroup,
  deleteCourse,
  copyCourse,
  publishCourse,
  deactivateCourse,
  enableCourse,
} from '@/api/course';
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
    groupList: [],
    // 添加小组
    applyGroups: [],
    //是否有课程
    isShow: true,

    isUsing: true,
    isDeactivated: false,
    isDraft: false,
  }),
  created() {
    //获取所有小组
    getGroupList().then((res) => {
      this.groupList = res.data;
    });
  },
  methods: {
    //跳转到课程详情页
    goToDetail(courseId, courseName) {
      this.$router.push({
        path: 'detail',
        query: { id: courseId, name: courseName },
      });
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
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .title-more {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  span {
    font-size: 0.7em;
    padding: 0.25em 0.5em;
    border-radius: 10px;
    background-color: #383838;
    color: white;
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

.v-list {
  padding: 0;

  .v-list-item {
    padding: 0;
  }
}

@media (max-width: 520px) {
  .using-card {
    display: flex;
    width: 80%;
    height: auto;
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
    -webkit-line-clamp: 3;
    /* 限制行数为3行 */
    -webkit-box-orient: vertical;
    /* 设置布局为垂直 */
    overflow: hidden;
    /* 隐藏多余的文本 */
    text-overflow: ellipsis;
    /* 多余的文本显示为省略号 */
    white-space: pre-wrap;
    /* 保留空白和换行 */
    word-wrap: break-word;
    /* 允许单词换行 */
    height: auto;
    /* 高度自适应 */
    font-size: 1em;
    width: 80%;
  }
}

.v-list {
  padding: 0.25em;
}
</style>