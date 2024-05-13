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
import { data } from 'autoprefixer';
import * as echarts from 'echarts';

export default {
  name: 'TheGroupLearningDurationBar',
  data: () => ({
    chart: undefined,
  }),
  mounted() {
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
           data: ['平均值', '最大值'],
        },
        tooltip: {
          trigger: 'axis',
          formatter: function (params) {
            // let longerStu = ['student', 'student', '20191101', '20201133', '20211006', '202110026', '20211115', '20211126'];
            // let stu = null;
            // for(let i = 0;i < longerStu.length; i++){
            //   if(params[0].value == longerStu[i]){
            //     stu = longerStu[i];
            //   }
            // }
            // 假设你的数据中包含最大时长的用户信息
            return params[0].name+'<br/>'+ params[0].seriesName+params[0].value+'小时'+'<br/>'+params[1].seriesName+params[0].value+'小时';
          }
        },
        backgroundColor: 'transparent',
        //标签
        xAxis: [
           {
            type: 'category',
            data: ['OpenCV计算机视觉', 'Hadoop 大数据开发', '大数据导论(1911班)', '数据分析与可视化实操考试', '大数据导论(2110班)', '大数据技术导论(2110班)', '大数据导论(21111班)', '大数据技术导论(21111班)'],
            axisLabel: {
              interval: 0,
              width: 80,
              overflow: 'truncate',
              textStyle: {
                fontSize: 10
              },
            }
          },
        ],
        yAxis: [
          {
            type: 'value',
            name: '课程学习时长最长',
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
            data: [0, 0.75, 7.5, 0.83, 13.73, 1.89, 13.41, 2.5],
            yAxisIndex: 1,
            z: 2,
            smooth: true
          },
          {
            name: '最大值',
            type: 'bar',
            data: [0, 1, 168, 2, 597, 52, 436, 45],
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