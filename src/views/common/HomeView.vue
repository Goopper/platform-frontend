<template>
  <div class="flex md:flex-col overflow-y-auto">
    <!-- start -->
    <router-view class="blg:flex-grow lg:mr-0 sm:mb-2 bmd:mr-8" />
    <!-- end -->
    <div class="flex gap-8 flex-col h-full w-1/3 min-w-96 sm:w-full md:w-full sm:mt-0 bsm:mt-8 bmd:mt-0 sm:min-w-0 sm:mb-2 lg:w-full lg:grow">
      <div class="h-auto sm:hidden">
        <the-plugin-list-card />
      </div>
      <the-message-list-card />
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomeView',
  data: () => ({
  }),
  methods: {
  },
};
</script>

<style lang="scss">
#message-card-action {
  background-color: var(--custom-background);
}
</style>