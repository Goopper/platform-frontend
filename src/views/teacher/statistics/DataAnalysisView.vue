<template>
  <div class="w-full h-full">
    <div
      id="data-analysis"
      class="h-full w-full flex flex-col"
    >
      <!-- title -->
      <span
        id="data-analysis-title"
        class="text-white text-center text-3xl block w-full relative"
      >
        智慧校园数字可视化系统
        <div
          id="data-analysis-title-end"
          class="flex justify-center items-center"
        >
          <svg
            id="data-analysis-title-home-button"
            width="34"
            height="34"
            viewBox="0 0 34 34"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            @click="$router.push('/')"
          >
            <path
              opacity="0.1"
              d="M30.8301 32.97H3.15002L1 30.8199V24.5399L2.20007 23.4099L2.22009 10.58L1 9.34998V3.14001L3.15002 1H30.8301L32.9701 3.14001V30.8199L30.8301 32.97Z"
              fill="#009DFF"
            />
            <path
              opacity="0.6"
              d="M30.8301 32.97H3.15002L1 30.8199V24.5399L2.20007 23.4099L2.22009 10.58L1 9.34998V3.14001L3.15002 1H30.8301L32.9701 3.14001V30.8199L30.8301 32.97Z"
              stroke="#009DFF"
              stroke-width="0.58"
              stroke-miterlimit="10"
            />
            <path
              d="M15 25V19H19V25H24V17H27L17 8L7 17H10V25H15Z"
              fill="#009DFF"
            />
          </svg>
          <span
            ref="clock"
            class="absolute right-[6rem]"
          >
            2024/05/11 13:48:24
          </span>
        </div>
      </span>
      <!-- charts grid -->
      <div
        id="data-analysis-content"
        class="w-full h-full flex-grow p-2 grid gap-2"
      >
        <div class="flex flex-col gap-3">
          <the-group-learning-time-bar class="h-1/2" />
        </div>
        <div class="flex flex-col gap-3">
          <the-course-use-line class="h-1/2" />
          <the-course-count-pie-chart class="h-1/2" />
        </div>
        <div class="flex flex-col gap-3">
          <the-stu-course-finished-bar-chart class="h-1/2" />
          <the-group-learning-duration-bar class="h-1/2" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DataAnalysisView',
  created() {
    this.startClock();
  },
  methods: {
    startClock() {
      setInterval(() => {
        const clock = this.$refs.clock;
        if (clock) {
          clock.innerText = this.formatDate(new Date());
        }
      }, 1000);
    },
    formatDate(date) {
      var year = date.getFullYear();
      var month = ('0' + (date.getMonth() + 1)).slice(-2);
      var day = ('0' + date.getDate()).slice(-2);
      var hour = ('0' + date.getHours()).slice(-2);
      var minute = ('0' + date.getMinutes()).slice(-2);
      var second = ('0' + date.getSeconds()).slice(-2);

      return year + '/' + month + '/' + day + ' ' + hour + ':' + minute + ':' + second;
    }
  }
};
</script>

<style lang="scss">
#data-analysis {
  background: #000d4a url('@/assets/img/analysis/background.jpg') center center;
  background-size:cover;
  background-repeat: no-repeat;
  font-family: SimSun;
  color: white;
}

#data-analysis-title {
  padding: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;

  span {
    font-family: 'DIGITAL';
    font-size: 1.1rem;
    font-weight: bold;
    display: block;
    color: #d6d6d6;
  }
}

#data-analysis-content {
  grid-template-columns: 1fr 1fr 1fr;
}

#data-analysis-title-home-button {
  position: absolute;
  right: 2rem;
  width: 2.5rem;
  height: 2.5rem;
  z-index: 9999;
  cursor: pointer;
}

#data-analysis-title-home-button:hover {
  filter: drop-shadow(0 0 1px #009DFF);
}

.chart-item {
  background: rgba(6,48,109,.5);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

.chart-title {
  color: white;
  font-weight: bold;
  margin-left: 1.05rem;
  width: 100%;
  margin-top: 0.5rem;
}

.chart-title::before {
  content: '';
  display: inline-block;
  width: 0.25rem;
  border-radius: 1rem;
  height: 1.05rem;
  background-color: #49bcf7;
  vertical-align: text-bottom;
}

.radar {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.radar::before {
  content: "";
  position: absolute;
  left: -100%;
  width: 100%;
  height: 100%; /* Adjust this value to change the thickness of the line */
  background: linear-gradient(to right, rgba(255,255,255,0) 0%, rgba(169, 169, 169, 0.1) 100%);
  animation: radar 2s linear infinite;
}

@keyframes radar {
  0% {
    left: -100%;
  }
  50% {
    left: 0;
  }
  100% {
    left: 100%;
  }
}
</style>