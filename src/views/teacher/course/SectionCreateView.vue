<template>
  <div class="relative h-full overflow-y-auto flex flex-col">
    <!-- form -->
    <v-form
      ref="form"
      class="flex-grow p-4"
    >
      <!-- name -->
      <v-text-field
        v-model="section.name"
        label="章节名称(最长50个字符)"
        name="name"
        :rules="nameRules"
        :maxlength="50"
        density="comfortable"
        :disabled="loading"
        variant="outlined"
        bg-color="white"
        clearable
      >
        <template #prepend>
          <span class="text-lg pt-0">
            章节名称<span class="text-red-500">*</span>：
          </span>
        </template>
      </v-text-field>
      <!-- desc -->
      <v-textarea
        v-model="section.desc"
        class="course-creation-textarea"
        label="章节描述(最长500个字符)"
        name="desc"
        :rules="descRules"
        :maxlength="500"
        density="comfortable"
        :disabled="loading"
        variant="outlined"
        bg-color="white"
        clearable
        no-resize
      >
        <template #prepend>
          <span class="text-lg pt-0">
            章节描述<span class="text-red-500">*</span>：
          </span>
        </template>
      </v-textarea>
    </v-form>
    <!-- actions -->
    <div class="border-t bg-background-important flex justify-end items-center p-3 gap-3">
      <v-btn
        v-if="id"
        :loading="loading"
        color="error"
        variant="flat"
        :disable="disable"
        @click="handleDeleteClick"
      >
        <v-tooltip
          activator="parent"
          location="top"
        >
          点击删除本块，确认后将会删除本章节或任务
        </v-tooltip>
        删除本块
      </v-btn>
      <v-btn
        :loading="loading"
        color="warning"
        variant="flat"
        @click="handleCancelClick"
      >
        取消
      </v-btn>
      <v-btn
        class="bg-white"
        :loading="loading"
        color="primary"
        variant="outlined"
        :disabled="disable"
        @click="handleSaveClick"
      >
        <v-tooltip
          activator="parent"
          location="top"
        >
          点击保存草稿，将会创建或保存单元（章节或任务）到课程草稿
        </v-tooltip>
        保存草稿
      </v-btn>
      <v-btn
        v-if="id"
        :loading="loading"
        color="primary"
        variant="flat"
        @click="handlePublishClick"
      >
        发布课程
      </v-btn>
    </div>
    <v-overlay
      v-model="overlay"
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
    <v-dialog
      v-model="dialog"
      persistent
      max-width="500"
    >
      <v-card
        title="提示"
        color="white"
      >
        <v-card-text>
          确认要删除章节 <strong>{{ section.name }}</strong> 吗？其中包含的所有任务都会被删除！
        </v-card-text>
        <v-card-actions>
          <v-btn
            variant="flat"
            color="error"
            class="ms-auto"
            text="确认"
            :loading="loading"
            @click="handleDeleteConfirmClick"
          />
          <v-btn
            variant="outlined"
            text="取消"
            :disabled="loading"
            @click="dialog=false"
          />
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { createSection, deleteSection, getSectionCreationInfo, updateSection } from '@/api/course/creation';
import mitt from '@/plugins/mitt';
import { useSaveStore } from '@/store/common/save';

export default {
  name: 'TheSectionCreationForm',
  data: () => ({
    overlay: false,
    // section id
    id: undefined,
    section: {
      name: '',
      desc: ''
    },
    originalSection: {
      name: '',
      desc: ''
    },
    nameRules: [
      value => !!value || '章节名称不能为空'
    ],
    descRules: [
      value => !!value || '章节描述不能为空'
    ],
    loading: false,
    dialog: false,
    saveStore: useSaveStore()
  }),
  computed: {
    disable() {
      const isChanged = this.section.name !== this.originalSection.name || this.section.desc !== this.originalSection.desc;
      this.saveStore.setSaveState(!isChanged);
      return !isChanged;
    }
  },
  watch: {
    $route() {
      this.loadSection();
    }
  },
  created() {
    this.loadSection();
  },
  methods: {
    async handleSaveClick() {
      this.loading = true;
      const { valid } = await this.$refs.form.validate();
      if (!valid) {
        this.loading = false;
        return;
      }
      const courseId = this.$route.query.id;
      if (!courseId) {
        mitt.emit('showToast', { title: '未选择课程！', color: 'error', icon: '$error' });
        this.loading = false;
        return;
      }
      let res = undefined;
      if (this.id) {
        // update section
        res = await updateSection(this.section);
      } else {
        // create section
        res = await createSection(this.section, courseId);
      }
      if (res) {
        if (this.id) {
          // flush section
          this.originalSection = JSON.parse(JSON.stringify(this.section));
        } else {
          // flush section
          this.section = {
            name: '',
            desc: ''
          };
          mitt.emit('course-creation-structure-update');
        }
        mitt.emit('showToast', { title: '保存章节信息成功！', color: 'success', icon: '$success' });
        mitt.emit('course-creation-creating-update-false');
      } else {
        mitt.emit('showToast', { title: '保存章节信息失败！', color: 'error', icon: '$error' });
      }
      this.loading = false;
    },
    async loadSection() {
      this.overlay = true;
      this.id = this.$route.query.subId;
      if (this.id) {
        // load section
        const res = await getSectionCreationInfo(this.id);
        if (res) {
          this.section = res.data;
          // deep copy
          this.originalSection = JSON.parse(JSON.stringify(this.section));
        } else {
          mitt.emit('showToast', { title: '获取章节信息失败！', color: 'error', icon: '$error' });
          // go back
          this.$router.go(-1);
        }
      } else {
        this.section = {
          name: '',
          desc: ''
        };
        this.originalSection = {
          name: '',
          desc: ''
        };
      }
      this.overlay = false;
    },
    handleDeleteClick() {
      this.dialog = true;
    },
    async handleDeleteConfirmClick() {
      this.loading = true;
      const res = await deleteSection(this.id);
      if (res) {
        mitt.emit('showToast', { title: '删除章节成功！', color: 'success', icon: '$success' });
        // delete success
        // 1. clear selection
        mitt.emit('course-creation-selection-none');
        // 2. update structure
        mitt.emit('course-creation-structure-update');
        this.dialog = false;
      } else {
        mitt.emit('showToast', { title: '删除章节失败！', color: 'error', icon: '$error' });
      }
      this.loading = false;
    },
    handleCancelClick() {
      mitt.emit('course-creation-cancel');
    },
    handlePublishClick() {
      mitt.emit('course-creation-publish');
    }
  }
};
</script>

<style>

</style>