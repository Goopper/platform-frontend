<template>
  <div id="header_list">
    <img id="head_img" src="/src/assets/image.png">
    <v-btn-toggle id="navigation" color="black">
      <v-btn>首页</v-btn>
      <v-btn>课程</v-btn>
      <v-btn>个人中心</v-btn>
    </v-btn-toggle>
    <div id="user_list">
      <img id="msg_img" src="/src/assets/Message.png">
      <div>XXX</div>
      <v-menu>
        <template v-slot:activator="{ props }">
          <v-img id="acatar" v-bind="props" src="/src/assets/avatar.png"></v-img>
        </template>
        <v-list>
          <v-list-item id="list_item">
            <!-- <v-img src="/src/assets/avatar.png" style="height: 20px;width: 20px;flex: 1;"></v-img> -->
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
#header_list {
  padding: 0 32px 0 32px;
  height: 100px;
  display: flex;
  align-items: center;
  background-color: white;
  position: relative;
}

#head_img {
  height: 76px;
  width: 76px;
}

#navigation {
  width: 100%;
  justify-content: center;
  display: flex;
  position: absolute;
  border-radius: 0;
}

#navigation div {
  padding: 0 16px;
}

#user_list {
  display: flex;
  margin-left: auto;
  align-items: center;
}

#msg_img {
  height: 32px;
  width: 28px;
}

#acatar {
  height: 64px;
  width: 64px;
}

#list_item {
  text-align: center;
}

#list_subtitle {
  font-size: 12px;
}

#user_list * {
  padding: 4px;
}
</style>
