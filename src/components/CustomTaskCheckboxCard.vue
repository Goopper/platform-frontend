<script>
export default {
  props:['task']
}
</script>
<template>
  <div id="box" style=" border: 1px solid #e3e3e3;">
    <v-checkbox id="check" style="margin-top: auto;margin-bottom: auto;" label="task.name" v-model="task.status" readonly hide-details></v-checkbox>
  </div>
</template>
<style scoped>
label{
  margin-right: 32px;
}
</style>