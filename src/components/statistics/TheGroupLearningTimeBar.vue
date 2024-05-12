<template>
  <div class="chart-item w-full h-full">
    <span class="chart-title">
      授课课程使用时长
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
            ['1911(分钟)', 40],
            ['2110(分钟)', 86],
            ['2011(分钟)', 50],
            ['2212(分钟)', 50],
          ],
        },
        grid: {
          top: ''
        },
        xAxis: { type: 'value' },
        yAxis: { type: 'category' },
        series: [
          {
            type: 'bar',
          }
        ],
      });
    },
  }
};
</script>