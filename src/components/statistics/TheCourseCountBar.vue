<template>
  <div
    id="course-count-bar"
    class="z-50"
  />
</template>

<script>
import * as echarts from 'echarts/core';
import {
  TitleComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent
} from 'echarts/components';
import { BarChart, PieChart } from 'echarts/charts';
import { LabelLayout } from 'echarts/features';
import { CanvasRenderer } from 'echarts/renderers';

export default {
  name: 'TheCourseCountBar',
  data: () => ({
    chart: undefined
  }),
  mounted() {
    this.init();
  },
  methods: {
    init() {
      // 注册必须的组件
      echarts.use([
        TitleComponent,
        TooltipComponent,
        GridComponent,
        LegendComponent,
        BarChart,
        PieChart,
        CanvasRenderer,
        LabelLayout
      ]);
      this.chart = echarts.init(document.getElementById('course-count-bar'), 'dark');
      this.chart.setOption({
        xAxis: {
          type: 'category',
          data: ['Linux系统', '大数据技术导论', '平台新手入门', '数据分析可视化']
        },
        yAxis: {},
        grid: {
          left: '5%',
          right: '0',
          top: '10%',
          bottom: '10%'
        },
        backgroundColor: 'transparent',
        tooltip: {},
        series: [
          {
            name: '课程数量',
            type: 'bar',
            data: [
              { value: 5, name: 'Linux系统' },
              { value: 20, name: '大数据技术导论' },
              { value: 36, name: '平台新手入门' },
              { value: 10, name: '数据分析可视化' }
            ],
            barWidth: '20%'
          },
          {
            name: '课程占比',
            type: 'pie',
            center: ['25%', '30%'],
            radius: '50%',
            z: 100,
            data: [
              { value: 5, name: 'Linux系统' },
              { value: 20, name: '大数据技术导论' },
              { value: 36, name: '平台新手入门' },
              { value: 10, name: '数据分析可视化' }
            ]
          }
        ],
      });
    }  
  }
};
</script>

<style>
</style>