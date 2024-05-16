<template>
  <div class="chart-item w-full h-full">
    <span class="chart-title">
      用户使用时长开启排名
    </span>
    <div
      id="group-learning-time-bar"
      class="w-full flex-grow"
    />
  </div>
</template>
<script>
import echarts from '@/plugins/echarts';
import {getUserLearningTime} from '@/api/statistic/baize';
export default {
  name: 'TheGroupLearningTimeBar',
  data: () => ({
    dataset: null,
    bar: undefined
  }),
  mounted() {
    this.getTimeBar();
    this.intervalId = setInterval(this.getTimeBar, 1000 * 60 * 40);
  },
  methods: {
    async getTimeBar() {
      this.bar = echarts.init(
        document.getElementById('group-learning-time-bar'),
        'dark'
      );
      this.bar.showLoading({
        text: '加载中...',
        color: '#5b8ff9',
        textColor: '#fff',
        maskColor: 'transparent',
        zlevel: 0
      });
      const res = await getUserLearningTime();
        this.dataset = res.data;
        this.dataset.sort((a, b) => {
          return a[1] - b[1];
        });
      this.bar.hideLoading();
      this.bar.setOption({
        backgroundColor: 'transparent',
        dataset: {
          source: this.dataset
        },
        grid: {
          top: '',
          left: '11%',
          bottom: '10%'
        },
        xAxis: { type: 'value' },
        yAxis: [
          {
            type: 'category',
            axisLine: 'none',
            axisTick: 'none',
            offset: '7',
            axisLabel: {
              textStyle: {
                color: 'white',
                fontSize: 12,
              },
            },
          },
          {
            axisLine: 'none',
            axisTick: 'none',
            axisLabel: {
              textStyle: {
                color: 'white',
                fontSize: 12,
              },
            },
            data: this.dataset.map(row => row[1]+'小时')
          }
        ],
        series: [
          {
            type: 'bar',
            barWith: 15,
            itemStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                  { offset: 0, color: '#0092fe' },
                  { offset: 0.5, color: '#01abcb' },
                  { offset: 1, color: '#02c794' },
                ]),
                barBorderRadius: 15,
              },
            },
            z: 2,
            showBackground: true,
            backgroundStyle: {
             color : 'rgba(0,0,0,0.2)'},
          }
        ],
      });
    },
  },
};
</script>