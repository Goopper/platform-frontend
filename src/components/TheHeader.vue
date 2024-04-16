<template>
  <div id="the-header">
    <v-tabs id="menu" color="black">
      <v-tab>首页</v-tab>
      <v-tab>课程</v-tab>
      <v-tab>个人中心</v-tab>
    </v-tabs>
    <div>
      <div>XXX</div>
      <v-menu>
        <template v-slot:activator="{ props }">
          <v-img v-bind="props"></v-img>
        </template>
        <v-list>
          <v-list-item id="list_item">
            <v-list-item-title>Name</v-list-item-title>
            <v-list-item-subtitle id="list_subtitle">Number</v-list-item-subtitle>
          </v-list-item>
          <v-list-item><v-btn variant="text" block>设置</v-btn></v-list-item>
          <v-list-item><v-btn variant="text" block>退出登录</v-btn></v-list-item>
        </v-list>
      </v-menu>
    </div>
  </div>
</template>
<style scoped>
.v-tab--selected {
  background-color: var(--custom-primary);
  color: var(--custom-secondary) !important;
}
#the-header {
  display: flex;
  justify-content: center;
  background-color: var(--custom-secondary);
}
#menu {
  margin: auto;
}
</style>
