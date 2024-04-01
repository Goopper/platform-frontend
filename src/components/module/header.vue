<template>
  <div id="header_list">
     <img src="/src/assets/image.png" style="height: 76px;width: 76px;"> 
     <div id="navigation">
      <div>首页</div>
      <div>课程</div>
      <div>个人中心</div>
     </div>
     <div id="user_list">
      <img src="/src/assets/Message.png" style="height: 28px;width: 24px;">
      <div>XXX</div>
      <img src="/src/assets/avatar.png" style="height: 64px; width: 64px;">
     </div>
  </div>
</template>
<style>
#header_list{
  padding: 0 32px 0 32px;
  height: 100px;
  display: flex;
  align-items: center;
  background-color: white;
  position: relative;
}
#navigation{
  width: 100%;
  justify-content: center;
  display: flex;
  position: absolute;
}
#navigation div{
  padding: 0 16px;
}
#user_list{
  display: flex;
  margin-left: auto;
  align-items: center;
}
#user_list *{
  margin: 0 8px;
}

</style>
