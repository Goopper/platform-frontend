<template>
  <div class="chart-item w-full h-full">
    <span class="chart-title">
      最近开启的实例
    </span>
    <div
      id="recent-container-table"
      class="h-full w-full flex flex-col gap-[.1rem]"
    >
      <div id="head-row">
        <div class="container-table-cell">
          学生姓名
        </div>
        <div class="container-table-cell">
          学生学号
        </div>
        <div class="container-table-cell">
          容器信息
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
        class="w-full h-full flex flex-col gap-[.1rem]"
      >
        <TransitionGroup name="container-table-fade">
          <div
            v-for="item in containers"
            :key="item.id"
            class="flex justify-between w-full h-1/4 container-table-row"
          >
            <div class="container-table-cell">
              <div>
                {{ item.studentName }}
              </div>
            </div>
            <div class="container-table-cell">
              <div>
                {{ item.studentNumber }}
              </div>
            </div>
            <div class="container-table-cell">
              <div>
                {{ item.containerInfo }}
                <v-tooltip
                  activator="parent"
                  location="top"
                >
                  {{ item.containerInfo }}
                </v-tooltip>
              </div>
            </div>
            <div class="container-table-cell">
              <div>
                {{ item.taskName }}
                <v-tooltip
                  activator="parent"
                  location="top"
                >
                  {{ item.taskName }}
                </v-tooltip>
              </div>
            </div>
          </div>
        </TransitionGroup>
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
    containers: []
  }),
  created() {
    this.init();
    // refresh every 5 seconds
    setInterval(() => {
      this.refreshData();
    }, 5000);
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
}

#head-row {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: .1rem;
  line-height: 3rem;
  font-weight: bold;
  background-color: rgba(255, 255, 255, 0.1);
  font-weight: bold;
  font-family:'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
  
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
  width: 100%;
  font-size: .9rem;

  div {
    text-align: center;
    max-width: 5rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}

.container-table-row {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: .1rem;
}
</style>