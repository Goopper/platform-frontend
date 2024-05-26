<template>
  <div class="bg-secondary border p-4 overflow-x-auto flex gap-4">
    <custom-plugin-card
      v-for="(plugin, index) in plugins"
      :key="index"
      class="w-[6rem] h-[6rem]"
      :plugin-object="plugin"
    />
  </div>
</template>

<script>
import backendPluginCover from '@/assets/img/backend-plugin-cover.svg';
import frontendPluginCover from '@/assets/img/frontend-plugin-cover.svg';
import vuePluginCover from '@/assets/img/vue-plugin-cover.svg';

export default {
  name: 'ThePluginListCard',
  data: () => ({
    plugins: [
      {
        name: '前端练习环境',
        cover: frontendPluginCover,
        alt: '前端练习环境封面',
        route: '/plugin/frontend'
      },
      {
        name: '后端接口测试',
        cover: backendPluginCover,
        alt: '后端接口测试封面',
        route: '/plugin/backend'
      },
      {
        name: 'vue练习环境',
        cover: vuePluginCover,
        alt: 'vue练习环境封面',
        route: '/plugin/vue'
      }
    ]
  })
};
</script>

<style>

</style>