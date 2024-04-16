<template>
  <div id="main">
    <the-header/>
    <v-btn @click="logout">logout</v-btn>
    <router-view/>
  </div>
</template>

<script>
import TheHeader from "@/components/TheHeader.vue";

export default {
  components: {
    TheHeader
  },
  methods: {
    logout () {
      localStorage.removeItem("token")
      this.$router.push("/login")
    }
  }
}
</script>

<style scoped>

</style>
