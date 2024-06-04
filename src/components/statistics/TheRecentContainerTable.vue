<template>
  <div class="chart-item w-full h-full">
    <span class="chart-title">
      用户使用平台信息
    </span>
    <div
      id="recent-container-table"
      class="h-full w-full flex flex-col gap-[.1rem]"
    >
      <div id="head-row">
        <div class="container-table-cell">
          学生信息
        </div>
        <div class="container-table-cell">
          开启日期
        </div>
        <div class="container-table-cell">
          课程名称
        </div>
        <div class="container-table-cell">
          任务名称
        </div>
      </div>
      <div
        v-if="loading"
        class="flex w-full h-full items-center justify-center"
      >
        <v-progress-circular
          indeterminate
          size="24"
        />
      </div>
      <div
        v-else
        id="scroll-container"
        class="flex flex-col gap-[.1rem] h-full relative"
      >
        <div
          id="scroll-target"
          class="absolute flex flex-col gap-[.1rem] w-full"
        >
          <div
            v-for="item in containers"
            :key="item.id"
            class="flex justify-between w-full container-table-row"
          >
            <div class="container-table-cell">
              <div>
                {{ item.studentName }}-{{ item.studentNumber }}
              </div>
            </div>
            <div class="container-table-cell">
              <div>
                {{ item.startTime }}
              </div>
            </div>
            <div class="container-table-cell px-[.4rem]">
              <div>
                {{ item.containerInfo }}
              </div>
            </div>
            <div class="container-table-cell px-[.4rem]">
              <div>
                {{ item.taskName }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getRecentContainer } from '@/api/statistic/baize';

export default {
  name: 'TheRecentContainerTable',
  data: () => ({
    loading: false,
    containers: [],
    tryCountLimit: 100,
    currentTryCount: 0,
    scrollDirection: 1,
    scrollTarget: undefined,
    scrollContainer: undefined,
    tableHeadNodes: undefined
  }),
  created() {
    // refresh every 5 seconds
    setInterval(() => {
      this.refreshData();
    }, 5000);
  },
  mounted() {
    this.tableHeadNodes = document.getElementById('head-row').childNodes;
    this.scrollContainer = document.getElementById('scroll-container');
    this.init(); 
    // 滚动动画实现
    const containerHeight = parseInt(window.getComputedStyle(this.scrollContainer).height.replace('px',''));
    this.getRowsTotalHeight().then((height) => {
      const result = height - containerHeight;
      if (result && !isNaN(result) && result > 0) {
        const rowCount = document.querySelectorAll('.container-table-row').length;
        const stylesheet = document.styleSheets[0];
        const totalGap = rowCount * 0.1;
        const keyframes =
          `@keyframes dynamic-scroll {
            0% {
              transform: translateY(0);
            }
            1.5% {
              transform: translateY(0);
            }
            50% {
              transform: translateY(-${result}px) translateY(-${totalGap}rem);
            }
            51.5% {
              transform: translateY(-${result}px) translateY(-${totalGap}rem);
            }
            100% {
              transform: translateY(0);
            }
          }`;
        stylesheet.insertRule(keyframes, stylesheet.cssRules.length);
        document.getElementById('scroll-target').style.animation = `dynamic-scroll ${rowCount*3}s linear infinite`;
      } else if (result < 0) {
        document.getElementById('scroll-target').style.animation = 'none';
      }
    });
  },
  methods: {
    async init() {
      this.loading = true;
      const res = await getRecentContainer();
      if (res) {
        this.containers = res.data;
      }
      this.loading = false;
    },
    refreshData() {
      getRecentContainer().then(res => {
        if (res) {
          const newContainers = res.data;
          newContainers.forEach(newContainer => {
            const index = this.containers.findIndex(container => container.id === newContainer.id);
            if (index === -1) {
              this.containers.unshift(newContainer);
              // remove the last one if the length is greater than 4
              if (this.containers.length > 4) {
                this.containers.pop();
              }
            }
          });
        }
      });
    },
    async getRowsTotalHeight() {
      return new Promise(async (resolve, reject) => {
        while (true) {
          // sleep 100ms
          await this.sleep(100);
          const rows = document.querySelectorAll('.container-table-row');
          if (rows.length > 0) {
            let height = 0;
            // add element height
            for (let i = 0; i < rows.length; i++) {
              const row = rows[i];
              this.renderTableHeaderWidth(row);
              height += parseInt(window.getComputedStyle(row).height.replace('px', ''));
            }
            resolve(height);
            break;
          }
          this.currentTryCount++;
          if (this.currentTryCount > this.tryCountLimit) {
            reject('Exceed try count limit');
            break;
          }
        }
      });
    },
    renderTableHeaderWidth(row) {
      const cells = row.childNodes;
      const maxWidths = [0, 0, 0, 0];
      this.tableHeadNodes.forEach((node, index) => {
        const width = window.getComputedStyle(cells[index]).width;
        if (maxWidths[index] < parseInt(width.replace('px', ''))) {
          maxWidths[index] = parseInt(width.replace('px', ''));
          node.style.width = width;
        }
      });
    },
    sleep(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    }
  }
};
</script>

<style lang="scss">
.container-table-fade-enter-active,
.container-table-fade-leave-active {
  transition: all 0.5s ease;
}

.container-table-fade-enter-from,
.container-table-fade-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

#recent-container-table {
  padding: 0.5rem;
  font-family: 'Yahei';
}

#head-row {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: .1rem;
  line-height: 3rem;
  font-weight: bold;
  background-color: rgba(255, 255, 255, 0.1);
  font-weight: bold;
  
  div {
    width: 100%;
    font-size: 1rem;
  }
}

.container-table-cell {
  background-color: rgba(255, 255, 255, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  width: 0;
  flex-grow: 1;
  font-size: .9rem;

  div {
    text-align: center;
  }
}

.container-table-row {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: .1rem;
}

#scroll-container {
  overflow: hidden;
}

#scroll-target {
  animation: scroll 10s ease infinite;
}

@keyframes scroll {
  10% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-100%);
  }
  100% {
    transform: translateY(0);
  }
}
</style>