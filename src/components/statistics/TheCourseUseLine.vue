<template>
  <div id="course-use-line" />
</template>
<script>
import * as echarts from 'echarts/core';
import {
  TitleComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent,
} from 'echarts/components';
import { LineChart } from 'echarts/charts';
import { LabelLayout } from 'echarts/features';
import { CanvasRenderer } from 'echarts/renderers';
export default {
  name: 'TheCourseUseLine',
  data: () => ({
    line: undefined,
    bar: undefined,
  }),
  mounted() {
    this.init();
  },
  methods: {
    init() {
      echarts.use([
        TitleComponent,
        TooltipComponent,
        GridComponent,
        LegendComponent,
        LineChart,
        CanvasRenderer,
        LabelLayout,
      ]);
      this.line = echarts.init(document.getElementById('course-use-line'));
      this.line.setOption({
        legend: {},
        tooltip: {},
        title: {
          text: '单位时间内一组使用示例次数',
        },
        dataset: {
          source: [
            ['product', '1911', '2110', '2011', '2212'],
            ['2024-5-1~5', 40, 30, 65, 53],
            ['2024-5-6~10', 86, 92, 85, 83],
            ['2024-5-11~15', 50, 6, 70, 68],
            ['2024-5-16~20', 50, 7, 6, 78],
            ['2024-5-21~25', 70, 80, 9, 8],
            ['2024-5-26~30', 80, 10, 40, 98],
          ],
        },
        xAxis: { type: 'category' },
        yAxis: {},
        series: [
          {
            name: '1911',
            type: 'line',
          },
          {
            name: '2110',
            type: 'line',
          },
          {
            name: '2011',
            type: 'line',
          },
          {
            name: '2212',
            type: 'line',
          },
        ],
      });
      this.bar = echarts.init(
        document.getElementById('group-learning-time-bar')
      );
      this.bar.setOption({
        title: {
          text: '组使用学习时长',
        },
        tooltip: {},
        dataset: {
          source: [
            ['1911', 40],
            ['2110', 86],
            ['2011', 50],
            ['2212', 50],
          ],
        },
        xAxis: { type: 'value'},
        yAxis: {type: 'category'},
        series: [
          {
            type: 'bar',
          }
        ],
        });
    },
  },
};
</script>
<style lang="scss" scoped>
main {
  display: flex;
    align-items: center;
}
#course-use-line {
  width: 100%;
  height: 100%;
}
</style>