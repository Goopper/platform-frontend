<script>
import Cource_card from './widgets/cource-card.vue'
export default {
  components: {
    Cource_card
  }
}
</script>
<template>
  <div id="cource">
    <div id="choose_cource">
      <v-text-field label="课程名称" variant="outlined" density="compact"></v-text-field>
      <div class="cource_state">
        <v-select label="状态" :items="['California']" variant="outlined" density="compact"></v-select>
      </div>
      <v-btn id="create_cource" prepend-icon="mdi-pencil" variant="outlined" height="40" color="white">
        创建课程
      </v-btn>
    </div>
    <div id="main_cource">
      <h4>使用中</h4>
      <div id="use_card">
        <Cource_card />
        <Cource_card />
      </div>
      <h4>待发布</h4>
      <div id="wait_card">
        <Cource_card />
        <Cource_card />
      </div>
    </div>
  </div>
</template>
<style>
h4 {
  margin: 16px 0;
}

.cource_state {
  width: 256px;
  margin: 0 16px;
}

#create_cource {
  background-color: black;
}
#use_card,#wait_card{
  display: flex;
   
}
#use_card > *,#wait_card > *{
  margin: 8px;
} 
</style>