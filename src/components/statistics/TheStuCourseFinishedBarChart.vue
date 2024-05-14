<template>
  <div class="chart-item w-full h-full">
    <span class="chart-title">
      学生课程完成情况
    </span>
    <div
      id="course-finished-bar"
      class="w-full flex-grow"
    />
  </div>
</template>

<script>
import { getStudentCourseFinishedStatus } from '@/api/statistic/baize';
import echarts from '@/plugins/echarts';

export default {
  name: 'TheStuCourseFinishedBarChart',
  data: () => ({
    chart: undefined,
  }),
  mounted() {
    this.chart = echarts.init(document.getElementById('course-finished-bar'), 'dark');
    this.init();
  },
  methods: {
    async init() {
      this.chart.showLoading({
        text: '加载中...',
        color: '#5b8ff9',
        textColor: '#fff',
        maskColor: 'transparent',
        zlevel: 0
      });
      const res = await getStudentCourseFinishedStatus();
      if (res) {
        const dataset = [
          ['课程', '未完成人数', '已完成人数']
        ].concat(res.data);
        this.renderChart(dataset);
      }
      this.chart.hideLoading();
    },
    renderChart(dataset) {
      this.chart.setOption({
        tooltip: {},
        backgroundColor: 'transparent',
        dataset: {
          source: dataset
        },
        legend: {
          selectedMode: false,
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '0%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          axisLabel: {
            rotate: 15
          }
        },
        yAxis: {},
        series: [
          {
            name: '未完成人数',
            type: 'bar',
            stack: 'x',
            label: {
              show: true,
              color: '#fff'
            },
            emphasis: {
              focus: 'series'
            },
            itemStyle: {
              color: '#ea5c81'
            }
          },
          {
            name: '已完成人数',
            type: 'bar',
            stack: 'x',
            label: {
              show: true,
              color: '#fff'
            },
            emphasis: {
              focus: 'series'
            },
            itemStyle: {
              color: '#4892ff'
            }
          }
        ]
      });
    }
  }
};
</script>