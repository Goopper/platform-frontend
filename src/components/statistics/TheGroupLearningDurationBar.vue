<template>
  <div class="chart-item w-full h-full">
    <span class="chart-title">
      授课课程占比
    </span>
    <div
      id="group-learning-duration-bar"
      class="w-full flex-grow"
    />
  </div>
</template>
<script>
import * as echarts from 'echarts';

export default {
  name: 'TheGroupLearningDurationBar',
      data: () => ({
    chart: undefined
  }),
  mounted() {
    this.init();
  },
  methods: {
    init() {
      let charts = echarts.init(document.getElementById('group-learning-duration-bar'), 'dark');
      charts.setOption({
        legend: {},
        tooltip: {
          trigger: 'axis',
        },
        backgroundColor: 'transparent',
        dataset: {
          source: [
            ['product', '机器学习算法库', '测试课程', '大数据技术导论', '大数据导论', '统计实战'],
            ['测试群组1', 10, 20, 30, 40, 50],
            ['21111', 11, 21, 31, 41, 51],
            ['2110', 12, 22, 32, 42, 52],
            ['1911', 13, 23, 33, 43, 53],
            ['测试111', 14, 24, 34, 44, 54],
          ],
        },
        //标签
        xAxis: { type: 'category' },
        yAxis: {},
        series: [
          {
            type: 'bar',
            stack: 'x',
          },
          {
            type: 'bar',
            stack: 'x',
          },
          {
            type: 'bar',
            stack: 'x',
          },
          {
            type: 'bar',
            stack: 'x',
          },
          {
            type: 'bar',
            stack: 'x',
          },
        ],
      });
    }
  }
};
</script>