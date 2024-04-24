<template>
  <div class="border bg-secondary p-6">
    <p class="text-xl font-bold mt-0 mb-4">
      基本信息
    </p>
    <p class="mb-4">
      基本信息由平台创建账户时自动录入，无需修改也不允许修改
    </p>
    <div
      id="basic-info-grid"
      class="grid grid-cols-4 sm:grid-cols-2"
    >
      <span>
        <v-icon
          class="mr-2"
          icon="mdi-account"
        />
        姓名：{{ user.name }}
      </span>
      <span>
        <v-icon
          class="mr-2"
          icon="mdi-identifier"
        />
        <span v-if="user.roleId==3">学号</span>
        <span v-else>工号</span>
        ：{{ user.number }}
      </span>
      <span>
        <v-icon
          class="mr-2"
          icon="mdi-gender-male-female"
        />
        性别：{{ gender }}
      </span>
      <span v-if="user.roleId==3">
        <v-icon
          class="mr-2"
          icon="mdi-account-group"
        />
        所在小组：{{ user.groupName }}
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TheUserBasicInfoCard',
  props: {
    user: {
      type: Object,
      required: true
    }
  },
  computed: {
    gender() {
      return this.user.sex ? '男' : '女';
    }
  },
};
</script>

<style scoped>
#basic-info-grid {
  span {
    display: flex;
    align-items: center;
    justify-content: start;
  }
}
</style>