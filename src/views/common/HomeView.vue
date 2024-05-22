<template>
  <div class="flex md:flex-col overflow-y-auto">
    <!-- start -->
    <router-view class="blg:flex-grow lg:mr-0 sm:mb-2 bmd:mr-8" />
    <!-- end -->
    <div class="flex gap-8 flex-col lg:min-h-[640px] h-full w-1/3 min-w-96 sm:w-full md:w-full md:mt-8 sm:min-w-0 sm:mb-2 lg:w-full lg:grow">
      <div class="h-auto">
        <the-plugin-list-card class="sm:hidden" />
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