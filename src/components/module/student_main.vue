<script>
export default {
  
}
</script>
<template>
  <div>
    <div id="stu_class"></div>
    <div id="stu_statits"></div>
  </div>
  <div id="hello_message">
      <div id="plugin">
        <h2>欢迎XXX</h2>
        <h4>今日待办XXX</h4>
      </div>
      <div id="message">
        <v-infinite-scroll height="528" mode="manual" @load="jump" load-more-text="查看更多消息">
          <template v-for="item in 20" :key="item">
            <message />
          </template>
        </v-infinite-scroll>
        <div id="jumpmsg_column">
          <v-btn id="jumpmsg_btn" variant="outlined" density="comfortable" append-icon="mdi-arrow-right-bold">
            查看更多消息
          </v-btn>
        </div>
      </div>
    </div>
</template>
<style scoped>

</style>