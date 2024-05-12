<template>
  <div class="chart-item w-full h-full">
    <span class="chart-title">
      授课数量变化
    </span>
    <div
      id="course-count-time-line"
      class="w-full flex-grow"
    />
  </div>
</template>

<script>
import echarts from '@/plugins/echarts';

export default {
  name: 'TheCourseCountByDateChart',
  data: () => ({
      timeLineChart: undefined
  }),
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.timeLineChart = echarts.init(document.getElementById('course-count-time-line'), 'dark');
      this.timeLineChart.setOption({
        xAxis: {
          type: 'category',
          data: ['2023-10-30 18:07', '2023-10-30 18:12', '2024-01-10 21:06', '2024-05-06 21:30', '2024-05-07 18:36'],
          boundaryGap: false
        },
        tooltip: {
          trigger: 'axis'
        },
        yAxis: {},
        grid: {
          left: '10%',
          right: '5%',
          top: '10%',
          bottom: '20%',
        },
        backgroundColor: 'transparent',
        series: [
          {
            name: '授课数量(次)',
            type: 'line',
            data: [6, 14, 1, 4, 4],
            lineStyle: {
              width: 2
            },
            label: {
              show: true,
              position: 'top'
            },
            areaStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: 'rgba(73, 146, 255, 0.5)'
                },
                {
                  offset: 1,
                  color: 'transparent'
                }
              ])
            }
          }
        ]
      });
    }
  }
};
</script>