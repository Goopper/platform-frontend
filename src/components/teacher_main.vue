<script>
import Header from './module/header.vue'
import one_stu from './module/one_stu.vue';
import message from './module/message.vue'
export default {
}
</script>
<template>
  <div id="teacher_main">
    <Header />
    <div style="display: flex;">
      <div id="class_stu_show">
        <div id="choose_class">
          <div style="width: 256px; margin-left: 32px;">
            <v-select label="Select" :items="['California']" density="compact" variant="outlined"></v-select>
          </div>
          <div style="width: 192px; margin-left: auto;">
            <v-select label="Select" :items="['California']" density="compact" variant="outlined"></v-select>
          </div>
          <div style="width: 128px;">
            <v-select label="Select" :items="['California']" density="compact" variant="outlined"></v-select>
          </div>
        </div>
        <v-virtual-scroll :items="['1']" max-height="620">
          <div id="stu_detail">
            <template v-for="item in 40">
              <One_stu />
            </template>
          </div>
        </v-virtual-scroll>
      </div>
      <div id="hello_message">
        <div id="plugin" style="border: 1px #e3e3e3 solid;">
          <h2 style="margin: 16px;">欢迎XXX</h2>
          <h4 style="margin: 16px;">今日待办XXX</h4>
        </div>
        <div id="message">
          <v-infinite-scroll height="528" mode="manual" @load="jump" load-more-text="查看更多消息">
            <template v-for="itme in 20">
              <message />
            </template>
          </v-infinite-scroll>
          <div style="height: 52px;  text-align: right; padding: 12px;">
            <v-btn id="jumpmsg_btn" variant="outlined" density="comfortable">
              查看更多消息
              <v-icon color="white">mdi-arrow-right-bold</v-icon>
            </v-btn>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>
<style>
#jumpmsg_btn{
margin-right: 8px;
color: white;
background-color: #383838;
font-size: 10px;
}

#teacher_main {
  width: 100%;
  height: 100%;
  background-color: #FAFAFA;
}

#stu_detail {
  margin: 32px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr;
  grid-gap: 10px;
}

@media screen and (min-width: 1188px) and (max-width: 1554px) {
  #stu_detail {
    margin: 16px;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    /* grid-template-rows: 1fr 1fr 1fr; */
    grid-gap: 10px;
  }
}

@media screen and (max-width: 1188px) and (min-width: 792px) {
  #stu_detail {
    margin: 8px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    /* grid-template-rows: 1fr 1fr 1fr; */
    grid-gap: 10px;
  }
}

#class_stu_show {
  margin: 32px 16px 32px 100px;
  height: 100%;
  width: 60%;
  background-color: white;
}

#hello_message {
  height: 100%;
  width: 30%;
  margin: 32px 100px 32px 16px;

  display: flex;
  flex-direction: column;
}

#choose_class {
  display: flex;
  height: 100px;
}

#choose_class>* {
  margin: 32px 32px 32px 0;
}

#plugin {
  /* margin: 32px; */
  background-color: white;
}
</style>