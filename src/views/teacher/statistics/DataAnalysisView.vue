<template>
  <div class="w-full h-full">
    <dv-loading v-if="loading">
      <div class="text-white">
        Loading...
      </div>
    </dv-loading>
    <div
      v-else
      id="data-analysis"
      class="h-full w-full p-2"
    >
      <span class="text-white text-center text-3xl block w-full mb-4">
        智慧校园数字可视化系统
      </span>
      <dv-border-box1 class="w-1/2 h-1/2">
        <dv-decoration7 class="h-[1rem]">
          <div class="text-white mx-2">
            授课数量统计
          </div>
        </dv-decoration7>
        <the-course-count-bar
          class="chart-item"
          @click="handleCourseCountBarChartClick"
        />
      </dv-border-box1>
      <the-course-use-line class="chart-item" />
      <the-group-learning-duration-bar class="chart-item" />
      <the-group-learning-time-bar class="chart-item" />
    </div>
  </div>
</template>

<script>
import mitt from '@/plugins/mitt'; 
import { BorderBox1 as DvBorderBox1 } from '@kjgl77/datav-vue3';
import { Loading as DvLoading } from '@kjgl77/datav-vue3';
import { Decoration7 as DvDecoration7 } from '@kjgl77/datav-vue3';

export default {
  name: 'DataAnalysisView',
  components: {
    DvBorderBox1: DvBorderBox1,
    DvLoading: DvLoading,
    DvDecoration7: DvDecoration7,
  },
  data: () => ({
    
    TheCourseUseLineloading: false
  }),
  created() {

  },
  methods: {
    handleCourseCountBarChartClick() {
      mitt.emit('showToast', {
        title: '点击了课程数量柱状图',
        color: 'success',
        icon: '$success'
      });
    }
  }
};
</script>

<style>
#data-analysis {
  background-color: #100c2a;
}

.border-box-content {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
}

.chart-item {
  width: calc(100% - 3rem);
  height: calc(100% - 2rem);
  margin-bottom: 1rem;
}
</style>