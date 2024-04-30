<template>
  <!-- 一个课程卡片 @click是跳转到课程详情页面 -->
  <div
    class="using-card"
    @click="goToDetail(course.id)"
  >
    <v-img
      :src="course.cover"
      alt="课程图片"
      :loading="loading"
    />
    <!-- 课程详细 -->
    <div class="course-info">
      <div class="title-more">
        <h2>{{ course.name }}</h2>
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
          <v-list v-if="course.status === '使用中'">
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
                    :title="`应用到${course.name}`"
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
                        class="other-btn"
                        variant="outlined"
                        color="white"
                        @click="
                          applyGroupList(course.id), (isActive.value = false)
                        "
                      >
                        确定
                      </v-btn>
                      <v-btn
                        variant="outlined"
                        @click="isActive.value = false"
                      >
                        取消
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </template>
              </v-dialog>
            </v-list-item>
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
                      你确定要停用"{{ course.name }}"吗？
                    </v-card-text>
                    <v-card-actions>
                      <v-spacer />
                      <v-btn
                        class="deactivate-btn"
                        variant="outlined"
                        color="white"
                        @click="
                          deactivate_course(course.id), (isActive.value = false)
                        "
                      >
                        确定
                      </v-btn>
                      <v-btn
                        variant="outlined"
                        @click="isActive.value = false"
                      >
                        取消
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </template>
              </v-dialog>
            </v-list-item>
          </v-list>
          <!-- 草稿的按钮 -->
          <v-list v-else-if="course.status === '草稿'">
            <v-dialog
              persistent
              max-width="290"
            >
              <template #activator="{ props: activatorProps }">
                <v-btn
                  block
                  variant="text"
                  v-bind="activatorProps"
                  @click="
                    (dialogTitle = '发布课程'),
                    (dialogText = '需发布'),
                    (calledInterface = () => publishCourse(course.id))
                  "
                >
                  📤发布
                </v-btn>
                <v-btn
                  block
                  variant="text"
                  v-bind="activatorProps"
                  @click="
                    (dialogTitle = '复制课程'),
                    (dialogText = '是否需要复制'),
                    (calledInterface = () => copyCourse(course.id))
                  "
                >
                  ✒复制
                </v-btn>
                <router-link :to="{ path: 'create', query: { id: course.id } }">
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
                  @click="
                    (dialogTitle = '删除课程'),
                    (dialogText = '确认是否删除'),
                    (calledInterface = () => deleteCourse(course.id))
                  "
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
                    {{ dialogText }}"{{ course.name }}"课程吗？
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer />
                    <v-btn
                      variant="outlined"
                      color="white"
                      :class="getButtonColor(dialogTitle)"
                      @click="calledInterface(), (isActive.value = false)"
                    >
                      确定
                    </v-btn>
                    <v-btn
                      variant="outlined"
                      @click="isActive.value = false"
                    >
                      取消
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
                    color="white"
                    v-bind="activatorProps"
                    @click="
                      (dialogTitle = '启用课程'),
                      (dialogText = '确认要启用'),
                      (calledInterface = () => enableCourse(course.id))
                    "
                  >
                    ⭕启用课程
                  </v-btn>
                  <v-btn
                    block
                    variant="text"
                    v-bind="activatorProps"
                    @click="
                      (dialogTitle = '删除课程'),
                      (dialogText = '确认是否删除'),
                      (calledInterface = () => deleteCourse(course.id))
                    "
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
                      {{ dialogText }}"{{ course.name }}"课程吗？
                    </v-card-text>
                    <v-card-actions>
                      <v-spacer />
                      <v-btn
                        variant="outlined"
                        color="white"
                        :class="getButtonColor(dialogTitle)"
                        @click="calledInterface(), (isActive.value = false)"
                      >
                        确定
                      </v-btn>
                      <v-btn
                        class="cancel-btn"
                        variant="outlined"
                        @click="isActive.value = false"
                      >
                        取消
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
        {{ course.type }}
      </span>
      <span
        class="state"
        :style="getColor(course.status)"
      >
        {{ course.status }}
      </span>
      <p>{{ course.desc }}</p>
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
import color from '@/utils/color';
export default {
  name: 'CustomCourseCard',
  props: {
    course: {
      type: Object,
      required: true,
    },
  },
  emits: ['refresh'],
  data: () => ({
    // 小组列表
    groupList: [],
    // 添加小组
    applyGroups: [],
    loading: true,
  }),
  created() {
    //获取所有小组
    getGroupList().then((res) => {
      this.groupList = res.data;
    });
  },
  methods: {
    //跳转到课程详情页
    goToDetail(courseId) {
      this.$router.push({
        path: `/course/detail/${courseId}`,
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
        this.$emit('refresh');
      });
    },
    //发布课程
    publishCourse(id) {
      publishCourse(id).then(() => {
        this.$emit('refresh');
      });
    },
    //停用课程
    deactivate_course(id) {
      deactivateCourse(id).then(() => {
        this.$emit('refresh');
      });
    },
    //启用课程
    enableCourse(id) {
      enableCourse(id).then(() => {
        this.$emit('refresh');
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
        this.$emit('refresh');
      }
    },
    //删除课程
    deleteCourse(courseId) {
      deleteCourse(courseId).then(() => {
        this.$emit('refresh');
      });
    },

    //判断按钮颜色
    getButtonColor(title) {
      if (title === '删除课程') {
        return 'deactivate-btn';
      } else {
        return 'other-btn';
      }
    },
    //获取颜色
    getColor(status) {
      return { 'background-color': color.getColor(status) };
    },

  },
};
</script>
<style lang="scss" scoped>
$warning: #FB8C00;
$error: #FF4500;
$success: #4CAF50;
.using-card {
  width: 13em;
  height: 17em;
  border: 1px solid #e0e0e0;
  padding: 1em;
  background-color: white;
  border-radius: 0.25em;

  .v-img {
    width: 14em;
    height: 9em;
    border-radius: 0.25em;
    background-color: #bdbdbd;
  }

  h2 {
    font-weight: 600;
    padding: 0.5em 0;
    max-width: 100%;
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
  .state{
    margin: 0 0.5em;
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
//确认按钮样式
.other-btn{
  background-color: $warning;
}
.deactivate-btn{
  background-color: $error;
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
    width: 100%;
    height: auto;
    .v-img {
      width: 50%;
    }
    p {
      padding-top: 0.5em;
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
    h2{
      white-space: normal;
    }
  }

  .title-more {
    display: flex;
    justify-content: space-between;
  }

  .course-info {
    padding: 0 0.5em;
    width: 100%;
  }
}

.v-list {
  padding: 0.25em;
}
</style>