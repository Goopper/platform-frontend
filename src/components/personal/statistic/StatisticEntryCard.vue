<template>
  <div class="border bg-secondary p-6">
    <p class="text-xl font-bold mt-0 mb-4">
      记录查询
    </p>
    <p class="mb-4">
      教学记录查询入口
    </p>
    <div
      class="border cursor-pointer p-3 w-fit rounded flex justify-center items-center"
      @click="handleStudentPerformanceClick"
    >
      <div class="border rounded p-2 mr-3">
        <v-icon icon="mdi-table-headers-eye" />
      </div>
      <span class="font-bold">
        学生学习记录统计
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'StatisticEntryCard',
  methods: {
    handleStudentPerformanceClick() {
      this.$router.push('/teacher/student/performance');
    }
  }
};
</script>

<style>

</style>