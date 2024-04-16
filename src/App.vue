<template>
  <v-app>
    <router-view></router-view>
    <Transition name="toast">
      <v-alert
        class="toast"
        v-if="toastShow"
        :color="toastColor"
        :icon="toastIcon"
        :title="toastTitle"
      ></v-alert>
    </Transition>
  </v-app>
</template>

<script>
import mitt from "@/plugins/mitt";

export default {
  data: () => {
    return {
      toastShow: false,
      toastTitle: "",
      toastColor: "info",
      toastIcon: "$info"
    }
  },
  methods: {
    async showToast ({title, color, icon, duration=2000}) {
      this.toastTitle = title
      this.toastColor = color
      this.toastIcon = icon
      this.toastShow = true
      await new Promise(resolve => setTimeout(resolve, duration));
      this.toastShow = false
    }
  },
  mounted: function () {
    // create a global event bus
    mitt.on("showToast", this.showToast)
  }
}
</script>