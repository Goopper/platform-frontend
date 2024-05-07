<template>
  <div class="relative h-full overflow-y-auto flex flex-col">
    <!-- form -->
    <v-form class="flex-grow p-4">
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
        :loading="loading"
        color="error"
        variant="flat"
        :disable="disable"
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
        :disable="disable"
        @click="handleSaveClick"
      >
        取消
      </v-btn>
      <v-btn
        class="bg-white"
        :loading="loading"
        color="primary"
        variant="outlined"
        :disable="disable"
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
        :loading="loading"
        color="primary"
        variant="flat"
        :disable="disable"
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
import { getSectionCreationInfo } from '@/api/course/creation';
import mitt from '@/plugins/mitt';

export default {
  name: 'TheSectionCreationForm',
  data: () => ({
    overlay: false,
    id: undefined,
    section: {
      name: '',
      desc: ''
    },
    nameRules: [
      value => !!value || '章节名称不能为空'
    ],
    descRules: [
      value => !!value || '章节描述不能为空'
    ],
    loading: false
  }),
  computed: {
    disable() {
      return !this.section.name || !this.section.desc;
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
    handleSaveClick() {
      this.loading = true;
      // save section
      mitt.emit('showToast', { title: '保存成功！', color: 'success', icon: '$success' });
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
      }
      this.overlay = false;
    }
  }
};
</script>

<style>

</style>