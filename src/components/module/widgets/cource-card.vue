<script>
export default {

}
</script>
<template>
  <v-card id="card" hover>
    <v-img id="card_img" src="/src/assets/cource-img.png"></v-img>
    <div id="card_main">
      <v-card-title id="card_title">JAVAWEB课程</v-card-title>
      <v-icon id="card_more">mdi-dots-horizontal</v-icon>
    </div>
    <div id="cource_state">
      <p style="background-color:#4eb04e;">使用中</p>
      <p style="background-color:#f58f07;">待发布</p>
    </div>
    <v-card-subtitle id="card_subtitle">课程简介</v-card-subtitle>
  </v-card>
</template>
<style scoped>
#card {
  height: 300px;
  width: 240px;
}

#cource_state {
  display: flex;
  margin: 0 16px;
}

#cource_state * {
  display: grid;
  place-items: center;
  width: 54px;
  height: 20px;
  font-size: 10px;
  text-align: center;
  border-radius: 12px;
  color: white;
}

#card_img {
  margin: 16px 16px 0 16px;
  height: 184px;
  width: 208px;
}

#card_main {
  display: flex;
  padding: 0 16px 0 16px;
  align-items: Center;
}

#card_title {
  font-size: 16px;
  padding: 0
}

#card_more {
  margin-left: auto;
}

#card_subtitle {
  margin-top: 8px
}
</style>