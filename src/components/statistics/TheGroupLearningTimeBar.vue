<template>
  <div class="chart-item w-full h-full">
    <span class="chart-title">
      用户学习时长前10
    </span>
    <div
      id="group-learning-time-bar"
      class="w-full flex-grow"
    />
  </div>
</template>
<script>
import echarts from '@/plugins/echarts';

export default {
  name: 'TheGroupLearningTimeBar',
  data: () => ({
  }),
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.bar = echarts.init(
        document.getElementById('group-learning-time-bar'),
        'dark'
      );
      this.bar.setOption({
        tooltip: {},
        backgroundColor: 'transparent',
        dataset: {
          source: [
            ['20211021', 72],
            ['20211109', 70],
            ['20211112', 65],
            ['20211010', 59],
            ['20211101', 56],
            ['20211117', 56],
            ['20211005', 54],
            ['20211029', 53],
            ['20211023', 52],
            ['20211107', 51]
          ].sort((a, b) => b[1] - a[1]).reverse(),
        },
        grid: {
          top: ''
        },
        xAxis: { type: 'value' },
        yAxis: { type: 'category' },
        series: [
          {
            type: 'bar',
            label: {
              show: true,
              position: 'right',
            }
          }
        ],
      });
    },
  }
};
</script>