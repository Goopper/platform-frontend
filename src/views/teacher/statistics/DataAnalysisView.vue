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
        <div
          id="data-analysis-title-end"
          class="flex justify-center items-center"
        >
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
          <span class="absolute right-[6rem]">
            2024/05/11 13:48:24
          </span>
        </div>
      </span>
      <div
        id="data-analysis-content"
        class="w-full h-full flex-grow p-2 grid gap-2"
      >
        <div class="flex h-full w-full flex-col gap-2">
          <the-course-count-bar class="h-full w-full" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import mitt from '@/plugins/mitt'; 
import { Loading as DvLoading } from '@kjgl77/datav-vue3';

export default {
  name: 'DataAnalysisView',
  components: {
    DvLoading: DvLoading,
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

<style lang="scss">
#data-analysis {
  background-color: #000d4a;
  font-family: SimSun;
}

#data-analysis-title {
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;

  span {
    font-size: 1rem;
    display: block;
    color: #d6d6d6;
  }
}

#data-analysis-content {
  grid-template-columns: 1fr 1.5fr 1fr;
}

#data-analysis-title-home-button {
  position: absolute;
  right: 2rem;
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
  background-color: #031e5c;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

.chart-title {
  color: white;
  font-weight: bold;
  margin-left: 1.05rem;
  width: 100%;
  margin-top: 0.5rem;
}

.chart-title::before {
  content: '';
  display: inline-block;
  width: 0.25rem;
  border-radius: 1rem;
  height: 1.05rem;
  background-color: #49bcf7;
  vertical-align: text-bottom;
}
</style>