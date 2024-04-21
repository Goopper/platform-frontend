<template>
  <div class="hover:bg-primary hover:text-white cursor-pointer">
    {{ message.sender.name }} &nbsp; {{ message.title }}-{{ message.content.substring(0, 2) }}
  </div>
</template>

<script>
export default {
  name: 'CustomMessageCard',
  props: {
    message: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
</style>