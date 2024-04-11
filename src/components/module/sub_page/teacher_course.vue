<script>
import cource_card from '../widgets/course-card.vue'
export default {
  components: {
    cource_card
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
        <cource_card />
        <cource_card />
      </div>
      <h4>待发布</h4>
      <div id="wait_card">
        <cource_card />
        <cource_card />
      </div>
    </div>
  </div>
</template>
<style scoped>
h4 {
  margin: 16px 0;
}

.cource_state {
  width: 256px;
  margin: 0 16px;
}

#cource {
  margin: 24px 128px 0 128px;
}

#choose_cource {
  display: flex;
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