<template>
  <div class="relative flex flex-col justify-between h-full">
    <!-- form -->
    <v-form class="p-4 overflow-y-auto">
      <!-- name -->
      <v-text-field
        v-model="task.name"
        label="任务名称(最长50个字符)"
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
            任务名称<span class="text-red-500">*</span>：
          </span>
        </template>
      </v-text-field>
      <!-- content -->
      <v-textarea
        v-model="task.content"
        class="course-creation-textarea"
        label="任务内容(最长500个字符)"
        name="content"
        :rules="contentRules"
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
            任务内容<span class="text-red-500">*</span>：
          </span>
        </template>
      </v-textarea>
      <!-- course type -->
      <v-select
        v-model="task.submitTypeId"
        :rules="typeRules"
        name="typeId"
        density="comfortable"
        variant="outlined"
        :loading="loading"
        :items="submitTypes"
        item-title="name"
        item-value="id"
        no-data-text="无数据"
        :disabled="loading"
        label="选择一个任务提交类型"
        :menu-props="{
          'theme': 'light'
        }"
      >
        <template #prepend>
          <span class="text-lg">
            提交方式<span class="text-red-500">*</span>：
          </span>
        </template>
      </v-select>
      <div>
        <!-- course attachment -->
        <div class="flex flex-row justify-between items-center">
          <span class="text-lg">
            任务附件（可选）:&nbsp;&nbsp;&nbsp;&nbsp;
          </span>
          <v-btn
            :disabled="loading"
            :loading="uploadLoading"
            variant="flat"
            @click="handleUploadClick"
          >
            上传
          </v-btn>
          <input
            ref="uploadAttach"
            type="file"
            hidden
            @change="handleSelectAttachment"
          >
        </div>
        <div class="mt-2 flex flex-col gap-2 overflow-y-auto max-h-[310px]">
          <custom-attachment-card
            v-for="attachment in task.attachments"
            :key="attachment.id"
            :attachment="attachment"
            deletable
            @delete-file="handleDeleteAttachmentClick"
          />
          <div
            v-if="task.attachments.length === 0"
            class="flex flex-col justify-center items-center"
          >
            <v-icon
              size="10vw"
              class="text-gray-400"
              icon="mdi-attachment"
            />
            <p class="font-bold text-lg text-gray-400">
              暂时没有附件
            </p>
          </div>
        </div>
      </div>
    </v-form>
    <!-- actions -->
    <div class="border-t bg-background-important flex justify-end items-center p-3 gap-3">
      <v-btn
        v-if="id"
        :loading="loading"
        color="error"
        variant="flat"
        @click="handleSaveClick"
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
        @click="handleSaveClick"
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
          点击保存草稿，确认后将会创建或保存单元（章节或任务）到课程草稿
        </v-tooltip>
        保存草稿
      </v-btn>
      <v-btn
        :loading="loading"
        color="primary"
        variant="flat"
        :disabled="disable"
        @click="handleSaveClick"
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
  </div>
</template>

<script>
import { getTaskCreationInfo, getTaskSubmitTypes } from '@/api/course/creation';
import mitt from '@/plugins/mitt';
import { useSaveStore } from '@/store/common/save';

export default {
  name: 'TheTaskCreationForm',
  data: () => ({
    overlay: false,
    id: undefined,
    task: {
      name: '',
      content: '',
      attachments: [],
      submitTypeId: null,
    },
    originTask: {},
    nameRules: [
      value => !!value || '任务名称不能为空',
    ],
    contentRules: [
      value => !!value || '任务内容不能为空',
    ],
    typeRules: [
      value => !!value || '提交方式不能为空',
    ],
    loading: false,
    attachmentChanged: false,
    submitTypes: [],
    uploadLoading: false,
    saveStore: useSaveStore()
  }),
  computed: {
    disable() {
      const isChanged = this.originTask.name !== this.task.name || this.originTask.content !== this.task.content || this.originTask.submitTypeId !== this.task.submitTypeId || this.attachmentChanged;
      // not changed eq saved
      this.saveStore.setSaveState(!isChanged);
      return !isChanged;
    },
  },
  watch: {
    $route() {
      this.loadTask();
    },
  },
  created() {
    this.loadTask();
    this.loadSubmitTypes();
  },
  methods: {
    async loadTask() {
      this.overlay = true;
      this.id = this.$route.query.subId;
      if (this.id) {
        // load section
        const res = await getTaskCreationInfo(this.id);
        if (res) {
          this.task = res.data;
          // extract origin task
          this.originTask = JSON.parse(JSON.stringify(this.task));
        } else {
          mitt.emit('showToast', { title: '获取任务信息失败！', color: 'error', icon: '$error' });
          // go back
          this.$router.go(-1);
        }
      } else {
        this.task = {
          name: '',
          content: '',
          attachments: [],
          submitTypeId: null,
        };
      }
      this.overlay = false;
    },
    async loadSubmitTypes() {
      this.loading = true;
      // load submit types
      const res = await getTaskSubmitTypes();
      if (res) {
        this.submitTypes = res.data;
      } else {
        mitt.emit('showToast', { title: '获取提交类型失败！', color: 'error', icon: '$error' });
      }
      this.loading = false;
    },
    handleSaveClick() {
      this.loading = true;
      // save section
      mitt.emit('showToast', { title: '保存成功！', color: 'success', icon: '$success' });
      this.loading = false;
    },
    handleUploadClick() {
      this.$refs.uploadAttach.click();
    },
    async handleSelectAttachment(e) {
      this.attachmentChanged = true;
    },
    handleDeleteAttachmentClick() {
    },
    async handleConfirmAttachmentClick() {
      this.attachmentChanged = true;
    }
  },
};
</script>

<style>

</style>