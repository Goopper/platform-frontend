<script>
import One_stu from './widgets/one_stu.vue'
import Message from './widgets/message.vue'
export default {
  components: {
    One_stu,
    Message
  }
}
</script>
<template>
  <div id="class">
    <div id="class_stu_show">
      <div id="choose_column">
        <div id="choose_class">
          <v-select label="选择课程" :items="['California']" density="compact" variant="outlined"></v-select>
        </div>
        <div id="choose_group">
          <v-select label="选择分组" :items="['California']" density="compact" variant="outlined"></v-select>
        </div>
        <div id="choose_sort">
          <v-select label="排序顺序" :items="['California']" density="compact" variant="outlined"></v-select>
        </div>
      </div>
      <v-virtual-scroll :items="['1']" max-height="620">
        <div id="stu_detail">
          <template v-for="item in 40" :key="item">
            <One_stu />
          </template>
        </div>
      </v-virtual-scroll>
    </div>
    <div id="hello_message">
      <div id="plugin">
        <h2>欢迎XXX</h2>
        <h4>今日待办XXX</h4>
      </div>
      <div id="message">
        <v-infinite-scroll height="528" mode="manual" @load="jump" load-more-text="查看更多消息">
          <template v-for="item in 20" :key="item">
            <Message />
          </template>
        </v-infinite-scroll>
        <div id="jumpmsg_column">
          <v-btn id="jumpmsg_btn" variant="outlined" density="comfortable" append-icon="mdi-arrow-right-bold">
            查看更多消息
          </v-btn>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
#class {
  display: flex;
}

#class_stu_show {
  margin: 32px 16px 32px 100px;
  height: 100%;
  width: 60%;
  background-color: white;
}

#choose_column {
  display: flex;
  height: 100px;
}

#choose_column>* {
  margin: 32px 32px 32px 0;
}

#choose_class {
  width: 256px;
  margin-left: 32px;
}

#choose_group {
  width: 192px;
  margin-left: auto;

}

#choose_sort {
  width: 128px;
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

#hello_message {
  height: 100%;
  width: 30%;
  margin: 32px 100px 32px 16px;

  display: flex;
  flex-direction: column;
}

#plugin {
  /* margin: 32px; */
  background-color: white;
  border: 1px #e3e3e3 solid;
}

#plugin * {
  margin: 16px;
}

#jumpmsg_column {
  height: 52px;
  text-align: right;
  padding: 12px;
}

#jumpmsg_btn {
  margin-right: 8px;
  color: white;
  background-color: #383838;
  font-size: 10px;
}
</style>