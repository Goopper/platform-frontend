<template>
  <Repl :editor="CodeMirror" />
</template>
<script>
import { Repl } from '@vue/repl';
import CodeMirror from '@vue/repl/codemirror-editor';

export default {
  name: 'VuePluginView',
  components: {
    Repl
  },
  setup() {
    return {
      CodeMirror
    };
  }
};
</script>