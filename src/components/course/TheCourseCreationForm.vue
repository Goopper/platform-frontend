<template>
  <div
    class="flex-grow flex flex-col"
  >
    <div
      id="creation-form-container"
      class="flex-grow p-8 overflow-y-auto"
    >
      <v-form ref="form">
        <v-row>
          <!-- left column -->
          <v-col>
            <!-- course name -->
            <v-text-field
              v-model="name"
              label="课程名称(最长50个字符)"
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
                <span class="text-lg">
                  课程名称<span class="text-red-500">*</span>：
                </span>
              </template>
            </v-text-field>
            <!-- teacher -->
            <v-select
              v-model="teacherId"
              name="teacherId"
              :rules="teacherIdRules"
              density="comfortable"
              variant="outlined"
              chips
              :loading="teacherLoading"
              :items="teachers"
              item-title="name"
              item-value="id"
              :disabled="loading"
              no-data-text="无数据"
              label="选择一位授课老师"
              :menu-props="{
                'theme': 'light'
              }"
              clearable
            >
              <template #prepend>
                <span class="text-lg">
                  授课老师<span class="text-red-500">*</span>：
                </span>
              </template>
            </v-select>
            <!-- course type -->
            <v-combobox
              v-model="type"
              :rules="typeRules"
              name="typeId"
              density="comfortable"
              variant="outlined"
              chips
              :loading="courseTypeLoading"
              :items="courseTypes"
              item-title="name"
              item-value="id"
              no-data-text="无数据"
              :disabled="loading"
              label="选择或创建一个课程类型"
              :menu-props="{
                'theme': 'light'
              }"
              clearable
            >
              <template #prepend>
                <span class="text-lg">
                  课程类型<span class="text-red-500">*</span>：
                </span>
              </template>
            </v-combobox>
            <!-- desc -->
            <v-textarea
              v-model="desc"
              label="课程描述(最长500个字符)"
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
                <span class="text-lg">
                  课程描述<span class="text-red-500">*</span>：
                </span>
              </template>
            </v-textarea>
            <!-- course cover -->
            <div class="flex">
              <span class="text-lg">
                课程封面<span class="text-red-500">*</span>：
              </span>
              <div class="cursor-pointer">
                <v-img
                  width="200"
                  height="200"
                  class="bg-default ml-4"
                  aspect-ratio="1/1"
                  alt="课程封面"
                  lazy-src="/default.jpg"
                  :src="cover"
                  @click="handleCoverClick"
                >
                  <template #placeholder>
                    <div class="d-flex align-center justify-center fill-height">
                      <v-progress-circular
                        color="grey-lighten-4"
                        indeterminate
                      />
                    </div>
                  </template>
                </v-img>
                <input
                  ref="coverInput"
                  type="file"
                  name="cover"
                  accept="image/*"
                  :disabled="loading"
                  hidden
                  @change="handleCoverChange"
                >
              </div>
            </div>
          </v-col>
          <!-- right column -->
          <v-col>
            <!-- attachment list -->
            <div>
              <!-- course attachment -->
              <div class="flex flex-row justify-between items-center">
                <span class="text-lg">
                  课程附件（可选）:&nbsp;&nbsp;&nbsp;&nbsp;
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
                  v-for="attachment in attachments"
                  :key="attachment.id"
                  :attachment="attachment"
                  deletable
                  @delete-file="handleDeleteClick"
                />
                <div
                  v-if="attachments.length === 0"
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
          </v-col>
        </v-row>
      </v-form>
      <!-- form end -->
    </div>
    <!-- actions -->
    <div class="bg-background-important border-t p-3 flex justify-end">
      <v-btn
        class="mr-3"
        variant="flat"
        color="warning"
        density="comfortable"
        :loading="loading || courseTypeLoading || teacherLoading"
        @click="handleCancelClick"
      >
        取消
      </v-btn>
      <v-btn
        variant="flat"
        density="comfortable"
        :loading="loading || courseTypeLoading || teacherLoading"
        @click="handleSaveClick"
      >
        保存，进入下一步
      </v-btn>
    </div>
    <!-- create course type dialog -->
    <v-dialog
      v-model="createCourseTypeDialog"
      persistent
      max-width="500"
    >
      <v-card
        title="提示"
        color="white"
      >
        <v-card-text>
          课程类型不存在，要创建吗？
        </v-card-text>
        <v-card-actions>
          <v-btn
            variant="flat"
            class="ms-auto"
            text="确认"
            :loading="createTypeLoading"
            @click="handleCreateCourseTypeConfirmClick"
          />
          <v-btn
            variant="outlined"
            text="取消"
            :disabled="createTypeLoading"
            @click="createCourseTypeDialog=false"
          />
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- cancel dialog -->
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
          确定放弃课程的创建吗？
        </v-card-text>
        <v-card-actions>
          <v-btn
            variant="flat"
            class="ms-auto"
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
    <!-- save dialog -->
    <v-dialog
      v-model="saveCourseDialog"
      persistent
      max-width="500"
    >
      <v-card
        title="提示"
        color="white"
      >
        <v-card-text>
          确定保存课程的更改吗？
        </v-card-text>
        <v-card-actions>
          <v-btn
            variant="flat"
            class="ms-auto"
            text="确认"
            :loading="loading"
            @click="handleSave"
          />
          <v-btn
            variant="outlined"
            text="取消"
            :disabled="loading"
            @click="saveCourseDialog=false"
          />
        </v-card-actions>
      </v-card>
    </v-dialog>
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
          确定删除课程附件 <span class="font-bold text-red-500">{{ targetAttachment.originalFilename }}</span> 吗？
        </v-card-text>
        <v-card-actions>
          <v-btn
            variant="flat"
            color="error"
            class="ms-auto"
            text="确认"
            :loading="deleteLoading"
            @click="handleDeleteAttachment"
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
  </div>
</template>

<script>
import { deleteAttachment, uploadAttachment } from '@/api/attachment';
import { createCourseType, getCourseType, removeCourseAttachment } from '@/api/course';
import { getTeacherList } from '@/api/teacher';
import mitt from '@/plugins/mitt';

export default {
  name: 'TheCourseCreationForm',
  props: {
    loading: {
      type: Boolean,
      default: false
    },
    originCourse: {
      type: Object,
      default: undefined
    }
  },
  emits: ['toNextStep'],
  data: () => ({
    id: null,
    name: '',
    nameRules: [
      v => !!v || '课程名称不能为空',
      v => (v && v.length <= 50) || '课程名称不能超过50个字符',
    ],
    teacherId: null,
    teacherIdRules: [
      v => !!v || '请选择一位授课老师',
    ],
    desc: '',
    descRules: [
      v => !!v || '课程描述不能为空',
      v => (v && v.length <= 500) || '课程描述不能超过500个字符',
    ],
    cover: '/default.jpg',
    coverFile: null,
    type: null,
    typeRules: [
      v => !!v || '请选择或创建一个课程类型',
    ],
    typeId: null,
    courseTypes: [],
    teachers: [],
    attachments: [],
    createCourseTypeDialog: false,
    cancelDialog: false,
    createTypeLoading: false,
    saveCourseDialog: false,
    deleteAttachmentDialog: false,
    targetAttachment: undefined,
    uploadLoading: false,
    deleteLoading: false,
    courseTypeLoading: false,
    teacherLoading: false
  }),
  watch: {
    type(val) {
      // type not exists
      if (val && this.courseTypes.indexOf(val) === -1){
        this.createCourseTypeDialog = true;
      } else if (val) {
        this.typeId = val.id;
      }
    },
    // watch originCourse changes
    async originCourse(val) {
      if (val) {
        this.name = val.name;
        this.teacherId = val.teacherId;
        this.desc = val.desc;
        this.cover = val.cover;
        this.typeId = val.typeId;
        this.type = this.courseTypes.find(o => o.id === this.typeId);
        this.attachments = val.attachments;
      }
    }
  },
  async created() {
    const id = this.$route.query.id;
    if (id) {
      this.id = id;
    }
    this.teacherLoading = true;
    await this.loadCourseTypes();
    const res = await getTeacherList();
    if (res) {
      this.teachers = res.data;
    } else {
      mitt.emit('showToast', { title: '获取教师列表失败！', color: 'error', icon: '$error' });
    }
    this.teacherLoading = false;
  },
  mounted() {
    window.addEventListener('beforeunload', this.handleBeforeUnload);
  },
  unmounted() {
    window.removeEventListener('beforeunload', this.handleBeforeUnload);
  },
  methods: {
    async handleCreateCourseTypeConfirmClick() {
      this.createTypeLoading = true;
      // new type
      const typeName = this.type;
      const res = await createCourseType(typeName);
      if (res) {
        mitt.emit('showToast', { title: '创建课程类型成功！', color: 'success', icon: '$success' });
        this.createCourseTypeDialog = false;
      } else {
        mitt.emit('showToast', { title: '创建课程类型失败！', color: 'error', icon: '$error' });
      }
      await this.loadCourseTypes();
      this.createTypeLoading = false;
    },
    async loadCourseTypes() {
      this.courseTypeLoading = true;
      const res = await getCourseType();
      if (res) {
        this.courseTypes = res.data;
        if (this.originCourse) {
          this.type = this.courseTypes.find(o => o.id === this.typeId);
        }
      } else {
        mitt.emit('showToast', { title: '获取课程类型失败！', color: 'error', icon: '$error' });
      }
      this.courseTypeLoading = false;
    },
    handleCoverClick() {
      this.$refs.coverInput.click();
    },
    async handleCoverChange(e) {
      const file = e.target.files[0];
      if (file) {
        this.cover = URL.createObjectURL(file);
        this.coverFile = file;
      }
    },
    handleCancelClick() {
      this.cancelDialog = true;
    },
    handleBeforeUnload(e) {
      e.preventDefault();
    },
    handleConfirmCancelClick() {
      this.cancelDialog = false;
      this.$router.go(-1);
    },
    async handleSaveClick() {
      const { valid } = await this.$refs.form.validate();
      if (valid) { 
        this.saveCourseDialog = true;
      } else {
        var container = document.getElementById('creation-form-container');
        container.scrollTop = container.scrollHeight;
      }
    },
    handleSave() {
      // save course
      this.saveCourseDialog = false;
      const idNum = this.id === null ? null : Number(this.id);
      const course = {
        id: idNum,
        name: this.name,
        teacherId: this.teacherId,
        desc: this.desc,
        cover: this.coverFile || this.cover,
        typeId: this.typeId,
        attachments: this.attachments,
      };
      this.$emit('toNextStep', course);
    },
    handleDeleteClick(attachment) {
      this.targetAttachment = attachment;
      this.deleteAttachmentDialog = true;
    },
    async handleDeleteAttachment() {
      this.deleteLoading = true;
      const filename = this.targetAttachment.filename;
      
      let res = undefined;
      if (this.targetAttachment.id) {
        // remove course_attachment record
        res = await removeCourseAttachment(this.id, this.targetAttachment.id);
      } else {
        // delete attachment
        res = await deleteAttachment(filename);
      }
      // check status
      if (res) {
        mitt.emit('showToast', { title: '删除附件成功！', color: 'success', icon: '$success' });
        this.attachments = this.attachments.filter(attachment => attachment.filename !== filename);
        this.deleteAttachmentDialog = false;
      } else {
        mitt.emit('showToast', { title: '删除附件失败！', color: 'error', icon: '$error' });
      }
      this.deleteLoading = false;
    },
    handleUploadClick() {
      this.$refs.uploadAttach.click();
    },
    async handleSelectAttachment(e) {
      const file = e.target.files[0];
      if (file) {
        this.uploadLoading = true;
        const res = await uploadAttachment(file);
        if (res) {
          mitt.emit('showToast', { title: '上传附件成功！', color: 'success', icon: '$success' });
          this.attachments.push(res.data);
        } else {
          mitt.emit('showToast', { title: '上传附件失败！', color: 'error', icon: '$error' });
        }
        this.uploadLoading = false;
      }
    }
  }
};
</script>