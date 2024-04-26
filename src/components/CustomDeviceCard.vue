<template>
  <div class="border p-4 mt-4 flex items-center">
    <div class="border rounded w-[54px] h-[54px] flex justify-center items-center mr-2">
      <v-icon
        size="36"
        color="primary"
        :icon="OS.icon"
      />
    </div>
    <div class="flex-grow">
      <p>
        {{ OS.name }}
      </p>
      <p class="text-gray-500 text-sm">
        最近开始活跃时间：{{ device.device.date }}
      </p>
      <p class="text-gray-500 text-sm">
        浏览器版本：{{ device.deviceInfo.browser }}.{{ device.deviceInfo.version }}
      </p>
    </div>
    <div>
      <v-btn
        color="#2092ed"
        variant="text"
        @click="logoutDevice"
      >
        登出
      </v-btn>
    </div>
  </div>
</template>

<script>
import DeviceOS from '@/utils/device-os';

export default {
  name: 'CustomDeviceCard',
  props: {
    device: {
      type: Object,
      required: true
    }
  },
  emits: ['logoutDevice'],
  data: () => ({
    OS: {},
  }),
  created() {
    const OS = DeviceOS.getDeviceOSByName(this.device.deviceInfo.platform);
    console.log(OS);
    this.OS = OS;
  },
  methods: {
    logoutDevice() {
      const param = {
        OS: this.OS,
        device: this.device
      };
      this.$emit('logoutDevice', param);
    }
  }
};
</script>

<style>

</style>