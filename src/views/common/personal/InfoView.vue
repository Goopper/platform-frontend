<template>
  <div>
    <the-avatar-modify-card
      class="bsm:mb-8 sm:mb-2"
      :user="user"
    />
    <the-user-basic-info-card
      class="bsm:mb-8 sm:mb-2"
      :user="user"
    />
    <the-email-modify-card
      class="bsm:mb-8 sm:mb-2"
      :user="user"
    />
    <the-account-bind-card
      class="bsm:mb-8 sm:mb-2"
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