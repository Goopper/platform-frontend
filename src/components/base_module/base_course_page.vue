<script>
import router from '@/router';
import path from 'path';

import base_course_list from './base_course_list.vue';

export default {
  data() {
    return {
     
    }
  },
  components:{
    base_course_list
  }
}
</script>
<template>
  <div style="display: flex;justify-content: center; margin: 32px 0;height: 82%;">
    <v-icon style="font-size: 32px;margin: 20px;">mdi-arrow-left</v-icon>
    <base_course_list/>
    <div style="background-color: white;width: 64%;;border: 1px #e3e3e3 solid;border-left: 0px;">
      <router-view></router-view>
    </div>
  </div>
</template>