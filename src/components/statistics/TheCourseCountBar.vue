<template>
  <div class="flex flex-col gap-3">
    <div class="chart-item w-full h-2/3">
      <span class="chart-title">
        授课课程数量统计
      </span>
      <div
        id="course-count-bar"
        class="w-full flex-grow"
      />
    </div>
    <div class="chart-item w-full h-1/3">
      <span class="chart-title">
        授课课程占比
      </span>
      <div
        id="course-count-pie"
        class="w-full flex-grow"
      />
    </div>
  </div>
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
    barChart: undefined,
    pieChart: undefined
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
      this.barChart = echarts.init(document.getElementById('course-count-bar'), 'dark');
      this.barChart.setOption({
        xAxis: {
          type: 'category',
          data: ['Linux系统', '大数据技术导论', '平台新手入门', '数据分析可视化'],
          axisLabel: {
            rotate: 30
          },
        },
        tooltip: {},
        yAxis: {},
        grid: {
          left: '10%',
          right: '5%',
          top: '10%',
          bottom: '15%'
        },
        backgroundColor: 'transparent',
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
            stack: 'Total',
            barWidth: '35%',
            showBackground: true,
            itemStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: '#0092fe' },
                { offset: 0.5, color: '#01abcb' },
                { offset: 1, color: '#02c794' }
              ])
            },
            label: {
              show: true,
              position: 'top',
              formatter: '{c}'
            },
          },

        ],
      });

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
                fontSize: 20,
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

<style>
</style>