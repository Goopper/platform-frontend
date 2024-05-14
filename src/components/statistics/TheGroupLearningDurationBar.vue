<template>
  <div class="chart-item w-full h-full">
    <span class="chart-title"> 每个课程的学习最长的用户和平均值 </span>
    <div
      id="group-learning-duration-bar"
      class="w-full flex-grow"
    />
  </div>
</template>
<script>
import * as echarts from 'echarts';
import { getGroupLearning } from '@/api/statistic/baize';

export default {
  name: 'TheGroupLearningDurationBar',
  data: () => ({
    data: [],
  }),
  async created() {
    const res = await getGroupLearning();
    this.data = res.data;
    this.init();
  },
  methods: {
    init() {
      let charts = echarts.init(
        document.getElementById('group-learning-duration-bar'),
        'dark'
      );
      charts.setOption({
        legend: {
          data: ['平均值', '学习人数'],
        },
        tooltip: {
          trigger: 'axis',
          formatter: function (params) {
            let result = params[0].name + '<br/>';
            for (let i = 0; i < params.length; i++) {
              if (params[i].seriesName === '平均值') {
                result += params[i].seriesName + ' : ' + params[i].value[1].toFixed(2) + '小时';
              } else if (params[i].seriesName === '学习人数') {
                result += params[i].seriesName + ' : ' + params[i].value[2] + '人';
              }
              result += '<br/>';
            }
            return result;
          },
        },
        backgroundColor: 'transparent',
        dataset: {
          source: this.data,
        },
        xAxis: [
          {
            type: 'category',
            // data: ['OpenCV计算机视觉', 'Hadoop 大数据开发', '大数据导论(1911班)', '数据分析与可视化实操考试', '大数据导论(2110班)', '大数据技术导论(2110班)', '大数据导论(21111班)', '大数据技术导论(21111班)'],
            axisLabel: {
              interval: 0,
              width: 50,
              overflow: 'truncate',
              textStyle: {
                fontSize: 10,
              },
            },
          },
        ],
        yAxis: [
          {
            type: 'value',
            name: '课程学习人数',
            splitLine: { show: false },
            axisTick: { show: false },
            axisLabel: {
              show: true,
              color: 'rgba(255,255,255,.6)',
            },
            axisLine: { lineStyle: { color: 'rgba(255,255,255,.1)' } }, //左线色
          },
          {
            type: 'value',
            name: '课程学习时长平均值',
            show: true,
            axisTick: { show: false },
            axisLabel: {
              show: true,
              color: 'rgba(255,255,255,.6)',
            },
            axisLine: { lineStyle: { color: 'rgba(255,255,255,.1)' } }, //右线色
            splitLine: {
              show: true,
              lineStyle: { color: 'rgba(255,255,255,.1)' },
            }, //x轴线
          },
        ],
        dataZoom: [
          {
            type: 'inside', // 这个 dataZoom 组件是 inside 类型
            xAxisIndex: 0, // 这个 dataZoom 组件控制第一个 xAxis
            filterMode: 'filter',
          },
        ],
        series: [
          {
            name: '平均值',
            type: 'line',
            yAxisIndex: 1,
            z: 2,
            smooth: true,
            lineStyle: {
              color: '#eca776',
            },
            itemStyle: {
              color: 'white',
              borderColor: '#eca776',
              borderWidth: 1,
            },
          },
          {
            name: '学习人数',
            type: 'bar',
            itemStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: '#03c893',
                  },
                  {
                    offset: 1,
                    color: '#0091ff',
                  },
                ]),
              },
            },
            z: 1,
          },
        ],
      });
    },
  },
};
</script>