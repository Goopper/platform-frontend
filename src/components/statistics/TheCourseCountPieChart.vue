<template>
  <div class="chart-item w-full h-full">
    <span class="chart-title">
      授课课程占比
    </span>
    <div
      id="course-count-pie"
      class="w-full flex-grow"
    />
  </div>
</template>

<script>
import echarts from '@/plugins/echarts';

export default {
  name: 'TheCourseCountPieChart',
  data: () => ({
    pieChart: undefined
  }),
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.pieChart = echarts.init(document.getElementById('course-count-pie'), 'dark');
      this.pieChart.setOption({
        tooltip: {},
        legend: {
          orient: 'vertical',
          left: 'left'
        },
        backgroundColor: 'transparent',
        series: [
          {
            name: '课程占比(次)',
            type: 'pie',
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: 'center'
            },
            emphasis: {
              label: {
                show: true,
                fontSize: 40,
                fontWeight: 'bold'
              }
            },
            labelLine: {
              show: false
            },
            center: ['50%', '50%'],
            radius: ['20%', '75%'],
            itemStyle: {
              borderRadius: 8
            },
            z: 100,
            data: [
              { value: 5, name: 'Linux系统' },
              { value: 20, name: '大数据技术导论' },
              { value: 36, name: '平台新手入门' },
              { value: 10, name: '数据分析可视化' }
            ],
            label: {
              show: true,
              position: 'inside',
              formatter: '{c}'
            },
          }
        ],
      });
    }  
  }
};
</script>