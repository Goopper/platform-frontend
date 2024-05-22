<template>
  <Repl :editor="Monaco" />
</template>
<script>
import { Repl } from '@vue/repl';
import Monaco from '@vue/repl/monaco-editor';
export default {
  name: 'VuePluginView',
  components: {
    Repl
  },
  setup() {
    return {
      Monaco
    };
  }
};
</script>