<template>
  <div>
    <the-avatar-modify-card
      class="mb-8"
      :user="user"
    />
    <the-user-basic-info-card
      class="mb-8"
      :user="user"
    />
    <the-email-modify-card
      class="mb-8"
      :user="user"
    />
    <the-account-bind-card
      :user="user"
    />
  </div>
</template>

<script>
import { useUserStore } from '@/store/user';

export default {
  name: 'InfoView',
  data: () => ({
    userStore: useUserStore(),
  }),
  computed: {
    user() {
      return this.userStore.userInfo;
    },
  }
};
</script>

<style lang="scss" scoped>

</style>