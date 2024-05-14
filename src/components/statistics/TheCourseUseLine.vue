<template>
  <div class="chart-item w-full h-full">
    <span class="chart-title"> 每组使用示例次数(按天) </span>
    <div
      id="course-use-line"
      class="w-full flex-grow"
    />
  </div>
</template>
<script>
import * as echarts from 'echarts';
export default {
  name: 'TheCourseUseLine',
  mounted() {
    let charts = echarts.init(document.getElementById('course-use-line'),'dark');
    charts.setOption({
      legend: { left: 'left' },
      tooltip: {
        trigger: 'axis',
      },
      backgroundColor: 'transparent',
      dataset: {
        source: [
          ['product', '1911(次数)', '2110(次数)', '2011(次数)', '2212(次数)'],
          ['2024-5-1', 41, 23, 73],
          ['2024-5-2', 45, 32, 25, 43],
          ['2024-5-3', 49, 55, 13],
          ['2024-5-4', 41, 37, 53],
          ['2024-5-5', 46, 33, 52, 52],
          ['2024-5-8', 45, 32, 34, 53],
          ['2024-5-9', 86, 12, 83],
          ['2024-5-10', 50, 6, 70, 68],
          ['2024-5-11', 50, 7, 6, 78],
          ['2024-5-12', 70, 80, 9, 8],
          ['2024-5-15', 54, 14, 40, 98],
          ['2024-5-16', 82, 10, 40, 68],
          ['2024-5-17', 50, 10, 98],
          ['2024-5-18', 83, 10, 40, 48],
          ['2024-5-19', 50, 12, 40, 38],
          ['2024-5-22', 70, 85, 19, 18],
          ['2024-5-23', 70, 33, 86],
          ['2024-5-24', 70, 50, 29],
          ['2024-5-25', 84, 92, 83],
          ['2024-5-26', 70, 20, 94, 28],
        ]
      },
      dataZoom: [
        {
          type: 'inside', // 这个 dataZoom 组件是 inside 类型
          xAxisIndex: 0, // 这个 dataZoom 组件控制第一个 xAxis
          filterMode: 'filter',
        },
      ],
      grid: {
        right: '5%',
        bottom: '20%'
      },
      xAxis: {
        name: '时间每天已记录',
        type: 'category',
        boundaryGap: false,
        nameLocation: 'center',
        nameGap: 24
      },
      yAxis: { name: '使用次数', type: 'value' },
      series: [
        {
          type: 'line',
          connectNulls: true,
        },
        {
          type: 'line',
          connectNulls: true,
        },
        {
          type: 'line',
          connectNulls: true,
        },
        {
          type: 'line',
          connectNulls: true,
        },
      ],
    });
  },
};
</script>