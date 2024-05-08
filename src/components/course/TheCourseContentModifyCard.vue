<template>
  <div
    v-if="id"
    class="flex-grow h-full flex"
  >
    <!-- left structure -->
    <div
      id="course-creation-left-structure"
      class="relative border-r w-1/4 h-auto overflow-y-auto"
    >
      <v-list
        v-model:opened="opened"
        class="py-0"
        bg-color="white"
        open-strategy="single"
        active-strategy="single-independent"
      >
        <v-list-group
          v-for="section in structure"
          :key="section.id"
          :title="section.name"
          :value="section.id"
          subgroup
        >
          <template #activator="{ props }">
            <v-list-item
              :title="section.name"
              v-bind="props"
              class="cursor-pointer"
              :data-section-name="section.name"
              :value="section.id"
              :class="{ 'course-creation-item-selected': currentKey === `${section.id}` }"
              @click="handleItemClick(`${section.id}`)"
            />
          </template>
          <v-list-item
            v-for="task in section.tasks"
            :key="`${section.id}-${task.id}`"
            class="cursor-pointer"
            :data-section-name="section.name"
            :title="task.name"
            :value="task.id"
            :class="{ 'course-creation-item-selected': currentKey === `${section.id}-${task.id}` }"
            @click="handleItemClick(`${section.id}-${task.id}`, false)"
          />
        </v-list-group>
      </v-list>
      <!-- add button -->
      <v-btn
        id="add-block-menu-activator"
        density="compact"
        class="absolute end-4 bottom-4"
        icon="mdi-plus"
        size="large"
      />
      <v-menu activator="#add-block-menu-activator">
        <v-list bg-color="white">
          <v-list-item>
            <v-btn
              variant="text"
              :loading="loading"
              @click="handleCreateSectionClick"
            >
              添加章节
            </v-btn>
          </v-list-item>
          <v-list-item>
            <v-btn
              variant="text"
              :loading="loading"
              @click="handleCreateTaskClick"
            >
              添加任务
            </v-btn>
          </v-list-item>
        </v-list>
      </v-menu>
      <v-overlay
        v-model="structureLoading"
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
    <!-- right form content -->
    <div class="flex-grow w-3/4 flex flex flex-col">
      <div
        v-if="currentKey === undefined"
        class="flex flex-col justify-center items-center flex-grow"
      >
        <v-icon
          size="100px"
          class="text-gray-400"
          icon="mdi-button-pointer"
        />
        <p class="font-bold text-lg text-gray-400">
          请选择或创建一条记录进行编辑
        </p>
      </div>
      <div
        v-else
        class="flex-grow h-full"
      >
        <router-view />
      </div>
    </div>
    <v-dialog
      v-model="createDialog"
      persistent
      max-width="500"
    >
      <v-card
        title="提示"
        color="white"
      >
        <v-card-text>
          将会在 <strong>{{ currentSectionName }}</strong> 下创建任务，确认吗？
        </v-card-text>
        <v-card-actions>
          <v-btn
            variant="flat"
            class="ms-auto"
            text="确认"
            :loading="loading"
            @click="handleConfirmCreateTaskClick"
          />
          <v-btn
            variant="outlined"
            text="取消"
            :disabled="loading"
            @click="createDialog=false"
          />
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog
      v-model="cancelDialog"
      persistent
      max-width="500"
    >
      <v-card
        title="提示"
        color="white"
      >
        <v-card-text>
          确认要取消编辑吗？所有未保存的内容将会丢失！
        </v-card-text>
        <v-card-actions>
          <v-btn
            variant="flat"
            class="ms-auto"
            color="warning"
            text="确认"
            :loading="loading"
            @click="handleConfirmCancelClick"
          />
          <v-btn
            variant="outlined"
            text="取消"
            :disabled="loading"
            @click="cancelDialog=false"
          />
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog
      v-model="publishDialog"
      persistent
      max-width="500"
    >
      <v-card
        title="提示"
        color="white"
      >
        <v-card-text>
          确认要发布课程吗？发布后将无法再次编辑！
        </v-card-text>
        <v-card-actions>
          <v-btn
            variant="flat"
            class="ms-auto"
            text="确认"
            :loading="publishLoading"
            @click="handleConfirmPublishClick"
          />
          <v-btn
            variant="outlined"
            text="取消"
            :disabled="publishLoading"
            @click="publishDialog=false"
          />
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { getCourseStructure } from '@/api/course';
import { publishCourse } from '@/api/course/creation';
import mitt from '@/plugins/mitt';
import { useSaveStore } from '@/store/common/save';

export default {
  name: 'TheCourseContentModifyCard',
  props: {
    id: {
      type: Number,
      required: true,
      default: null
    },
    loading: {
      type: Boolean,
      default: false
    },
  },
  data: () => ({
    structureLoading: false,
    structure: [],
    currentKey: undefined,
    currentSectionName: undefined,
    opened: [],
    createDialog: false,
    cancelDialog: false,
    publishDialog: false,
    saveStore: useSaveStore(),
    creating: false,
    publishLoading: false,
  }),
  async created() {
    mitt.on('course-creation-structure-update', () => {
      this.loadStructure();
    });
    mitt.on('course-item-selection-update', () => {
      this.loadSelection();
    });
    mitt.on('course-creation-cancel', () => {
      this.cancelDialog = true;
    });
    mitt.on('course-creation-publish', () => {
      this.publishDialog = true;
    });
    mitt.on('course-creation-selection-none', () => {
      this.clearSelection();
    });
    mitt.on('course-creation-creating-update-false', () => {
      this.creating = false;
    });
    mitt.on('course-creation-open-section', (id) => {
      this.opened = [parseInt(id)];
    });

    await this.loadStructure();
    this.loadSelection();
  },
  methods: {
    handleCreateSectionClick() {
      this.routeCreation();
      this.creating = true;
    },
    handleCreateTaskClick() {
      const targets = document.getElementsByClassName('course-creation-item-selected');
      if (targets.length === 0) {
        mitt.emit('showToast', {
          color: 'info',
          icon: '$info',
          title: '请先选择一个章节或任务'
        });
        return;
      }
      this.currentSectionName = targets[0].dataset.sectionName;
      this.createDialog = true;
    },
    handleConfirmCreateTaskClick() {
      this.routeCreation(undefined, false);
      this.createDialog = false;
      this.creating = true;
    },
    handleItemClick(key, isSection = true) {
      if (this.loading) {
        mitt.emit('showToast', {
          color: 'info',
          icon: '$info',
          title: '请等待当前操作完成'
        });
        return;
      }
      this.currentKey = key;
      this.routeCreation(key, isSection);
    },
    routeCreation(key, isSection = true) {
      const target = {
        path: isSection ? '/course/create/section' : '/course/create/task',
        query: {
          id: this.id,
          current: this.currentKey
        }
      };
      // 是否包含id（也就是修改而不是新增）
      if (key) {
        // key: sectionId-taskId or sectionId
        const id = key.indexOf('-') > -1 ? key.split('-')[1] : key;
        target.query.subId = id;
        this.$router.replace(target);
      } else {
        this.$router.replace(target);
      }
    },
    async loadStructure() {
      this.structureLoading = true;
      const res = await getCourseStructure(this.id);
      this.structure = res.data;
      this.structureLoading = false;
    },
    loadSelection() {
      // 如果有 current 参数，直接跳转到对应的章节或任务
      const current = this.$route.query.current;
      if (current) {
        this.currentKey = current;
        const isSection = current.indexOf('-') === -1;
        // 如果是任务，展开对应的章节
        if (!isSection) {
          const id = current.split('-')[0];
          this.opened = [parseInt(id)];
        }
        // 如果正在创建章节或者任务中（不是编辑已存在的），不需要路由
        if (this.creating) return;
        this.routeCreation(current, isSection);   
      }
    },
    clearSelection() {
      this.currentKey = undefined;
      this.$router.replace({
        path: '/course/create',
        query: {
          id: this.id
        }
      });
    },
    handleConfirmCancelClick() {
      this.saveStore.setAsSaved();
      this.clearSelection();
      this.cancelDialog = false;
    },
    async handleConfirmPublishClick() {
      this.publishLoading = true;
      const res = await publishCourse(this.id);
      if (res) {
        mitt.emit('showToast', {
          color: 'success',
          icon: '$success',
          title: '发布课程成功！'
        });
        this.publishDialog = false;
        this.$router.replace('/course/teacher');
      } else {
        mitt.emit('showToast', {
          color: 'error',
          icon: '$error',
          title: '发布课程失败！'
        });
      }
      this.publishLoading = false;
    }
  }
};
</script>

<style lang="scss">
.course-creation-item-selected {
  background-color: var(--custom-primary) !important;
  color: var(--custom-secondary) !important;
}

#course-creation-left-structure {
  .v-list-item__overlay {
    background-color: white !important;
  }
}
</style>