<template>
  <div id="stu_list">
    <v-card variant="outlined" style="border-color: #3e3e3e;">
      <div>
        <v-card-title style="padding: 0 0 0 4px;">张三</v-card-title>
        <v-card-subtitle id="class_dis" style="padding-left: 4px;"><p>2011班asfadsfueh1231akjh</p></v-card-subtitle>
        <v-card-text id="dis" style="padding: 4px;"><p>123131aszldksfjlzskdfkakdsfjkddasasdasdasdasdasasda23123123121312312312312312331</p></v-card-text>
        <v-subtitle id="use_day">5天 · 阶段2</v-subtitle>
      </div>
      <div style="margin-left: auto;">
        <img src="/src/assets/avatar.png" style="height: 40px;width: 40px;">
        <v-progress-circular :rotate="180" :size="40" :width="6" color="bule" style="margin-top: auto;">
          10
        </v-progress-circular>
      </div>
    </v-card>
  </div>
</template>
<style scoped>
#stu_list>div {
  border: 1px solid;
  border-radius: 4px;
  /* margin: 32px; */
  padding: 8px;
  display: flex;
}

#stu_list div div {
  display: flex;
  flex-direction: column;
}

#class_dis >p{
  font-size: 11px;
  width: 140px;
  white-space: nowrap;
  text-overflow:ellipsis;
  overflow: hidden;
}

#use_day {
  font-size: 10px;
  margin-right: auto;
}

#dis >p{
  overflow:hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 4;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  word-break: break-all;
  line-height: 15px;

}
</style>
