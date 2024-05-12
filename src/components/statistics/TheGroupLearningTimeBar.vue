<template>
  <div id="group-learning-time-bar" />
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
  name: 'TheGroupLearningTimeBar',
  data: () => ({
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
<style scoped>
#group-learning-time-bar {
  width: 100%;
  height: 100%;
}
</style>