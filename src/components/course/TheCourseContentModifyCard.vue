<template>
  <div
    v-if="id"
    class="flex-grow h-[67.5vh] flex"
  >
    <!-- left structure -->
    <div class="border-r w-1/4 h-full overflow-y-auto">
      {{ structure }}
      <v-list>
        <v-list-group
          v-for="section in structure"
          :key="section.id"
          :title="section.name"
          :value="section.id"
          subgroup
        >
          <v-list-item
            v-for="task in section.tasks"
            :key="task.id"
            :title="task.name"
            :value="task.id"
          />
        </v-list-group>
      </v-list>
      <!-- add button -->
      <v-btn
        id="add-block-menu-activator"
        density="compact"
        class="absolute start-0 bottom-4"
        style="left: calc(25% - 64px);"
        icon="mdi-plus"
        size="large"
      />
      <v-menu activator="#add-block-menu-activator">
        <v-list bg-color="white">
          <v-list-item>
            <v-btn
              variant="text"
              @click="handleCreateSectionClick"
            >
              添加章节
            </v-btn>
          </v-list-item>
          <v-list-item>
            <v-btn
              variant="text"
              @click="handleCreateTaskClick"
            >
              添加任务
            </v-btn>
          </v-list-item>
        </v-list>
      </v-menu>
    </div>
    <!-- right form content -->
    <div class="flex-grow w-3/4 p-4 overflow-y-auto">
      {{ formType }}
    </div>
  </div>
</template>

<script>
import { getCourseStructure } from '@/api/course';

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
    formType: 'section'
  }),
  async created() {
    this.structureLoading = true;
    const res = await getCourseStructure(this.id);
    this.structure = res.data;
    this.structureLoading = false;
  },
  methods: {
    handleCreateSectionClick() {
      this.formType = 'section';
    },
    handleCreateTaskClick() {
      this.formType = 'task';
    }
  }
};
</script>