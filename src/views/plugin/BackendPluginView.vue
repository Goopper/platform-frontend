<template>
  <div class="flex flex-col h-full">
    <!-- request tabs -->
    <div class="flex flex-row items-center">
      <v-tabs
        v-model="curTabIndex"
        class="border-r"
      >
        <v-tab
          v-for="(tab, index) in requestCaches.tabs"
          :key="'tab-'+index"
          selected-class="bg-primary text-white"
          @dblclick="handleDoubleClickRequestTab(index)"
          @click="handleSwitchRequestTab(index)"
        >
          <span
            :class="'http-'+tab.method"
            class="font-bold mr-2 http-default"
          >
            {{ tab.method }}
          </span>
          {{ tab.name }}
          <v-icon
            icon="mdi-close"
            class="ml-2 cursor-pointer close-icon text-[transparent]"
            @click.stop="handleCloseRequestTab(index)"
          />
        </v-tab>
      </v-tabs>
      <v-icon
        icon="mdi-plus"
        class="mx-2 hover:bg-stone-100 rounded-full"
        @click="handleAddRequest"
      />

      <v-tooltip
        text="双击请求tab栏修改名称"
        location="bottom"
      >
        <template #activator="{ props }">
          <v-icon
            v-bind="props"
            icon="mdi-progress-question"
            class="mx-2 hover:bg-stone-100 rounded-full cursor-help"
          />
        </template>
      </v-tooltip>
    </div>
    <!-- request content -->
    <the-request-content
      v-model="targetTab"
      class="flex-grow bg-white border-t overflow-hidden"
    />
    <!-- request result -->
    <the-request-result
      v-model="targetTab"
      class="flex-grow bg-white border-t overflow-hidden h-[12.5vh]"
    />
  </div>
  <!-- modify request name -->
  <v-dialog
    v-model="renameDialog"
    persistent
    max-width="500"
  >
    <v-card
      title="修改请求名称"
      color="white"
    >
      <v-card-text>
        <v-text-field
          v-model="targetTabName"
          density="compact"
          label="请求名称"
          variant="outlined"
          clearable
          hide-details
          autofocus
          @keyup.enter="handleRenameRequest()"
        />
      </v-card-text>
      <v-card-actions class="justify-end">
        <v-btn
          variant="flat"
          text="确认"
          @click="handleRenameRequest()"
        />
        <v-btn
          variant="outlined"
          text="取消"
          @click="renameDialog=false"
        />
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import mitt from '@/plugins/mitt';
import { newRequestTemplate } from '@/utils/backend-plugin';

export default {
  name: 'BackendPluginView',
  data: () => ({
    requestCaches: {
      tabs: [newRequestTemplate()],
      history: []
    },
    targetTab: undefined,
    targetTabName: '',
    targetTabIndex: -1,
    renameDialog: false,
    curTabIndex: 0
  }),
  created() {
    this.loadRequest();
    if (!this.requestCaches.tabs.length) {
      this.requestCaches.tabs.push(newRequestTemplate());
    }
    this.targetTab = this.requestCaches.tabs[0];
    setInterval(() => {
      this.saveRequest();
    }, 1000);
    mitt.on('addHistory', (history) => {
      this.requestCaches.history.push(history);
    });
  },
  methods: {
    loadRequest() {
      const requestCaches = localStorage.getItem('requestCaches');
      if (requestCaches) {
        this.requestCaches = JSON.parse(requestCaches);
      }
    },
    saveRequest() {
      localStorage.setItem('requestCaches', JSON.stringify(this.requestCaches));
    },
    handleAddRequest() {
      this.requestCaches.tabs.push(newRequestTemplate());
    },
    handleDoubleClickRequestTab(index) {
      this.targetTabIndex = index;
      this.targetTabName = this.requestCaches.tabs[index].name;
      this.renameDialog = true;
    },
    handleRenameRequest() {
      if (!this.targetTabName.trim()) {
        mitt.emit('showToast', { title: '请求名不能为空', color: 'warning', icon: '$warning'});
        return;
      }
      this.requestCaches.tabs[this.targetTabIndex].name = this.targetTabName.trim();
      this.renameDialog = false;
    },
    handleCloseRequestTab(index) {
      this.curTabIndex = 0;
      this.handleSwitchRequestTab(0);
      if (this.requestCaches.tabs.length === 1) {
        mitt.emit('showToast', { title: '至少保留一个请求', color: 'warning', icon: '$warning'});
        return;
      }
      this.requestCaches.tabs.splice(index, 1);
    },
    handleSwitchRequestTab(index) {
      this.targetTabIndex = index;
      this.targetTab = this.requestCaches.tabs[index];
      const json = this.targetTab.body.json;
      mitt.emit('loadJson', json);
    }
  }
};
</script>

<style lang="scss">
.http-GET {
  color: #10b981 !important;
}

.http-POST {
  color: #eab308 !important;
}

.http-PUT {
  color: #0ea5e9 !important;
}

.http-DELETE {
  color: #f43f5e !important;
}

.http-default {
  color: #737373;
}

.v-tab:hover {
  .close-icon {
    display: block;
    color: #737373;
  }
  .close-icon:hover {
    color: #f43f5e;
  }
}
</style>