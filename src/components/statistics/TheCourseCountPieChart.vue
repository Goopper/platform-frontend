<template>
  <div class="chart-item w-full h-full">
    <span class="chart-title">
      课程使用平台占比
    </span>
    <div
      id="course-count-pie"
      class="w-full flex-grow"
    />
  </div>
</template>

<script>
import { getCourseTeachCount } from '@/api/statistic/baize';
import echarts from '@/plugins/echarts';

export default {
  name: 'TheCourseCountPieChart',
  data: () => ({
    pieChart: undefined,
    cur: 1,
  }),
  mounted() {
    this.pieChart = echarts.init(document.getElementById('course-count-pie'), 'dark');
    this.pieChart.setOption({
      tooltip: {},
      legend: {
        left: 'center',
        type: 'scroll',
        pageIconColor: '#fff',
        pageTextStyle: {
          color: '#fff'
        }
      },
      dataset: {
        source: [
          ['课程', '次数']
        ]
      },
      backgroundColor: 'transparent',
      series: [
        {
          name: '课程占比',
          type: 'pie',
          avoidLabelOverlap: false,
          label: {
            show: false,
            position: 'center'
          },
          emphasis: {
            label: {
              show: true,
              fontSize: 15,
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
          label: {
            show: true,
            position: 'inside',
            formatter: '{d}%'
          }
        }
      ],
    });
    this.init();
    setInterval(() => {
      this.loadData();
    }, 1000 * 60 * 40);
  },
  methods: {
    async init() {
      this.pieChart.showLoading({
        text: '加载中...',
        color: '#5b8ff9',
        textColor: '#fff',
        maskColor: 'transparent',
        zlevel: 0
      });
      await this.loadData();
      this.pieChart.hideLoading();
    },
    async loadData() {
      const res = await getCourseTeachCount();
      if (res) {
        const dataset = [
          ['课程', '次数']
        ].concat(res.data);
        this.renderChart(dataset);
      }
    },
    renderChart(dataset) {
      this.pieChart.setOption({
        dataset: {
          source: dataset
        },
      });
    }
  }
};
</script>