<template>
  <div class="relative flex flex-col justify-between h-full">
    <!-- form -->
    <v-form
      ref="form"
      class="p-4 overflow-y-auto"
    >
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
          点击保存草稿，确认后将会创建或保存单元（章节或任务）到课程草稿
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
    <!-- delete attachment dialog -->
    <v-dialog
      v-model="deleteAttachmentDialog"
      persistent
      max-width="500"
    >
      <v-card
        title="提示"
        color="white"
      >
        <v-card-text>
          确定删除课程附件 <span class="font-bold text-red-500">{{ targetAttachment.originalFilename }}</span> 吗？删除后将无法恢复！
        </v-card-text>
        <v-card-actions>
          <v-btn
            variant="flat"
            color="error"
            class="ms-auto"
            text="确认"
            :loading="deleteLoading"
            @click="handleConfirmAttachmentClick"
          />
          <v-btn
            variant="outlined"
            text="取消"
            :disabled="deleteLoading"
            @click="deleteAttachmentDialog=false"
          />
        </v-card-actions>
      </v-card>
    </v-dialog>
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
          确认要删除任务 <strong>{{ task.name }}</strong> 吗？删除之后无法恢复！
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
import { deleteAttachment, uploadAttachment } from '@/api/attachment';
import { removeTaskAttachment } from '@/api/course';
import { createTask, deleteTask, getTaskCreationInfo, getTaskSubmitTypes, updateTask } from '@/api/course/creation';
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
    originTask: {
      name: '',
      content: '',
      attachments: [],
      submitTypeId: null,
    },
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
    deleteLoading: false,
    deleteAttachmentDialog: false,
    targetAttachment: {},
    saveStore: useSaveStore(),
    dialog: false
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
        this.originTask = {
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
    async handleSaveClick() {
      this.loading = true;
      const { valid } = await this.$refs.form.validate();
      if (!valid) {
        this.loading = false;
        return;
      }
      const key = this.$route.query.current;
      if (!key) {
        mitt.emit('showToast', { title: '未选择！', color: 'error', icon: '$error' });
        this.loading = false;
        return;
      }
      const sectionId = key.indexOf('-') > -1 ? key.split('-')[0] : key;
      let res = undefined;
      if (this.id) {
        // update task
        res = await updateTask(this.task);
      } else {
        // create task
        res = await createTask(this.task, sectionId);
      }
      if (res) {
        if (this.id) {
          // flush task
          this.originTask = JSON.parse(JSON.stringify(this.task));
        } else {
          // flush task
          this.task = {
            name: '',
            content: '',
            attachments: [],
            submitTypeId: null,
          };
          mitt.emit('course-creation-creating-update-false');
        }
        this.saveStore.setAsSaved();
        mitt.emit('showToast', { title: '保存任务信息成功！', color: 'success', icon: '$success' });
        mitt.emit('course-creation-structure-update');
        mitt.emit('course-creation-selection-none');
        mitt.emit('course-creation-open-section', sectionId);
        this.attachmentChanged = false;
      } else {
        mitt.emit('showToast', { title: '保存任务信息失败！', color: 'error', icon: '$error' });
      }
      this.loading = false;
    },
    handleUploadClick() {
      this.$refs.uploadAttach.click();
    },
    async handleSelectAttachment(e) {
      this.uploadLoading = true;
      const file = e.target.files[0];
      if (!file) {
        this.uploadLoading = false;
        return;
      }
      const res = await uploadAttachment(file);
      if (res) {
        mitt.emit('showToast', { title: '上传附件成功！', color: 'success', icon: '$success' });
        this.task.attachments.push(res.data);
        this.attachmentChanged = true;
      } else {
        mitt.emit('showToast', { title: '上传附件失败！', color: 'error', icon: '$error' });
      }
      this.uploadLoading = false;
    },
    handleDeleteAttachmentClick(attachment) {
      this.targetAttachment = attachment;
      this.deleteAttachmentDialog = true;
    },
    async handleConfirmAttachmentClick() {
      this.deleteLoading = true;
      const filename = this.targetAttachment.filename;
      
      let res = undefined;
      if (this.targetAttachment.id) {
        // remove course_attachment record
        res = await removeTaskAttachment(this.id, this.targetAttachment.id);
      } else {
        // delete attachment
        res = await deleteAttachment(filename);
      }
      // check status
      if (res) {
        mitt.emit('showToast', { title: '删除附件成功！', color: 'success', icon: '$success' });
        this.task.attachments = this.task.attachments.filter(attachment => attachment.filename !== filename);
        this.deleteAttachmentDialog = false;
      } else {
        mitt.emit('showToast', { title: '删除附件失败！', color: 'error', icon: '$error' });
      }
      this.deleteLoading = false;
    },
    handleDeleteClick() {
      this.dialog = true;
    },
    handleCancelClick() {
      mitt.emit('course-creation-cancel');
    },
    handlePublishClick() {
      mitt.emit('course-creation-publish');
    },
    async handleDeleteConfirmClick() {
      this.loading = true;
      const res = await deleteTask(this.id);
      if (res) {
        mitt.emit('showToast', { title: '删除任务成功！', color: 'success', icon: '$success' });
        // delete success
        // 1. clear selection
        mitt.emit('course-creation-selection-none');
        // 2. update structure
        mitt.emit('course-creation-structure-update');
        this.dialog = false;
      } else {
        mitt.emit('showToast', { title: '删除任务失败！', color: 'error', icon: '$error' });
      }
      this.loading = false;
    }
  },
};
</script>

<style>

</style>