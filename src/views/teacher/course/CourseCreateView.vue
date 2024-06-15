<template>
  <!-- temp view for dev -->
  <div class="h-[calc(100vh-9rem)] flex">
    <custom-float-back-button :loading="loading" />
    <v-stepper
      v-model="activeStep"
      class="border flex-grow flex-col"
      bg-color="white"
      flat
      :rounded="0"
    >
      <v-stepper-header class="border-b min-h-[5.5rem]">
        <v-stepper-item
          class="text-xl"
          title="课程基本信息"
          :value="1"
          editable
        >
          <template #icon>
            <v-icon
              size="24"
              icon="mdi-information"
            />
          </template>
        </v-stepper-item>
        <v-divider
          :thickness="1"
          class="border-opacity-100 mx-0"
          color="#e0e0e0"
        />
        <v-stepper-item
          class="text-xl"
          title="课程内容"
          :value="2"
          :editable="alreadyCreated"
        >
          <template #icon>
            <v-icon
              size="24"
              icon="mdi-playlist-edit"
            />
          </template>
        </v-stepper-item>
      </v-stepper-header>
      <v-stepper-window>
        <v-stepper-window-item :value="1">
          <the-course-creation-form
            :loading="loading"
            :origin-course="originCourse"
            @to-next-step="handleNextPageClick"
          />
        </v-stepper-window-item>
        <v-stepper-window-item :value="2">
          <the-course-content-modify-card
            v-if="originCourse.id"
            :id="originCourse.id"
            :loading="loading"
            :full-course-name="originCourse.name"
          />
        </v-stepper-window-item>
      </v-stepper-window>
    </v-stepper>
  </div>
</template>

<script>
import { uploadAttachment } from '@/api/attachment';
import { createCourse, updateCourse } from '@/api/course';
import { getCourseCreationInfo } from '@/api/course/creation';
import mitt from '@/plugins/mitt';

export default {
  name: 'TeacherCourseCreateView',
  data: () => ({
    activeStep: 1,
    alreadyCreated: false,
    loading: false,
    originCourse: {},
  }),
  created() {
    const id = this.$route.query.id;
    if (id) {
      this.loadCourse(id);
      this.alreadyCreated = true;
    }
  },
  mounted() {
    const id = this.$route.query.id;
    if (id) {
      this.activeStep = 2;
    }
  },
  methods: {
    async loadCourse(id) {
      this.loading = true;
      const res = await getCourseCreationInfo(id);
      if (res) {
        this.originCourse = res.data;
      } else {
        mitt.emit('showToast', { title: '获取课程信息失败！', color: 'error', icon: '$error' });
        // go back
        this.$router.go(-1);
      }
      this.loading = false;
    },
    async handleNextPageClick(course) {
      this.loading = true;
      if (!this.alreadyCreated) {
        // first save
        await this.createCourse(course);  
        this.alreadyCreated = true;
      } else {
        // update
        await this.updateCourse(course);
      }
      // flush course
      this.originCourse = course;
      this.loading = false;
    },
    async createCourse(course) {
      // 1. check cover is a url
      const { cover } = course;
      if (typeof cover !== 'string') {
        // not a url. upload cover
        course = await this.uploadCover(course);
      }

      // 2. create course
      const creationResult = await createCourse(course);
      if (creationResult) {
        mitt.emit('showToast', { title: '创建课程成功！', color: 'success', icon: '$success' });
        console.log('creationResult', creationResult);
        course.id = creationResult.data;
        // move to next step
        this.activeStep = 2;
      } else {
        mitt.emit('showToast', { title: '创建课程失败。', color: 'error', icon: '$error' });
        this.loading = false;
      }
    },
    async updateCourse(course) {
      // 1. check cover is a url
      const { cover } = course;
      if (typeof cover !== 'string') {
        // not a url. upload cover
        course = await this.uploadCover(course);
      }

      // 2. update course
      const updateResult = await updateCourse(course);
      if (updateResult) {
        mitt.emit('showToast', { title: '修改课程成功！', color: 'success', icon: '$success' });
        // move to next step
        this.activeStep = 2;
      } else {
        mitt.emit('showToast', { title: '修改课程失败。', color: 'error', icon: '$error' });
        this.loading = false;
      }
    },
    async uploadCover(course) {
      const uploadResult = await uploadAttachment(course.cover);
      if (uploadResult) {
        mitt.emit('showToast', { title: '上传封面成功！开始创建课程...', color: 'success', icon: '$success' });
      } else {
        mitt.emit('showToast', { title: '上传封面失败！创建课程失败。', color: 'error', icon: '$error' });
        this.loading = false;
      }
      course.cover = uploadResult.data.url;
      return course;
    }
  }
};
</script>

<style lang="scss">
.v-stepper-header {
  box-shadow: none !important;
}

.v-stepper {
  display: flex !important;
  .v-window {
    margin: 0;
    flex-grow: 1;
    display: flex;
  }
  .v-window__container {
    flex-grow: 1;
  }
  .v-window-item {
    flex-grow: 1;
    overflow-y: auto;
  }
}

.v-stepper-item {
  .v-avatar {
    width: 36px !important;
    height: 36px !important;
  }
}

.course-creation-textarea {
  .v-input__prepend {
    padding-top: 0 !important;
  }
}
</style>