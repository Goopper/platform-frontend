<template>
  <div class="border bg-secondary p-6">
    <p class="text-xl font-bold mt-0 mb-4">
      登陆设备
    </p>
    <p>
      当前账户存在会话（登陆状态）的设备
    </p>
    <div>
      <custom-device-card
        v-for="device in devices"
        :key="device.id"
        :device="device"
        @logout-device="handleLogoutClick"
      />
    </div>
    <v-dialog
      v-model="dialog"
      persistent
      max-width="500"
    >
      <v-card
        color="white"
        title="提示"
      >
        <v-card-text>
          确认要登出此设备（可能为当前登陆设备）吗？
          <div class="flex-grow border mt-2 p-2">
            <p>
              {{ targetOS.name }}
            </p>
            <p class="text-gray-500 text-sm">
              最近开始活跃时间：{{ targetDevice.device.date }}
            </p>
            <p class="text-gray-500 text-sm">
              浏览器版本：{{ targetDevice.deviceInfo.browser }}.{{ targetDevice.deviceInfo.version }}
            </p>
          </div>
        </v-card-text>

        <v-card-actions>
          <v-spacer />

          <v-btn
            variant="flat"
            text="确认"
            :loading="loading"
            :disabled="loading"
            @click="confirmLogoutDevice"
          />
          <v-btn
            variant="outlined"
            text="取消"
            :disabled="loading"
            @click="dialog = false"
          />
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { logoutDevice } from '@/api/access';
import { getAllDevices } from '@/api/user';
import mitt from '@/plugins/mitt';
import parseUserAgent from '@/utils/ua';

export default {
  name: 'TheDeviceListCard',
  data: () => ({
    devices: [],
    loading: false,
    dialog: false,
    targetDevice: {},
    targetOS: {}
  }),
  created() {
    this.loadDevices();
  },
  methods: {
    async confirmLogoutDevice() {
      this.loading = true;
      const deviceId = this.targetDevice.device.id;
      const result = await logoutDevice(deviceId);
      if (result) {
        mitt.emit('showToast', {
          title: '登出设备成功！',
          color: 'success',
          icon: '$success',
        });
        this.dialog = false;
        this.loadDevices();
      } else {
        mitt.emit('showToast', {
          title: '登出设备失败！',
          color: 'error',
          icon: '$error',
        });
      }
      // logoutDevice()
      this.loading = false;
    },
    handleLogoutClick(info) {
      this.targetDevice = info.device;
      this.targetOS = info.OS;
      this.dialog = true;
    },
    loadDevices() {
      this.devices = [];
      getAllDevices().then(res => {
        const devices = res.data;
        for (let i = 0; i < devices.length; i++) {
          const device = devices[i];
          const deviceInfo = parseUserAgent(device.name);
          this.devices.push({
            device,
            deviceInfo
          });
        }
      });
    }
  }
};
</script>

<style>

</style>