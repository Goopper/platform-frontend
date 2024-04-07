<template>
  <div id="one_msg">
    <div>
      <h4>Sender </h4>
      <p id="msg_tit_main">Message Title -Main Message... </p>
      <p id="msg_time">SendTime</p>
      <p id="msg_btn">通知公告</p>
    </div>
  </div>
</template>
<style scoped>
#one_msg {
  padding: 20px 0;
  border: 1px #e3e3e3 solid;
}

#one_msg div * {
  /* padding-right: 20px; */
  margin: auto;
  line-height: 24px;
}

#message {
  margin-top: 32px;
  background-color: white;
}

#one_msg div {
  display: flex;
  margin: auto;
  padding: 0 24px;
}

#msg_tit_main {
  font-size: 13px;
}

#msg_time {
  font-size: 13px;
  color: #c3c3c3;
}

#msg_btn {
  font-size: 10px;
  padding: 0 8px;
  background-color: #2196f3;
  color: white;
  line-height: 24px;
  border-radius: 4px;
}
</style>