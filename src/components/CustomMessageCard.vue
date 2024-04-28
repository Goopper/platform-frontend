<template>
  <div
    class="bg-secondary-message hover:bg-primary hover:text-white cursor-pointer px-6 py-4 flex justify-between items-center"
    @click="handleCardClick"
  >
    <div class="flex justify-start items-center w-1/5">
      <v-badge
        v-if="isRead === false"
        color="error"
        dot
      >
        <span>
          {{ message.sender.name }}
        </span>
      </v-badge>
      <span v-else>
        {{ message.sender.name }}
      </span>
    </div>
    <strong
      id="message-title"
      class="grow truncate ..."
    >&nbsp;{{ message.title }}&nbsp;</strong>
    <div class="w-2/5 flex justify-end items-center">
      <span>&nbsp;{{ message.date.substring(5,10).replace('-','/') }}&nbsp;</span>
      <v-chip
        size="x-small"
        :color="type.color"
      >
        {{ type.name }}
      </v-chip>
    </div>
    <!-- {{ message }} -->
  </div>
</template>

<script>
import MessageType from '@/utils/message-type';

export default {
  name: 'CustomMessageCard',
  props: {
    message: {
      type: Object,
      required: true,
    },
  },
  emits: ['messageCardClick'],
  computed: {
    isRead() {
      return this.message.isRead;
    },
    type() {
      return MessageType.getTypeById(this.message.typeId);
    }
  },
  methods: {
    handleCardClick() {
      this.$emit('messageCardClick', this.message);
    }
  }
};
</script>

<style lang="scss" scoped>
#message-title {
  @media screen and (min-width: 768px) {
    max-width: 13vw;
  }
  @media screen and (max-width: 768px) {
    max-width: 34vw;
  }
}
</style>