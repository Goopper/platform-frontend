<template>
  <div class="chart-item w-full h-full">
    <span class="chart-title">
      授课课程数量统计
    </span>
    <div
      id="course-count-bar"
      class="w-full flex-grow"
    />
  </div>
</template>

<script>
import echarts from '@/plugins/echarts';

export default {
  name: 'TheCourseCountBarChart',
  data: () => ({
      barChart: undefined
  }),
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.barChart = echarts.init(document.getElementById('course-count-bar'), 'dark');
      this.barChart.setOption({
        xAxis: {
          type: 'category',
          data: ['Linux系统', '大数据技术导论', '平台新手入门', '数据分析可视化'],
          axisLabel: {
            rotate: 30
          },
        },
        tooltip: {},
        yAxis: {},
        grid: {
          left: '10%',
          right: '5%',
          top: '10%',
          bottom: '20%'
        },
        backgroundColor: 'transparent',
        series: [
          {
            name: '授课数量(次)',
            type: 'bar',
            data: [
              { value: 5, name: 'Linux系统' },
              { value: 20, name: '大数据技术导论' },
              { value: 36, name: '平台新手入门' },
              { value: 10, name: '数据分析可视化' }
            ],
            stack: 'Total',
            barWidth: '35%',
            showBackground: true,
            itemStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: '#0092fe' },
                { offset: 0.5, color: '#01abcb' },
                { offset: 1, color: '#02c794' }
              ])
            },
            label: {
              show: true,
              position: 'top',
              formatter: '{c}'
            },
          },
        ],
      });

    }
  }
};
</script>