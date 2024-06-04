<template>
  <v-btn
    class="bsm:absolute bsm:left-12 bsm:top-28 sm:block"
    variant="text"
    size="48"
    :loading="loading"
    icon="mdi-arrow-left"
    @click="back()"
  />
</template>

<script>
export default {
  name: 'CustomFloatBackButton',
  props: {
    backUrl: {
      type: String,
      default: undefined,
    },
    loading: {
      type: Boolean,
      default: false,
    }
  },
  methods: {
    back() {
      if (!this.backUrl) {
        this.$router.back();
      } else {
        this.$router.push(this.backUrl);
      }
    },
  },
};
</script>

<style>

</style>