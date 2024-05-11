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
      class="h-full w-full flex flex-col"
    >
      <span
        id="data-analysis-title"
        class="text-white text-center text-3xl block w-full relative"
      >
        智慧校园数字可视化系统
        <svg
          id="data-analysis-title-home-button"
          width="34"
          height="34"
          viewBox="0 0 34 34"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          @click="$router.push('/')"
        >
          <path
            opacity="0.1"
            d="M30.8301 32.97H3.15002L1 30.8199V24.5399L2.20007 23.4099L2.22009 10.58L1 9.34998V3.14001L3.15002 1H30.8301L32.9701 3.14001V30.8199L30.8301 32.97Z"
            fill="#009DFF"
          />
          <path
            opacity="0.6"
            d="M30.8301 32.97H3.15002L1 30.8199V24.5399L2.20007 23.4099L2.22009 10.58L1 9.34998V3.14001L3.15002 1H30.8301L32.9701 3.14001V30.8199L30.8301 32.97Z"
            stroke="#009DFF"
            stroke-width="0.58"
            stroke-miterlimit="10"
          />
          <path
            d="M15 25V19H19V25H24V17H27L17 8L7 17H10V25H15Z"
            fill="#009DFF"
          />
        </svg>

      </span>
      <div
        id="data-analysis-content"
        class="w-full flex-grow p-2 grid gap-2"
      >
        <dv-border-box1 class="w-full h-full chart-box">
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
        <dv-border-box1 class="w-full h-full chart-box">
          <dv-decoration7 class="h-[1rem]">
            <div class="text-white mx-2">
              授课数量统计
            </div>
          </dv-decoration7>
        </dv-border-box1>
        <dv-border-box1 class="w-full h-full chart-box">
          <dv-decoration7 class="h-[1rem]">
            <div class="text-white mx-2">
              授课数量统计
            </div>
          </dv-decoration7>
        </dv-border-box1>
        <dv-border-box1 class="w-full h-full chart-box">
          <dv-decoration7 class="h-[1rem]">
            <div class="text-white mx-2">
              授课数量统计
            </div>
          </dv-decoration7>
        </dv-border-box1>
      </div>
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
    loading: false
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
  background-image: url('@/assets/img/conny-schneider-xuTJZ7uD7PI-unsplash.jpg');
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}

#data-analysis-title {
  background-image: url('@/assets/img/analysis/title-bg.svg');
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  padding: 1rem;
}

#data-analysis-content {
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
}

#data-analysis-title-home-button {
  position: absolute;
  top: 1rem;
  right: 1rem;
  width: 2.5rem;
  height: 2.5rem;
  z-index: 9999;
  cursor: pointer;
}

#data-analysis-title-home-button:hover {
  filter: drop-shadow(0 0 1px #009DFF);
}

.border-box-content {
  width: calc(100%);
  height: calc(100%);
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

.chart-box {
  background-color: #010101c4;
  box-shadow: 0 0 10px 0 #010101c4;
  border-radius: 1rem;
}
</style>