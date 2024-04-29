<template>
  <!-- temp view for dev -->
  <div class="h-auto flex">
    <custom-float-back-button />
    <v-stepper
      v-model="activeStep"
      class="border flex-grow flex-col"
      bg-color="white"
      flat
      :rounded="0"
    >
      <v-stepper-header class="border-b">
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
            @to-next-step="handleNextPageClick"
          />
        </v-stepper-window-item>
        <v-stepper-window-item :value="2">
          Content
        </v-stepper-window-item>
      </v-stepper-window>
    </v-stepper>
  </div>
</template>

<script>
export default {
  name: 'TeacherCourseCreateView',
  data: () => ({
    activeStep: 1,
    alreadyCreated: false,
    loading: false
  }),
  created() {
    const id = this.$route.query.id;
    if (id) {
      this.alreadyCreated = true;
    }
  },
  methods: {
    async handleNextPageClick(course) {
      this.loading = true;
      await new Promise(resolve => setTimeout(resolve, 5000));
      console.log(course);
      if (!this.alreadyCreated) {
        // first save
        this.alreadyCreated = true;
      } else {
        // update
      }
      this.loading = false;
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
  }
}

.v-stepper-item {
  .v-avatar {
    width: 36px !important;
    height: 36px !important;
  }
}
</style>