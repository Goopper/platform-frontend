<template>
  <div class="chart-item w-full h-full">
    <span class="chart-title">
      单位时间内一组使用示例次数
    </span>
    <div
      id="course-use-line"
      class="w-full flex-grow"
    />
  </div>
</template>
<script>
import echarts from '@/plugins/echarts';

export default {
  name: 'TheCourseUseLine',
  data: () => ({
    line: undefined,
  }),
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.line = echarts.init(document.getElementById('course-use-line'), 'dark');
      this.line.setOption({
        tooltip: {},
        legend: {
          selectedMode: false
        },
        backgroundColor: 'transparent',
        xAxis: {
          type: 'category',
          data: ['2024-5-1~5', '2024-5-6~10', '2024-5-11~15', '2024-5-16~20', '2024-5-21~25', '2024-5-26~30'],
        },
        yAxis: {},
        series: [
          {
            name: '2110班使用次数(次)',
            type: 'line',
            data: [30, 92, 6, 7, 80, 10]
          },
          {
            name: '2011班使用次数(次)',
            type: 'line',
            data: [65, 85, 70, 6, 9, 40]
          },
          {
            name: '2212班使用次数(次)',
            type: 'line',
            data: [53, 83, 68, 78, 8, 98]
          },
        ],
      });
    },
  },
};
</script>