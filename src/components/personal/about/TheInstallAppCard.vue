<template>
  <div class="border bg-secondary p-6">
    <p class="text-xl font-bold mt-0 mb-4">
      安装应用程序
    </p>
    <p class="mb-4">
      将本网站作为应用程序安装到本设备
    </p>
    <div class="flex justify-end items-center">
      <v-tooltip
        text="刷新安装状态"
        location="top"
      >
        <template #activator="{ props }">
          <v-icon
            v-bind="props"
            class="mr-4"
            @click="refreshInstalState"
          >
            mdi-refresh
          </v-icon>
        </template>
      </v-tooltip>
      <v-btn
        v-if="installPrompt"
        variant="flat"
        @click="installApp"
      >
        安装
      </v-btn>
      <v-btn
        v-else
        variant="outlined"
        disabled
      >
        已安装
      </v-btn>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TheInstallAppCard',
  data: () => ({
    installPrompt: undefined
  }),
  created() {
    window.onbeforeinstallprompt = this.installListener;
  },
  methods: {
    installApp() {
      if (this.installPrompt) {
        this.installPrompt.prompt();
      }
    },
    refreshInstalState() {
      window.location.reload();
    },
    installListener(e) {
      e.preventDefault();
      this.installPrompt = e;
    }
  }
};
</script>

<style>

</style>