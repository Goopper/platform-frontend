<template>
  <div class="chart-item w-full h-full">
    <span class="chart-title"> 每组开启实例次数(按天) </span>
    <div
      id="course-use-line"
      class="w-full flex-grow"
    />
  </div>
</template>
<script>
import * as echarts from 'echarts';
import { getCourseUse } from '@/api/statistic/baize';
export default {
  name: 'TheCourseUseLine',
  data() {
    return {
      data: [],
      groupList: [],
      dataset: [],
    };
  },
  mounted() {
    this.getCourseUse();
  },
  methods: {
    async getCourseUse() {
      let line = echarts.init(
        document.getElementById('course-use-line'),
        'dark'
      );
      line.showLoading({
        text: '加载中...',
        color: '#5b8ff9',
        textColor: '#fff',
        maskColor: 'transparent',
        zlevel: 0
      });
      const res = await getCourseUse();
      this.data = res.data;
      this.groupList = this.data.shift();
      this.groupList.shift();
      this.dataset = this.data;
      this.dataset.sort((a, b) => {
        const dateA = new Date(a[0]);
        const dateB = new Date(b[0]);
        return dateA - dateB;
      });
      line.hideLoading();
      line.setOption({
        legend: {
          left: 'left',
          data: this.groupList,
        },
        tooltip: {
          trigger: 'axis',
          formatter: function (params) {
            let result = params[0].name + '<br/>';
            for (let i = 0; i < params.length; i++) {
              result +=
                params[i].seriesName +
                ' : ' +
                params[i].value[i + 1] +
                '次<br/>';
            }
            return result;
          },
        },
        backgroundColor: 'transparent',
        dataset: {
          source: this.dataset,
        },
        dataZoom: [
          {
            type: 'inside', // 这个 dataZoom 组件是 inside 类型
            xAxisIndex: 0, // 这个 dataZoom 组件控制第一个 xAxis
            filterMode: 'filter',
            startValue: this.dataset.length - 7,
            endValue: this.dataset.length - 1,
          },
        ],
        xAxis: {
          name: '时间',
          type: 'category',
          axisLabel: {
            textStyle: {
              fontSize: 9,
            },
          },
        },
        yAxis: { name: '使用次数', type: 'value' },
        series: this.groupList.map((name) => ({
          name: name,
          type: 'line',
          connectNulls: true,
        })),
      });
    },
  },
};
</script>