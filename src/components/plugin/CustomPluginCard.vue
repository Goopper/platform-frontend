<template>
  <div
    class="border p-2 flex flex-col cursor-pointer hover:shadow-slate-100 hover:shadow-md"
    @click="routeToPlugin"
  >
    <v-img
      class="w-[6rem] h-[6rem]"
      lazy-src="/default.jpg"
      :src="pluginObject.cover"
      cover
      :alt="pluginObject.alt"
    >
      <template #placeholder>
        <div class="d-flex align-center justify-center fill-height">
          <v-progress-circular
            color="grey-lighten-4"
            indeterminate
          />
        </div>
      </template>
    </v-img>
    <v-tooltip
      activator="parent"
      location="top"
    >
      {{ pluginObject.name }}
    </v-tooltip>
  </div>
</template>

<script>
export default {
  name: 'CustomPluginCard',
  props: {
    pluginObject: {
      type: Object,
      required: true
    }
  },
  methods: {
    routeToPlugin() {
      const path = this.$router.resolve(this.pluginObject.route).href;
      window.open(path);
    }
  }
};
</script>

<style>

</style>